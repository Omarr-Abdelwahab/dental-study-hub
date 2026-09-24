import { createContext } from "react";
import type { AppState, Course, User } from "./types";
import type { QuizEvaluation } from "./repository";

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  university: string;
  academicYear: string;
}
export interface ActionResult {
  ok: boolean;
  error?: string;
  requiresVerification?: boolean;
}
export interface QuizActionResult extends ActionResult {
  evaluation?: QuizEvaluation;
}
export interface StoreValue {
  state: AppState;
  hydrated: boolean;
  user: User | null;
  backendReady: boolean;
  signIn: (email: string, password: string) => Promise<ActionResult>;
  signUp: (input: SignUpInput) => Promise<ActionResult>;
  signOut: () => Promise<ActionResult>;
  sendPasswordReset: (email: string) => Promise<ActionResult>;
  updatePassword: (password: string) => Promise<ActionResult>;
  updateProfile: (patch: Partial<User>) => Promise<ActionResult>;
  saveProgress: (input: {
    courseId: string;
    lessonId: string;
    positionSec: number;
    percent: number;
    watchedDeltaSec?: number;
  }) => void;
  submitQuiz: (input: {
    courseId: string;
    lessonId: string;
    answers: number[];
  }) => Promise<QuizActionResult>;
  toggleBookmark: (courseId: string, lessonId: string) => Promise<ActionResult>;
  requestPurchase: (input: {
    courseId: string;
    transferReference: string;
  }) => Promise<ActionResult>;
  reviewPayment: (paymentId: string, approved: boolean, reason?: string) => Promise<ActionResult>;
  grantAccess: (userId: string, courseId: string) => Promise<ActionResult>;
  revokeAccess: (userId: string, courseId: string) => Promise<ActionResult>;
  saveCourse: (course: Course) => Promise<ActionResult>;
  setPublishState: (
    courseId: string,
    publishState: Course["publishState"],
  ) => Promise<ActionResult>;
  publishAnnouncement: (input: {
    courseId: string | null;
    title: string;
    body: string;
  }) => Promise<ActionResult>;
  deleteAnnouncement: (id: string) => Promise<ActionResult>;
}
export const StoreContext = createContext<StoreValue | null>(null);
