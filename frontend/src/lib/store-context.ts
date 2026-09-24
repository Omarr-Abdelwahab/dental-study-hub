import { createContext } from "react";

import type { AppState, Course, PaymentStatus, Role, User } from "./types";

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  university: string;
  academicYear: string;
}

export interface StoreValue {
  state: AppState;
  hydrated: boolean;
  user: User | null;
  setState: (updater: (prev: AppState) => AppState) => void;
  signIn: (email: string, password: string) => { ok: boolean; error?: string };
  signUp: (input: SignUpInput) => { ok: boolean; error?: string };
  signOut: () => void;
  enterDemo: (role: Role) => void;
  updateProfile: (patch: Partial<User>) => void;
  resetDemo: () => void;
  markActivity: () => void;
  saveProgress: (input: {
    courseId: string;
    lessonId: string;
    positionSec: number;
    percent: number;
    watchedSec?: number;
  }) => void;
  submitQuiz: (input: {
    courseId: string;
    lessonId: string;
    answers: number[];
    score: number;
    passed: boolean;
  }) => void;
  toggleBookmark: (courseId: string, lessonId: string) => void;
  recordPayment: (input: {
    courseId: string;
    amount: number;
    txnId: string;
    status: PaymentStatus;
    method: string;
    userId?: string;
  }) => void;
  grantAccess: (userId: string, courseId: string) => void;
  revokeAccess: (userId: string, courseId: string) => void;
  saveCourse: (course: Course) => void;
  setPublishState: (courseId: string, publishState: Course["publishState"]) => void;
  publishAnnouncement: (input: { courseId: string | null; title: string; body: string }) => void;
  deleteAnnouncement: (id: string) => void;
}

export const StoreContext = createContext<StoreValue | null>(null);
