import { courseLessons, courseStatus, toDateKey } from "./format";
import type { AppState, Course, Lesson } from "./types";

export function getCourse(state: AppState, idOrSlug: string) {
  return state.courses.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
}

export function findLesson(course: Course, lessonId: string): Lesson | undefined {
  return courseLessons(course).find((l) => l.id === lessonId);
}

export function lessonSection(course: Course, lessonId: string) {
  return course.sections.find((s) => s.lessons.some((l) => l.id === lessonId));
}

export function isEnrolled(state: AppState, userId: string | null, courseId: string) {
  if (!userId) return false;
  return state.enrollments.some(
    (e) => e.userId === userId && e.courseId === courseId && !e.revoked,
  );
}

export function getProgress(state: AppState, userId: string, lessonId: string) {
  return state.progress.find((p) => p.userId === userId && p.lessonId === lessonId);
}

export function courseProgressPercent(state: AppState, userId: string, course: Course) {
  const lessons = courseLessons(course).filter((l) => l.published);
  if (!lessons.length) return 0;
  const total = lessons.reduce((sum, l) => {
    const p = getProgress(state, userId, l.id);
    return sum + (p?.completed ? 100 : (p?.percent ?? 0));
  }, 0);
  return Math.round(total / lessons.length);
}

export function completedLessons(state: AppState, userId: string, course: Course) {
  return courseLessons(course).filter((l) => getProgress(state, userId, l.id)?.completed).length;
}

export function lastActivityInCourse(state: AppState, userId: string, course: Course) {
  const ids = new Set(courseLessons(course).map((l) => l.id));
  return state.progress.reduce<(typeof state.progress)[number] | undefined>((latest, item) => {
    if (item.userId !== userId || !ids.has(item.lessonId)) return latest;
    return !latest || item.updatedAt > latest.updatedAt ? item : latest;
  }, undefined);
}

export function lastWatched(state: AppState, userId: string) {
  return [...state.progress]
    .filter((p) => p.userId === userId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function attemptsFor(state: AppState, userId: string, lessonId: string) {
  return state.attempts
    .filter((a) => a.userId === userId && a.lessonId === lessonId)
    .sort((a, b) => b.takenAt.localeCompare(a.takenAt));
}

export function bestScore(state: AppState, userId: string, lessonId: string) {
  return state.attempts.reduce<number | null>((best, attempt) => {
    if (attempt.userId !== userId || attempt.lessonId !== lessonId) return best;
    return best === null ? attempt.score : Math.max(best, attempt.score);
  }, null);
}

export function isBookmarked(state: AppState, userId: string | null, lessonId: string) {
  if (!userId) return false;
  return state.bookmarks.some((b) => b.userId === userId && b.lessonId === lessonId);
}

export function streakInfo(state: AppState, userId: string) {
  const days = [...new Set(state.activity[userId] ?? [])].sort();
  const set = new Set(days);
  const today = toDateKey(new Date());
  const shiftDateKey = (key: string, amount: number) => {
    const date = new Date(`${key}T00:00:00.000Z`);
    date.setUTCDate(date.getUTCDate() + amount);
    return toDateKey(date);
  };
  const yesterday = shiftDateKey(today, -1);

  let current = 0;
  let cursor: string | null = set.has(today) ? today : set.has(yesterday) ? yesterday : null;
  while (cursor && set.has(cursor)) {
    current += 1;
    cursor = shiftDateKey(cursor, -1);
  }

  let longest = 0;
  let run = 0;
  let prev: string | null = null;
  for (const d of days) {
    if (prev && shiftDateKey(prev, 1) === d) run += 1;
    else run = 1;
    longest = Math.max(longest, run);
    prev = d;
  }

  const week = Array.from({ length: 7 }, (_, i) => {
    const key = shiftDateKey(today, i - 6);
    const date = new Date(`${key}T00:00:00.000Z`);
    return { key, date, active: set.has(key) };
  });

  return { current, longest: Math.max(longest, current), week, days };
}

export function studentAnnouncements(state: AppState, userId: string) {
  const courseIds = new Set(
    state.enrollments.filter((e) => e.userId === userId && !e.revoked).map((e) => e.courseId),
  );
  return state.announcements
    .filter((a) => a.courseId === null || courseIds.has(a.courseId))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function courseRevenue(state: AppState, courseId: string) {
  return state.payments
    .filter((p) => p.courseId === courseId && p.status === "success")
    .reduce((sum, p) => sum + p.amount, 0);
}

export function courseEnrollmentCount(state: AppState, courseId: string) {
  return state.enrollments.filter((e) => e.courseId === courseId && !e.revoked).length;
}

export function visibleCourses(state: AppState) {
  return state.courses.filter((c) => c.publishState === "published");
}

export function catalogStatus(course: Course) {
  return courseStatus(course);
}
