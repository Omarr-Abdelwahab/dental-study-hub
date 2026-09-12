import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { buildSeedState } from "./seed";
import { toDateKey } from "./format";
import type { Announcement, AppState, Course, Payment, PaymentStatus, Role, User } from "./types";

const STORAGE_KEY = "dsh.state.v4";

interface SignUpInput {
  name: string;
  email: string;
  password: string;
  phone: string;
  university: string;
  academicYear: string;
}

interface StoreValue {
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

const StoreContext = createContext<StoreValue | null>(null);

export const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setInternal] = useState<AppState>(() => buildSeedState());
  const [hydrated, setHydrated] = useState(false);
  const loaded = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setInternal(JSON.parse(raw) as AppState);
    } catch {
      /* ignore corrupt storage */
    }
    loaded.current = true;
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!loaded.current || !hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable */
    }
  }, [state, hydrated]);

  const setState = useCallback((updater: (prev: AppState) => AppState) => {
    setInternal((prev) => {
      const next = updater(prev);
      if (loaded.current) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        } catch {
          /* storage full or unavailable */
        }
      }
      return next;
    });
  }, []);

  const user = useMemo(
    () => state.users.find((u) => u.id === state.sessionUserId) ?? null,
    [state.users, state.sessionUserId],
  );

  const value = useMemo<StoreValue>(() => {
    const touchActivity = (prev: AppState, userId: string): AppState => {
      const key = toDateKey(new Date());
      const days = prev.activity[userId] ?? [];
      if (days.includes(key)) return prev;
      return { ...prev, activity: { ...prev.activity, [userId]: [...days, key] } };
    };

    return {
      state,
      hydrated,
      user,
      setState,
      signIn(email, password) {
        const found = state.users.find(
          (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
        );
        if (!found) return { ok: false, error: "No account matches that email and password." };
        setState((prev) => ({ ...prev, sessionUserId: found.id }));
        return { ok: true };
      },
      signUp(input) {
        if (state.users.some((u) => u.email.toLowerCase() === input.email.trim().toLowerCase())) {
          return { ok: false, error: "An account already exists with this email." };
        }
        const newUser: User = {
          id: uid("user"),
          role: "student",
          createdAt: new Date().toISOString(),
          ...input,
          email: input.email.trim(),
        };
        setState((prev) => ({
          ...prev,
          users: [...prev.users, newUser],
          activity: { ...prev.activity, [newUser.id]: [] },
          sessionUserId: newUser.id,
        }));
        return { ok: true };
      },
      signOut() {
        setState((prev) => ({ ...prev, sessionUserId: null }));
      },
      enterDemo(role) {
        const demo = state.users.find(
          (u) => u.email === (role === "admin" ? "admin@demo.com" : "student@demo.com"),
        );
        if (demo) setState((prev) => ({ ...prev, sessionUserId: demo.id }));
      },
      updateProfile(patch) {
        if (!user) return;
        setState((prev) => ({
          ...prev,
          users: prev.users.map((u) => (u.id === user.id ? { ...u, ...patch } : u)),
        }));
      },
      resetDemo() {
        const fresh = buildSeedState();
        setInternal(fresh);
      },
      markActivity() {
        if (!user) return;
        setState((prev) => touchActivity(prev, user.id));
      },
      saveProgress({ courseId, lessonId, positionSec, percent, watchedSec }) {
        if (!user) return;
        setState((prev) => {
          const existing = prev.progress.find(
            (p) => p.userId === user.id && p.lessonId === lessonId,
          );
          const next = {
            userId: user.id,
            courseId,
            lessonId,
            lastPositionSec: Math.round(positionSec),
            watchedSec: Math.max(existing?.watchedSec ?? 0, Math.round(watchedSec ?? positionSec)),
            percent: Math.max(existing?.percent ?? 0, Math.min(100, Math.round(percent))),
            completed: existing?.completed ?? false,
            updatedAt: new Date().toISOString(),
          };
          const progress = existing
            ? prev.progress.map((p) => (p === existing ? next : p))
            : [...prev.progress, next];
          let out: AppState = { ...prev, progress };
          if ((next.watchedSec ?? 0) >= 600) out = touchActivity(out, user.id);
          return out;
        });
      },
      submitQuiz({ courseId, lessonId, answers, score, passed }) {
        if (!user) return;
        setState((prev) => {
          const attempt = {
            id: uid("att"),
            userId: user.id,
            courseId,
            lessonId,
            score,
            passed,
            answers,
            takenAt: new Date().toISOString(),
          };
          const existing = prev.progress.find(
            (p) => p.userId === user.id && p.lessonId === lessonId,
          );
          const progress = existing
            ? prev.progress.map((p) =>
                p === existing
                  ? {
                      ...p,
                      completed: p.completed || passed,
                      percent: passed ? 100 : p.percent,
                      updatedAt: new Date().toISOString(),
                    }
                  : p,
              )
            : [
                ...prev.progress,
                {
                  userId: user.id,
                  courseId,
                  lessonId,
                  lastPositionSec: 0,
                  watchedSec: 0,
                  percent: passed ? 100 : 0,
                  completed: passed,
                  updatedAt: new Date().toISOString(),
                },
              ];
          let out: AppState = { ...prev, attempts: [...prev.attempts, attempt], progress };
          if (passed) out = touchActivity(out, user.id);
          return out;
        });
      },
      toggleBookmark(courseId, lessonId) {
        if (!user) return;
        setState((prev) => {
          const exists = prev.bookmarks.some(
            (b) => b.userId === user.id && b.lessonId === lessonId,
          );
          return {
            ...prev,
            bookmarks: exists
              ? prev.bookmarks.filter((b) => !(b.userId === user.id && b.lessonId === lessonId))
              : [
                  ...prev.bookmarks,
                  { userId: user.id, courseId, lessonId, createdAt: new Date().toISOString() },
                ],
          };
        });
      },
      recordPayment({ courseId, amount, txnId, status, method, userId }) {
        const buyerId = userId ?? user?.id;
        if (!buyerId) return;
        const payment: Payment = {
          id: uid("pay"),
          txnId,
          userId: buyerId,
          courseId,
          amount,
          method,
          status,
          createdAt: new Date().toISOString(),
        };
        setState((prev) => {
          const already = prev.enrollments.some(
            (e) => e.userId === buyerId && e.courseId === courseId && !e.revoked,
          );
          return {
            ...prev,
            payments: [payment, ...prev.payments],
            enrollments:
              status === "success" && !already
                ? [
                    ...prev.enrollments,
                    {
                      id: uid("enr"),
                      userId: buyerId,
                      courseId,
                      enrolledAt: new Date().toISOString(),
                      source: "purchase" as const,
                    },
                  ]
                : prev.enrollments,
          };
        });
      },
      grantAccess(userId, courseId) {
        setState((prev) => {
          const existing = prev.enrollments.find(
            (e) => e.userId === userId && e.courseId === courseId,
          );
          if (existing) {
            return {
              ...prev,
              enrollments: prev.enrollments.map((e) =>
                e === existing ? { ...e, revoked: false } : e,
              ),
            };
          }
          return {
            ...prev,
            enrollments: [
              ...prev.enrollments,
              {
                id: uid("enr"),
                userId,
                courseId,
                enrolledAt: new Date().toISOString(),
                source: "granted" as const,
              },
            ],
          };
        });
      },
      revokeAccess(userId, courseId) {
        setState((prev) => ({
          ...prev,
          enrollments: prev.enrollments.map((e) =>
            e.userId === userId && e.courseId === courseId ? { ...e, revoked: true } : e,
          ),
        }));
      },
      saveCourse(course) {
        setState((prev) => ({
          ...prev,
          courses: prev.courses.some((c) => c.id === course.id)
            ? prev.courses.map((c) => (c.id === course.id ? course : c))
            : [...prev.courses, course],
        }));
      },
      setPublishState(courseId, publishState) {
        setState((prev) => ({
          ...prev,
          courses: prev.courses.map((c) => (c.id === courseId ? { ...c, publishState } : c)),
        }));
      },
      publishAnnouncement({ courseId, title, body }) {
        const announcement: Announcement = {
          id: uid("ann"),
          courseId,
          title,
          body,
          createdAt: new Date().toISOString(),
        };
        setState((prev) => ({ ...prev, announcements: [announcement, ...prev.announcements] }));
      },
      deleteAnnouncement(id) {
        setState((prev) => ({
          ...prev,
          announcements: prev.announcements.filter((a) => a.id !== id),
        }));
      },
    };
  }, [state, hydrated, user, setState]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside AppStoreProvider");
  return ctx;
}
