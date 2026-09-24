import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { buildCatalogState } from "./seed";
import { createId } from "./id";
import { SupabaseAppRepository } from "./repository";
import { isBackendConfigured, supabase } from "./supabase";
import { StoreContext, type ActionResult, type StoreValue } from "./store-context";
import type { Announcement, AppState, Bookmark, LessonProgress } from "./types";

function catalogState(): AppState {
  return {
    ...buildCatalogState(),
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
}
function message(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong. Please try again.";
}

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(catalogState);
  const [hydrated, setHydrated] = useState(false);
  const repository = useMemo(() => (supabase ? new SupabaseAppRepository(supabase) : null), []);
  const progressTimers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  const progressSequences = useRef(new Map<string, number>());
  const reloadSequence = useRef(0);

  const reload = useCallback(
    async (userId: string | null) => {
      const sequence = ++reloadSequence.current;
      if (!repository) {
        if (sequence === reloadSequence.current) {
          setState(catalogState());
          setHydrated(true);
        }
        return;
      }
      try {
        const next = await repository.load(userId);
        if (sequence === reloadSequence.current) setState(next);
      } catch (error) {
        console.error("Failed to load application data", error);
      } finally {
        if (sequence === reloadSequence.current) setHydrated(true);
      }
    },
    [repository],
  );

  useEffect(() => {
    const timers = progressTimers.current;
    const authTimers = new Set<ReturnType<typeof setTimeout>>();
    if (!supabase) {
      void reload(null);
      return;
    }
    void supabase.auth
      .getSession()
      .then(({ data }) => reload(data.session?.user.id ?? null))
      .catch((error: unknown) => console.error("Failed to restore the session", error));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      const timer = setTimeout(() => {
        authTimers.delete(timer);
        void reload(session?.user.id ?? null);
      }, 0);
      authTimers.add(timer);
    });
    return () => {
      data.subscription.unsubscribe();
      for (const timer of authTimers) clearTimeout(timer);
      for (const timer of timers.values()) clearTimeout(timer);
      timers.clear();
    };
  }, [reload]);

  const user = useMemo(
    () => state.users.find((item) => item.id === state.sessionUserId) ?? null,
    [state.users, state.sessionUserId],
  );

  const value = useMemo<StoreValue>(() => {
    const requireBackend = (): NonNullable<typeof supabase> => {
      if (!supabase || !repository) throw new Error("Account services are not configured yet.");
      return supabase;
    };
    const result = async (operation: () => Promise<void>): Promise<ActionResult> => {
      try {
        await operation();
        return { ok: true };
      } catch (error) {
        return { ok: false, error: message(error) };
      }
    };
    const persistCourse = async (course: AppState["courses"][number]) => {
      if (repository) await repository.saveCourse(course);
      setState((prev) => ({
        ...prev,
        courses: prev.courses.some((item) => item.id === course.id)
          ? prev.courses.map((item) => (item.id === course.id ? course : item))
          : [...prev.courses, course],
      }));
    };

    return {
      state,
      hydrated,
      user,
      backendReady: isBackendConfigured,
      async signIn(email, password) {
        return result(async () => {
          const { error } = await requireBackend().auth.signInWithPassword({
            email: email.trim(),
            password,
          });
          if (error) throw error;
        });
      },
      async signUp(input) {
        try {
          const { data, error } = await requireBackend().auth.signUp({
            email: input.email.trim(),
            password: input.password,
            options: {
              emailRedirectTo: `${window.location.origin}/auth`,
              data: {
                full_name: input.name.trim(),
                phone: input.phone.trim(),
                university: input.university.trim(),
                academic_year: input.academicYear.trim(),
              },
            },
          });
          if (error) throw error;
          return { ok: true, requiresVerification: !data.session };
        } catch (error) {
          return { ok: false, error: message(error) };
        }
      },
      async signOut() {
        return result(async () => {
          const { error } = await requireBackend().auth.signOut();
          if (error) throw error;
        });
      },
      async sendPasswordReset(email) {
        return result(async () => {
          const { error } = await requireBackend().auth.resetPasswordForEmail(email.trim(), {
            redirectTo: `${window.location.origin}/reset-password`,
          });
          if (error) throw error;
        });
      },
      async updatePassword(password) {
        return result(async () => {
          const { error } = await requireBackend().auth.updateUser({ password });
          if (error) throw error;
        });
      },
      async updateProfile(patch) {
        if (!user || !repository) return { ok: false, error: "Please sign in first." };
        return result(async () => {
          await repository.updateProfile(user.id, patch);
          setState((prev) => ({
            ...prev,
            users: prev.users.map((item) => (item.id === user.id ? { ...item, ...patch } : item)),
          }));
        });
      },
      saveProgress({ courseId, lessonId, positionSec, percent, watchedDeltaSec }) {
        if (!user || !repository) return;
        const existing = state.progress.find(
          (item) => item.userId === user.id && item.lessonId === lessonId,
        );
        const next: LessonProgress = {
          userId: user.id,
          courseId,
          lessonId,
          lastPositionSec: Math.round(positionSec),
          watchedSec: (existing?.watchedSec ?? 0) + Math.max(0, Math.round(watchedDeltaSec ?? 0)),
          percent: Math.max(existing?.percent ?? 0, Math.min(100, Math.round(percent))),
          completed: existing?.completed ?? false,
          updatedAt: new Date().toISOString(),
        };
        setState((prev) => ({
          ...prev,
          progress: existing
            ? prev.progress.map((item) =>
                item.userId === user.id && item.lessonId === lessonId ? next : item,
              )
            : [...prev.progress, next],
        }));
        const key = `${user.id}:${lessonId}`;
        const sequence = (progressSequences.current.get(key) ?? 0) + 1;
        progressSequences.current.set(key, sequence);
        const prior = progressTimers.current.get(key);
        if (prior) clearTimeout(prior);
        progressTimers.current.set(
          key,
          setTimeout(() => {
            progressTimers.current.delete(key);
            void repository
              .saveProgress(next)
              .then((saved) => {
                if (progressSequences.current.get(key) !== sequence) return;
                setState((prev) => ({
                  ...prev,
                  progress: prev.progress.map((item) =>
                    item.userId === user.id && item.lessonId === lessonId ? saved : item,
                  ),
                }));
              })
              .catch((error: unknown) => console.error("Failed to save lesson progress", error));
          }, 1000),
        );
      },
      async submitQuiz({ courseId, lessonId, answers }) {
        if (!user || !repository) return { ok: false, error: "Please sign in first." };
        try {
          const evaluation = await repository.submitQuiz(user.id, courseId, lessonId, answers);
          setState((prev) => {
            const existing = prev.progress.find(
              (item) => item.userId === user.id && item.lessonId === lessonId,
            );
            const progress: LessonProgress = {
              userId: user.id,
              courseId,
              lessonId,
              lastPositionSec: existing?.lastPositionSec ?? 0,
              watchedSec: existing?.watchedSec ?? 0,
              percent: evaluation.attempt.passed ? 100 : (existing?.percent ?? 0),
              completed: Boolean(existing?.completed || evaluation.attempt.passed),
              updatedAt: evaluation.attempt.takenAt,
            };
            return {
              ...prev,
              attempts: [...prev.attempts, evaluation.attempt],
              progress: existing
                ? prev.progress.map((item) =>
                    item.userId === user.id && item.lessonId === lessonId ? progress : item,
                  )
                : [...prev.progress, progress],
            };
          });
          return { ok: true, evaluation };
        } catch (error) {
          return { ok: false, error: message(error) };
        }
      },
      async toggleBookmark(courseId, lessonId) {
        if (!user || !repository) return { ok: false, error: "Please sign in first." };
        const enabled = !state.bookmarks.some(
          (item) => item.userId === user.id && item.lessonId === lessonId,
        );
        const bookmark: Bookmark = {
          userId: user.id,
          courseId,
          lessonId,
          createdAt: new Date().toISOString(),
        };
        return result(async () => {
          await repository.setBookmark(bookmark, enabled);
          setState((prev) => ({
            ...prev,
            bookmarks: enabled
              ? [...prev.bookmarks, bookmark]
              : prev.bookmarks.filter(
                  (item) => !(item.userId === user.id && item.lessonId === lessonId),
                ),
          }));
        });
      },
      async requestPurchase(input) {
        if (!user || !repository) return { ok: false, error: "Please sign in first." };
        return result(async () => {
          const created = await repository.createPurchaseRequest(user.id, input);
          setState((prev) => ({ ...prev, payments: [created, ...prev.payments] }));
        });
      },
      async reviewPayment(paymentId, approved, reason) {
        if (!repository) return { ok: false, error: "Account services are not configured." };
        return result(async () => {
          await repository.reviewPurchase(paymentId, approved, reason);
          await reload(user?.id ?? null);
        });
      },
      async grantAccess(userId, courseId) {
        if (!repository) return { ok: false, error: "Account services are not configured." };
        return result(async () => {
          await repository.grantAccess(userId, courseId);
          await reload(user?.id ?? null);
        });
      },
      async revokeAccess(userId, courseId) {
        if (!repository) return { ok: false, error: "Account services are not configured." };
        return result(async () => {
          await repository.revokeAccess(userId, courseId);
          await reload(user?.id ?? null);
        });
      },
      async saveCourse(course) {
        return result(() => persistCourse(course));
      },
      async setPublishState(courseId, publishState) {
        const course = state.courses.find((item) => item.id === courseId);
        if (!course) return { ok: false, error: "Course not found." };
        return result(() => persistCourse({ ...course, publishState }));
      },
      async publishAnnouncement(input) {
        if (!repository) return { ok: false, error: "Account services are not configured." };
        const announcement: Announcement = {
          id: createId("ann"),
          ...input,
          createdAt: new Date().toISOString(),
        };
        return result(async () => {
          await repository.saveAnnouncement(announcement);
          setState((prev) => ({ ...prev, announcements: [announcement, ...prev.announcements] }));
        });
      },
      async deleteAnnouncement(id) {
        if (!repository) return { ok: false, error: "Account services are not configured." };
        return result(async () => {
          await repository.deleteAnnouncement(id);
          setState((prev) => ({
            ...prev,
            announcements: prev.announcements.filter((item) => item.id !== id),
          }));
        });
      },
    };
  }, [state, hydrated, user, repository, reload]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
