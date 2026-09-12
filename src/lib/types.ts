export type Role = "student" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  university: string;
  academicYear: string;
  role: Role;
  createdAt: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  durationMin: number;
  youtubeId: string;
  pdfUrl: string | null;
  pdfName: string | null;
  allowDownload: boolean;
  isPreview: boolean;
  published: boolean;
  quiz: QuizQuestion[];
}

export interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

export type CourseStatus = "open" | "upcoming" | "closed" | "expired";
export type PublishState = "draft" | "published" | "archived";

export interface Course {
  id: string;
  slug: string;
  title: string;
  subject: string;
  level: string;
  summary: string;
  description: string;
  outcomes: string[];
  price: number;
  thumbnail: string;
  salesOpenAt: string;
  salesCloseAt: string;
  accessOpenAt: string;
  accessCloseAt: string;
  publishState: PublishState;
  sections: Section[];
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  source: "purchase" | "granted";
  revoked?: boolean;
}

export interface LessonProgress {
  userId: string;
  courseId: string;
  lessonId: string;
  lastPositionSec: number;
  watchedSec: number;
  percent: number;
  completed: boolean;
  updatedAt: string;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  courseId: string;
  lessonId: string;
  score: number;
  passed: boolean;
  answers: number[];
  takenAt: string;
}

export interface Bookmark {
  userId: string;
  courseId: string;
  lessonId: string;
  createdAt: string;
}

export type PaymentStatus = "success" | "pending" | "failed";

export interface Payment {
  id: string;
  txnId: string;
  userId: string;
  courseId: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  createdAt: string;
}

export interface Announcement {
  id: string;
  courseId: string | null;
  title: string;
  body: string;
  createdAt: string;
}

export interface AppState {
  users: User[];
  courses: Course[];
  enrollments: Enrollment[];
  progress: LessonProgress[];
  attempts: QuizAttempt[];
  bookmarks: Bookmark[];
  payments: Payment[];
  announcements: Announcement[];
  activity: Record<string, string[]>; // userId -> ISO dates (yyyy-mm-dd)
  readAnnouncements: Record<string, string[]>; // userId -> announcement ids
  sessionUserId: string | null;
}
