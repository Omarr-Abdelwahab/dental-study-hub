import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  Bookmark,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Flame,
  GraduationCap,
  History,
  LockKeyhole,
  Play,
  Trophy,
} from "lucide-react";
import { useMemo } from "react";

import { AppHeader } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  completedLessons,
  courseProgressPercent,
  findLesson,
  isEnrolled,
  lastWatched,
  streakInfo,
  studentAnnouncements,
} from "@/lib/selectors";
import {
  courseLessons,
  daysRemaining,
  formatClock,
  formatDate,
  formatDateTime,
  isAccessActive,
} from "@/lib/format";
import { useStore } from "@/lib/use-store";
import type { User } from "@/lib/types";

export const Route = createFileRoute("/dashboard")({ component: StudentDashboard });

function StudentDashboard() {
  const { user } = useStore();

  if (!user || user.role !== "student") {
    return (
      <div className="min-h-screen bg-secondary/35">
        <AppHeader />
        <div className="container-page grid min-h-[calc(100vh-108px)] place-items-center py-12">
          <div className="max-w-lg rounded-3xl border bg-card p-8 text-center shadow-lift">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
              <GraduationCap className="size-6" />
            </span>
            <h1 className="mt-5 text-3xl font-extrabold text-navy">Sign in to My Learning</h1>
            <p className="mt-3 leading-7 text-muted-foreground">
              Access your enrolled courses, saved playback, quizzes, bookmarks and study streak.
            </p>
            <Button asChild className="mt-7 h-11">
              <Link to="/auth">Sign in or create an account</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <StudentDashboardContent user={user} />;
}

function StudentDashboardContent({ user }: { user: User }) {
  const { state } = useStore();

  const view = useMemo(() => {
    const enrolledCourses = state.courses.filter((course) => isEnrolled(state, user.id, course.id));
    const activeCourses = enrolledCourses.filter((course) => isAccessActive(course));
    const expiredCourses = enrolledCourses.filter((course) => !isAccessActive(course));
    const recentProgress = lastWatched(state, user.id);
    const recentActive = recentProgress.find((item) =>
      activeCourses.some((course) => course.id === item.courseId),
    );
    const continueCourse = recentActive
      ? activeCourses.find((course) => course.id === recentActive.courseId)
      : activeCourses[0];
    const continueLesson =
      continueCourse && recentActive
        ? findLesson(continueCourse, recentActive.lessonId)
        : continueCourse
          ? courseLessons(continueCourse)[0]
          : undefined;
    const streak = streakInfo(state, user.id);
    const announcements = studentAnnouncements(state, user.id);
    const coursesById = new Map(state.courses.map((course) => [course.id, course]));
    const bookmarks = state.bookmarks
      .filter((bookmark) => bookmark.userId === user.id)
      .map((bookmark) => {
        const course = coursesById.get(bookmark.courseId);
        const lesson = course ? findLesson(course, bookmark.lessonId) : undefined;
        return course && lesson ? { bookmark, course, lesson } : null;
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
    const recentAttempts = [...state.attempts]
      .filter((attempt) => attempt.userId === user.id)
      .sort((a, b) => b.takenAt.localeCompare(a.takenAt))
      .slice(0, 3);
    const pendingPurchases = state.payments.filter(
      (payment) => payment.userId === user.id && payment.status === "pending",
    );

    return {
      activeCourses,
      expiredCourses,
      recentProgress,
      recentActive,
      continueCourse,
      continueLesson,
      streak,
      announcements,
      bookmarks,
      recentAttempts,
      pendingPurchases,
    };
  }, [state, user.id]);

  const {
    activeCourses,
    expiredCourses,
    recentProgress,
    recentActive,
    continueCourse,
    continueLesson,
    streak,
    announcements,
    bookmarks,
    recentAttempts,
    pendingPurchases,
  } = view;

  return (
    <div className="min-h-screen bg-secondary/32">
      <AppHeader />
      <main className="container-page py-8 sm:py-10">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
              My learning
            </p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-[-0.04em] text-navy sm:text-4xl">
              Welcome back, {user.name.split(" ")[0]}.
            </h1>
            <p className="mt-2 text-muted-foreground">
              Pick up where you stopped and keep your revision moving.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/courses">
              Browse more courses <ArrowRight />
            </Link>
          </Button>
        </div>

        {pendingPurchases.length > 0 && (
          <section className="mt-7 rounded-2xl border border-warning/25 bg-warning/8 p-5">
            <div className="flex items-start gap-3">
              <Clock3 className="mt-0.5 size-5 shrink-0 text-warning" />
              <div>
                <h2 className="font-extrabold text-navy">InstaPay verification pending</h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {pendingPurchases.length === 1
                    ? "Your course request is waiting for administrator confirmation."
                    : `${pendingPurchases.length} course requests are waiting for administrator confirmation.`}{" "}
                  Access appears here automatically after approval.
                </p>
              </div>
            </div>
          </section>
        )}

        <div className="mt-8 grid gap-5 xl:grid-cols-[1.55fr_.75fr]">
          {continueCourse && continueLesson ? (
            <section className="relative overflow-hidden rounded-3xl bg-navy p-6 text-white shadow-lift sm:p-8">
              <div className="absolute -right-24 -top-24 size-64 rounded-full bg-primary/20 blur-3xl" />
              <div className="relative grid items-center gap-7 md:grid-cols-[1fr_250px]">
                <div>
                  <Badge className="border-white/10 bg-white/8 text-white">Continue learning</Badge>
                  <p className="mt-5 text-sm font-bold text-primary">{continueCourse.subject}</p>
                  <h2 className="mt-1 text-2xl font-extrabold sm:text-3xl">
                    {continueLesson.title}
                  </h2>
                  <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/62">
                    {continueLesson.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-white/65">
                    <span className="inline-flex items-center gap-1.5">
                      <History className="size-3.5 text-primary" />
                      Resume at {formatClock(recentActive?.lastPositionSec ?? 0)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarClock className="size-3.5 text-primary" />
                      {Math.max(0, daysRemaining(continueCourse.accessCloseAt))} days left
                    </span>
                  </div>
                  <Button asChild size="lg" className="mt-6 h-11">
                    <Link
                      to="/learn/$courseId/$lessonId"
                      params={{ courseId: continueCourse.id, lessonId: continueLesson.id }}
                    >
                      <Play /> Continue lesson
                    </Link>
                  </Button>
                </div>
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/7">
                  <img
                    src={continueCourse.thumbnail}
                    alt=""
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-white/62">Course progress</span>
                      <span>{courseProgressPercent(state, user.id, continueCourse)}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/12">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{
                          width: `${courseProgressPercent(state, user.id, continueCourse)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <section className="rounded-3xl border bg-card p-8 shadow-card">
              <BookOpen className="size-9 text-primary" />
              <h2 className="mt-4 text-2xl font-extrabold text-navy">Choose your first course</h2>
              <p className="mt-2 text-muted-foreground">Your active learning will appear here.</p>
              <Button asChild className="mt-6">
                <Link to="/courses">Explore courses</Link>
              </Button>
            </section>
          )}

          <section className="rounded-3xl border bg-card p-6 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
                  Learning streak
                </p>
                <p className="mt-2 flex items-center gap-2 text-3xl font-extrabold text-navy">
                  <Flame className="size-7 fill-orange-500 text-orange-500" /> {streak.current} days
                </p>
              </div>
              <span className="grid size-10 place-items-center rounded-xl bg-orange-50 text-orange-600">
                <Trophy className="size-5" />
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Watch 10 minutes or pass one quiz today to keep it going.
            </p>
            <div className="mt-6 grid grid-cols-7 gap-1.5">
              {streak.week.map((day) => (
                <div key={day.key} className="text-center">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground">
                    {day.date.toLocaleDateString("en-GB", { weekday: "narrow" })}
                  </span>
                  <span
                    className={`mt-2 grid aspect-square place-items-center rounded-lg ${
                      day.active ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {day.active ? (
                      <Flame className="size-3.5 fill-current" />
                    ) : (
                      <span className="size-1.5 rounded-full bg-current opacity-25" />
                    )}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs font-semibold text-muted-foreground">
              Longest streak: {streak.longest} days
            </p>
          </section>
        </div>

        <section className="mt-9">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
                Active courses
              </p>
              <h2 className="mt-1 text-2xl font-extrabold text-navy">Keep learning</h2>
            </div>
            <span className="text-sm font-semibold text-muted-foreground">
              {activeCourses.length} active
            </span>
          </div>
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            {activeCourses.map((course) => {
              const progress = courseProgressPercent(state, user.id, course);
              const completed = completedLessons(state, user.id, course);
              const lessons = courseLessons(course).filter((lesson) => lesson.published);
              const latest = recentProgress.find((item) => item.courseId === course.id);
              const nextLesson = latest ? findLesson(course, latest.lessonId) : lessons[0];
              return (
                <article
                  key={course.id}
                  className="overflow-hidden rounded-2xl border bg-card shadow-card"
                >
                  <div className="grid sm:grid-cols-[190px_1fr]">
                    <img
                      src={course.thumbnail}
                      alt=""
                      className="h-full min-h-44 w-full object-cover"
                    />
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wide text-primary">
                            {course.subject}
                          </p>
                          <h3 className="mt-1 font-extrabold text-navy">{course.title}</h3>
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {Math.max(0, daysRemaining(course.accessCloseAt))} days left
                        </Badge>
                      </div>
                      <div className="mt-5 flex justify-between text-xs font-bold">
                        <span className="text-muted-foreground">
                          {completed} of {lessons.length} lessons complete
                        </span>
                        <span className="text-navy">{progress}%</span>
                      </div>
                      <Progress value={progress} className="mt-2 h-2" />
                      {nextLesson && (
                        <Button size="sm" className="mt-5" asChild>
                          <Link
                            to="/learn/$courseId/$lessonId"
                            params={{ courseId: course.id, lessonId: nextLesson.id }}
                          >
                            Continue <ArrowRight />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <div className="mt-9 grid gap-6 xl:grid-cols-[1fr_1fr]">
          <section className="rounded-2xl border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
                  Saved for revision
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-navy">Bookmarks</h2>
              </div>
              <Bookmark className="size-5 text-primary" />
            </div>
            <div className="mt-4 divide-y">
              {bookmarks.length ? (
                bookmarks.map(({ course, lesson }) => (
                  <Link
                    key={lesson.id}
                    to="/learn/$courseId/$lessonId"
                    params={{ courseId: course.id, lessonId: lesson.id }}
                    className="flex items-center justify-between gap-4 py-4 group"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-bold text-navy group-hover:text-primary">
                        {lesson.title}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {course.title} · {lesson.durationMin} min
                      </p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground group-hover:text-primary" />
                  </Link>
                ))
              ) : (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  Bookmark a lesson to find it here.
                </p>
              )}
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
                  Recent results
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-navy">Quiz attempts</h2>
              </div>
              <CheckCircle2 className="size-5 text-primary" />
            </div>
            <div className="mt-4 divide-y">
              {recentAttempts.map((attempt) => {
                const course = state.courses.find((item) => item.id === attempt.courseId);
                const lesson = course ? findLesson(course, attempt.lessonId) : undefined;
                return (
                  <div key={attempt.id} className="flex items-center justify-between gap-4 py-4">
                    <div className="min-w-0">
                      <p className="truncate font-bold text-navy">
                        {lesson?.title ?? "Lesson quiz"}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDateTime(attempt.takenAt)}
                      </p>
                    </div>
                    <Badge
                      className={
                        attempt.passed
                          ? "bg-success/10 text-success shadow-none"
                          : "bg-destructive/10 text-destructive shadow-none"
                      }
                    >
                      {attempt.score}% · {attempt.passed ? "Passed" : "Retry"}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <div className="mt-9 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
          <section className="rounded-2xl border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
                  Updates
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-navy">Announcements</h2>
              </div>
              <Bell className="size-5 text-primary" />
            </div>
            <div className="mt-4 divide-y">
              {announcements.slice(0, 3).map((announcement) => (
                <article key={announcement.id} className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-bold text-navy">{announcement.title}</h3>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {formatDate(announcement.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {announcement.body}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-6 shadow-card">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground">
                Past access
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-navy">Expired courses</h2>
            </div>
            <div className="mt-4 space-y-3">
              {expiredCourses.map((course) => (
                <article key={course.id} className="flex gap-4 rounded-xl bg-muted/60 p-4">
                  <img
                    src={course.thumbnail}
                    alt=""
                    className="size-16 rounded-lg object-cover grayscale-[25%]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="truncate font-bold text-navy">{course.title}</p>
                      <LockKeyhole className="size-4 shrink-0 text-muted-foreground" />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Access ended {formatDate(course.accessCloseAt)}
                    </p>
                    <p className="mt-2 text-xs font-bold text-navy">
                      {courseProgressPercent(state, user.id, course)}% history retained
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
