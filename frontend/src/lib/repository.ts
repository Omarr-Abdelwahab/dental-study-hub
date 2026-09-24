import type { SupabaseClient } from "@supabase/supabase-js";

import { toPublicCourse, toStudentCourse } from "./course-payload";
import { buildCatalogState, starterCourses } from "./seed";
import {
  parseCourse,
  parseFullCourse,
  parseLessonProgressRow,
  parsePurchaseRequestRow,
  parseQuizEvaluation,
} from "./validation";
import type {
  Announcement,
  AppState,
  Bookmark,
  Course,
  Enrollment,
  LessonProgress,
  Payment,
  QuizAttempt,
  Role,
  User,
} from "./types";

interface Row {
  id: string;
  user_id: string;
  course_id: string;
  lesson_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  university: string | null;
  academic_year: string | null;
  role: Role;
  amount: number | string;
  transfer_reference: string;
  status: string;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  rejection_reason: string | null;
  enrolled_at: string;
  source: "purchase" | "granted";
  revoked: boolean;
  last_position_sec: number;
  watched_sec: number;
  percent: number;
  completed: boolean;
  score: number;
  passed: boolean;
  answers: number[];
  taken_at: string;
  title: string;
  body: string;
  payload: Course;
  activity_date: string;
}

export interface ProfileInput {
  name: string;
  phone: string;
  university: string;
  academicYear: string;
}

export interface PurchaseRequestInput {
  courseId: string;
  transferReference: string;
}

export interface QuizEvaluation {
  attempt: QuizAttempt;
  correctIndexes: number[];
  explanations: string[];
}

export interface AppRepository {
  load(userId: string | null): Promise<AppState>;
  updateProfile(userId: string, patch: Partial<User>): Promise<void>;
  saveProgress(progress: LessonProgress): Promise<LessonProgress>;
  submitQuiz(
    userId: string,
    courseId: string,
    lessonId: string,
    answers: number[],
  ): Promise<QuizEvaluation>;
  setBookmark(bookmark: Bookmark, enabled: boolean): Promise<void>;
  createPurchaseRequest(userId: string, input: PurchaseRequestInput): Promise<Payment>;
  reviewPurchase(paymentId: string, approved: boolean, reason?: string): Promise<void>;
  grantAccess(userId: string, courseId: string): Promise<void>;
  revokeAccess(userId: string, courseId: string): Promise<void>;
  saveCourse(course: Course): Promise<void>;
  saveAnnouncement(announcement: Announcement): Promise<void>;
  deleteAnnouncement(id: string): Promise<void>;
}

const emptyCatalog = (): AppState => {
  const seed = buildCatalogState();
  return {
    ...seed,
    users: [],
    enrollments: [],
    progress: [],
    attempts: [],
    bookmarks: [],
    payments: [],
    announcements: [],
    activity: {},
    readAnnouncements: {},
    sessionUserId: null,
  };
};

function profile(row: Row): User {
  return {
    id: row.id,
    name: row.full_name,
    email: row.email,
    phone: row.phone ?? "",
    university: row.university ?? "",
    academicYear: row.academic_year ?? "",
    role: row.role as Role,
    createdAt: row.created_at,
  };
}

type PaymentRow = Pick<
  Row,
  | "id"
  | "transfer_reference"
  | "user_id"
  | "course_id"
  | "amount"
  | "status"
  | "created_at"
  | "reviewed_at"
  | "reviewed_by"
  | "rejection_reason"
>;

function payment(row: PaymentRow): Payment {
  return {
    id: row.id,
    txnId: row.transfer_reference,
    userId: row.user_id,
    courseId: row.course_id,
    amount: Number(row.amount),
    method: "InstaPay",
    status:
      row.status === "approved" ? "success" : row.status === "rejected" ? "failed" : "pending",
    createdAt: row.created_at,
    reviewedAt: row.reviewed_at,
    reviewedBy: row.reviewed_by,
    rejectionReason: row.rejection_reason,
  };
}

function fail(error: { message: string } | null) {
  if (error) throw new Error(error.message);
}

export class SupabaseAppRepository implements AppRepository {
  constructor(private readonly client: SupabaseClient) {}

  async load(userId: string | null): Promise<AppState> {
    const base = emptyCatalog();
    const catalog = await this.client.from("course_catalog").select("payload");
    fail(catalog.error);
    const publicCourses = (catalog.data ?? []).map((row) => parseCourse(row.payload));
    // Once a backend is configured, its catalog is authoritative. Falling back per course would
    // accidentally make an unpublished starter course public again.
    const catalogCourses = publicCourses;
    if (!userId) return { ...base, courses: catalogCourses };

    const [
      profiles,
      courses,
      studentCourses,
      enrollments,
      progress,
      attempts,
      bookmarks,
      payments,
      announcements,
      activity,
    ] = await Promise.all([
      this.client.from("profiles").select("*"),
      this.client.from("courses").select("payload"),
      this.client.from("student_courses").select("payload"),
      this.client.from("enrollments").select("*"),
      this.client.from("lesson_progress").select("*"),
      this.client.from("quiz_attempts").select("*"),
      this.client.from("bookmarks").select("*"),
      this.client.from("purchase_requests").select("*").order("created_at", { ascending: false }),
      this.client.from("announcements").select("*").order("created_at", { ascending: false }),
      this.client.from("activity_days").select("*"),
    ]);

    [
      profiles,
      courses,
      studentCourses,
      enrollments,
      progress,
      attempts,
      bookmarks,
      payments,
      announcements,
      activity,
    ].forEach((result) => fail(result.error));

    const activityMap: Record<string, string[]> = {};
    for (const row of activity.data ?? []) {
      (activityMap[row.user_id] ??= []).push(row.activity_date);
    }

    const currentProfile = (profiles.data ?? []).find((row) => row.id === userId);
    let remoteCourses = (
      currentProfile?.role === "admin" ? (courses.data ?? []) : (studentCourses.data ?? [])
    ).map((row) => parseCourse(row.payload));
    if (
      currentProfile?.role === "admin" &&
      starterCourses.length > 0 &&
      catalog.data?.length === 0 &&
      courses.data?.length === 0
    ) {
      const initialCourses = structuredClone(starterCourses);
      await Promise.all(initialCourses.map((course) => this.saveCourse(course)));
      remoteCourses = initialCourses;
    }
    const mergedCourses = catalogCourses.map(
      (course) => remoteCourses.find((item) => item.id === course.id) ?? course,
    );
    for (const course of remoteCourses)
      if (!mergedCourses.some((item) => item.id === course.id)) mergedCourses.push(course);

    return {
      ...base,
      users: (profiles.data ?? []).map(profile),
      courses: mergedCourses,
      enrollments: (enrollments.data ?? []).map((row): Enrollment => ({
        id: row.id,
        userId: row.user_id,
        courseId: row.course_id,
        enrolledAt: row.enrolled_at,
        source: row.source,
        revoked: row.revoked,
      })),
      progress: (progress.data ?? []).map((row): LessonProgress => ({
        userId: row.user_id,
        courseId: row.course_id,
        lessonId: row.lesson_id,
        lastPositionSec: row.last_position_sec,
        watchedSec: row.watched_sec,
        percent: row.percent,
        completed: row.completed,
        updatedAt: row.updated_at,
      })),
      attempts: (attempts.data ?? []).map((row): QuizAttempt => ({
        id: row.id,
        userId: row.user_id,
        courseId: row.course_id,
        lessonId: row.lesson_id,
        score: row.score,
        passed: row.passed,
        answers: row.answers,
        takenAt: row.taken_at,
      })),
      bookmarks: (bookmarks.data ?? []).map((row): Bookmark => ({
        userId: row.user_id,
        courseId: row.course_id,
        lessonId: row.lesson_id,
        createdAt: row.created_at,
      })),
      payments: (payments.data ?? []).map(payment),
      announcements: (announcements.data ?? []).map((row): Announcement => ({
        id: row.id,
        courseId: row.course_id,
        title: row.title,
        body: row.body,
        createdAt: row.created_at,
      })),
      activity: activityMap,
      sessionUserId: userId,
    };
  }

  async updateProfile(userId: string, patch: Partial<User>) {
    const { error } = await this.client
      .from("profiles")
      .update({
        full_name: patch.name,
        phone: patch.phone,
        university: patch.university,
        academic_year: patch.academicYear,
      })
      .eq("id", userId);
    fail(error);
  }

  async saveProgress(value: LessonProgress) {
    const { data, error } = await this.client.rpc("save_lesson_progress", {
      p_course_id: value.courseId,
      p_lesson_id: value.lessonId,
      p_position_sec: value.lastPositionSec,
      p_watched_sec: value.watchedSec,
      p_percent: value.percent,
    });
    fail(error);
    if (!data) throw new Error("Progress could not be saved.");
    const row = parseLessonProgressRow(data);
    return {
      userId: row.user_id,
      courseId: row.course_id,
      lessonId: row.lesson_id,
      lastPositionSec: row.last_position_sec,
      watchedSec: row.watched_sec,
      percent: row.percent,
      completed: row.completed,
      updatedAt: row.updated_at,
    };
  }

  async submitQuiz(userId: string, courseId: string, lessonId: string, answers: number[]) {
    const { data, error } = await this.client
      .rpc("submit_quiz_attempt", {
        p_course_id: courseId,
        p_lesson_id: lessonId,
        p_answers: answers,
      })
      .single();
    fail(error);
    if (!data) throw new Error("Quiz could not be graded.");
    const evaluation = parseQuizEvaluation(data);
    return {
      attempt: {
        id: evaluation.attempt_id,
        userId,
        courseId,
        lessonId,
        score: evaluation.score,
        passed: evaluation.passed,
        answers,
        takenAt: evaluation.taken_at,
      },
      correctIndexes: evaluation.correct_indexes,
      explanations: evaluation.explanations,
    };
  }

  async setBookmark(value: Bookmark, enabled: boolean) {
    const query = enabled
      ? this.client.from("bookmarks").insert({
          user_id: value.userId,
          course_id: value.courseId,
          lesson_id: value.lessonId,
          created_at: value.createdAt,
        })
      : this.client
          .from("bookmarks")
          .delete()
          .eq("user_id", value.userId)
          .eq("lesson_id", value.lessonId);
    const { error } = await query;
    fail(error);
  }

  async createPurchaseRequest(userId: string, input: PurchaseRequestInput) {
    const { data, error } = await this.client.rpc("create_purchase_request", {
      p_course_id: input.courseId,
      p_transfer_reference: input.transferReference.trim(),
    });
    fail(error);
    if (!data) throw new Error("Purchase request could not be created.");
    return payment(parsePurchaseRequestRow(data));
  }

  async reviewPurchase(paymentId: string, approved: boolean, reason?: string) {
    const { error } = await this.client.rpc("review_purchase_request", {
      p_request_id: paymentId,
      p_approve: approved,
      p_reason: reason ?? null,
    });
    fail(error);
  }

  async grantAccess(userId: string, courseId: string) {
    const { error } = await this.client.rpc("grant_course_access", {
      p_user_id: userId,
      p_course_id: courseId,
    });
    fail(error);
  }

  async revokeAccess(userId: string, courseId: string) {
    const { error } = await this.client.rpc("revoke_course_access", {
      p_user_id: userId,
      p_course_id: courseId,
    });
    fail(error);
  }

  async saveCourse(course: Course) {
    const validated = parseFullCourse(course);
    const { error } = await this.client.rpc("save_course", {
      p_id: validated.id,
      p_slug: validated.slug,
      p_full_payload: validated,
      p_student_payload: toStudentCourse(validated),
      p_public_payload: toPublicCourse(validated),
    });
    fail(error);
  }

  async saveAnnouncement(value: Announcement) {
    const { error } = await this.client.from("announcements").insert({
      id: value.id,
      course_id: value.courseId,
      title: value.title,
      body: value.body,
      created_at: value.createdAt,
    });
    fail(error);
  }

  async deleteAnnouncement(id: string) {
    const { error } = await this.client.from("announcements").delete().eq("id", id);
    fail(error);
  }
}
