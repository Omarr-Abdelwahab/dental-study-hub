import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  HelpCircle,
  ListVideo,
  LockKeyhole,
  Menu,
  MessageCircle,
  PlayCircle,
  Search,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { AppHeader } from "@/components/app-shell";
import { LessonQuiz } from "@/components/lesson-quiz";
import { YouTubePlayer } from "@/components/youtube-player";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  courseLessons,
  courseStats,
  daysRemaining,
  formatClock,
  formatDate,
  isAccessActive,
} from "@/lib/format";
import {
  courseProgressPercent,
  findLesson,
  getCourse,
  getProgress,
  isBookmarked,
  isEnrolled,
  lessonSection,
} from "@/lib/selectors";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/learn/$courseId/$lessonId")({
  component: LessonPage,
});

function LessonPage() {
  const { courseId, lessonId } = Route.useParams();
  const { state, user, enterDemo, saveProgress, toggleBookmark } = useStore();
  const course = getCourse(state, courseId);
  const lesson = course ? findLesson(course, lessonId) : undefined;
  const [search, setSearch] = useState("");
  const enrolled =
    Boolean(course) && (user?.role === "admin" || isEnrolled(state, user?.id ?? null, courseId));
  const activeAccess =
    user?.role === "admin" || Boolean(course && enrolled && isAccessActive(course));
  const previewMode = Boolean(lesson?.isPreview && !activeAccess);
  const canView = activeAccess || previewMode;
  const canUseMaterials = Boolean(activeAccess && user);

  const handleProgress = useCallback(
    (positionSec: number, percent: number) => {
      if (!canUseMaterials || user?.role !== "student") return;
      saveProgress({
        courseId,
        lessonId,
        positionSec,
        percent,
        watchedSec: positionSec,
      });
    },
    [canUseMaterials, courseId, lessonId, saveProgress, user?.role],
  );

  if (!course || !lesson) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container-page py-24 text-center">
          <h1 className="text-3xl font-extrabold text-navy">Lesson not found</h1>
          <Button asChild className="mt-6">
            <Link to="/courses">Browse courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const lessons = courseLessons(course).filter((item) => item.published);
  const currentIndex = lessons.findIndex((item) => item.id === lesson.id);
  const previous = currentIndex > 0 ? lessons[currentIndex - 1] : undefined;
  const next = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : undefined;
  const saved = user ? getProgress(state, user.id, lesson.id) : undefined;
  const bookmarked = isBookmarked(state, user?.id ?? null, lesson.id);
  const overall = user ? courseProgressPercent(state, user.id, course) : 0;
  const section = lessonSection(course, lesson.id);
  const stats = courseStats(course);

  if (!canView) {
    const expired = Boolean(enrolled && !isAccessActive(course));
    return (
      <div className="min-h-screen bg-secondary/35">
        <AppHeader />
        <div className="container-page grid min-h-[calc(100vh-108px)] place-items-center py-12">
          <div className="w-full max-w-xl rounded-3xl border bg-card p-8 text-center shadow-lift">
            <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-muted text-muted-foreground">
              <LockKeyhole className="size-7" />
            </span>
            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
              {expired ? "Course access ended" : "Student access required"}
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-navy">{lesson.title}</h1>
            <p className="mt-3 leading-7 text-muted-foreground">
              {expired
                ? `Access to ${course.title} ended on ${formatDate(course.accessCloseAt)}. Your progress and quiz history remain in your dashboard.`
                : "Enroll in this course to watch paid lessons, open the slides and complete the quizzes."}
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              {!user ? (
                <Button onClick={() => enterDemo("student")}>
                  <GraduationCap /> Enter student demo
                </Button>
              ) : !expired ? (
                <Button asChild>
                  <Link to="/checkout/$courseId" params={{ courseId: course.id }}>
                    Enroll now
                  </Link>
                </Button>
              ) : null}
              <Button variant="outline" asChild>
                <Link to="/dashboard">View dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const curriculum = (
    <Curriculum
      course={course}
      currentLessonId={lesson.id}
      userId={user?.id}
      state={state}
      query={search}
      onQueryChange={setSearch}
      locked={!activeAccess}
    />
  );

  return (
    <div className="min-h-screen bg-secondary/30">
      <AppHeader />
      <div className="border-b bg-card">
        <div className="container-page flex min-h-16 items-center justify-between gap-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="shrink-0">
              <Link to="/dashboard" aria-label="Back to dashboard">
                <ArrowLeft />
              </Link>
            </Button>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-primary">{course.title}</p>
              <p className="truncate font-extrabold text-navy">{lesson.title}</p>
            </div>
          </div>
          <div className="hidden min-w-52 items-center gap-3 md:flex">
            <div className="flex-1">
              <div className="flex justify-between text-[11px] font-bold text-muted-foreground">
                <span>Course progress</span>
                <span>{overall}%</span>
              </div>
              <Progress value={overall} className="mt-1.5 h-1.5" />
            </div>
            <Badge variant="outline" className="shrink-0 gap-1.5">
              <CalendarClock className="size-3.5" />{" "}
              {Math.max(0, daysRemaining(course.accessCloseAt))} days
            </Badge>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden"
                aria-label="Open curriculum"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[92vw] max-w-sm p-0">
              <SheetHeader className="border-b p-5 text-left">
                <SheetTitle>Course curriculum</SheetTitle>
              </SheetHeader>
              <div className="h-[calc(100vh-75px)]">{curriculum}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <main className="mx-auto grid max-w-[1500px] lg:grid-cols-[330px_1fr]">
        <aside className="hidden border-r bg-card lg:block">
          <div className="sticky top-[173px] h-[calc(100vh-173px)]">{curriculum}</div>
        </aside>

        <section className="min-w-0 px-4 py-6 sm:px-7 lg:px-9 lg:py-8">
          <div className="mx-auto max-w-5xl">
            {previewMode && (
              <div className="mb-5 flex flex-col gap-3 rounded-xl border border-primary/20 bg-accent/65 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-extrabold text-accent-foreground">
                    You are watching a free preview
                  </p>
                  <p className="mt-1 text-sm text-accent-foreground/72">
                    Slides and quiz results are included after enrollment.
                  </p>
                </div>
                <Button size="sm" asChild>
                  <Link to="/checkout/$courseId" params={{ courseId: course.id }}>
                    Enroll in course
                  </Link>
                </Button>
              </div>
            )}

            {saved && saved.lastPositionSec > 0 && (
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <PlayCircle className="size-4 text-primary" />
                Resuming from {formatClock(saved.lastPositionSec)}
              </div>
            )}
            <YouTubePlayer
              key={lesson.id}
              videoId={lesson.youtubeId}
              startAt={saved?.lastPositionSec ?? 0}
              onProgress={handleProgress}
            />

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{section?.title ?? course.subject}</Badge>
                  {saved?.completed && (
                    <Badge className="gap-1 bg-success text-success-foreground">
                      <Check className="size-3.5" /> Completed
                    </Badge>
                  )}
                  {previewMode && (
                    <Badge className="bg-accent text-accent-foreground">Free preview</Badge>
                  )}
                </div>
                <h1 className="mt-3 text-2xl font-extrabold tracking-[-0.03em] text-navy sm:text-3xl">
                  {lesson.title}
                </h1>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                  <Clock3 className="size-4 text-primary" /> {lesson.durationMin} minutes
                </p>
              </div>
              {user?.role === "student" && activeAccess && (
                <Button
                  variant={bookmarked ? "default" : "outline"}
                  onClick={() => toggleBookmark(course.id, lesson.id)}
                  className="shrink-0"
                >
                  <Bookmark className={bookmarked ? "fill-current" : ""} />
                  {bookmarked ? "Saved for revision" : "Bookmark lesson"}
                </Button>
              )}
            </div>

            <Tabs defaultValue="overview" className="mt-7">
              <div className="w-full overflow-x-auto rounded-xl bg-card shadow-card">
                <TabsList className="h-auto min-w-max justify-start gap-1 rounded-xl bg-card p-1.5">
                  <TabsTrigger value="overview" className="gap-2 py-2">
                    <BookOpen className="size-4" /> Overview
                  </TabsTrigger>
                  <TabsTrigger value="slides" className="gap-2 py-2">
                    <FileText className="size-4" /> Slides
                  </TabsTrigger>
                  <TabsTrigger value="quiz" className="gap-2 py-2">
                    <CheckCircle2 className="size-4" /> Quiz
                  </TabsTrigger>
                  <TabsTrigger value="support" className="gap-2 py-2">
                    <MessageCircle className="size-4" /> Support
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent
                value="overview"
                className="mt-5 rounded-2xl border bg-card p-6 shadow-card"
              >
                <h2 className="text-xl font-extrabold text-navy">About this lesson</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{lesson.description}</p>
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-muted/65 p-4">
                    <Clock3 className="size-4 text-primary" />
                    <p className="mt-2 text-xs font-bold text-muted-foreground">Duration</p>
                    <p className="mt-1 font-extrabold text-navy">{lesson.durationMin} minutes</p>
                  </div>
                  <div className="rounded-xl bg-muted/65 p-4">
                    <FileText className="size-4 text-primary" />
                    <p className="mt-2 text-xs font-bold text-muted-foreground">Materials</p>
                    <p className="mt-1 font-extrabold text-navy">
                      {lesson.pdfUrl ? "Slides included" : "Video only"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-muted/65 p-4">
                    <CheckCircle2 className="size-4 text-primary" />
                    <p className="mt-2 text-xs font-bold text-muted-foreground">Completion</p>
                    <p className="mt-1 font-extrabold text-navy">Pass the quiz</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="slides" className="mt-5">
                {!canUseMaterials ? (
                  <LockedMaterial text="Enroll in the course to view the lesson slides." />
                ) : lesson.pdfUrl ? (
                  <div className="overflow-hidden rounded-2xl border bg-card shadow-card">
                    <div className="flex items-center justify-between gap-4 border-b p-4">
                      <div className="min-w-0">
                        <p className="truncate font-extrabold text-navy">
                          {lesson.pdfName ?? "Lesson slides"}
                        </p>
                        <p className="text-xs text-muted-foreground">View inside the platform</p>
                      </div>
                      {lesson.allowDownload && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={lesson.pdfUrl} download={lesson.pdfName ?? true}>
                            <Download /> Download
                          </a>
                        </Button>
                      )}
                    </div>
                    <iframe
                      src={lesson.pdfUrl}
                      title={`${lesson.title} slides`}
                      className="h-[68vh] min-h-[520px] w-full bg-muted"
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
                    <FileText className="mx-auto size-8 text-muted-foreground" />
                    <h3 className="mt-3 font-extrabold text-navy">No slides for this lesson</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Everything you need is covered in the video.
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent
                value="quiz"
                className="mt-5 rounded-2xl border bg-card p-5 shadow-card sm:p-6"
              >
                <LessonQuiz
                  courseId={course.id}
                  lesson={lesson}
                  enabled={canUseMaterials && user?.role === "student"}
                />
              </TabsContent>

              <TabsContent
                value="support"
                className="mt-5 rounded-2xl border bg-card p-6 shadow-card"
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <HelpCircle className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-xl font-extrabold text-navy">Stuck on this topic?</h2>
                    <p className="mt-2 max-w-2xl leading-7 text-muted-foreground">
                      Send the lesson title and your question to the course support team. This demo
                      opens your email app with the topic already included.
                    </p>
                    <Button asChild className="mt-5">
                      <a
                        href={`mailto:support@dentalstudyhub.example?subject=Question about ${encodeURIComponent(lesson.title)}`}
                      >
                        <MessageCircle /> Ask about this lesson
                      </a>
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-7 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
              {previous ? (
                <Button variant="outline" asChild className="w-full sm:w-auto">
                  <Link
                    to="/learn/$courseId/$lessonId"
                    params={{ courseId: course.id, lessonId: previous.id }}
                  >
                    <ChevronLeft /> <span className="hidden sm:inline">Previous:</span>{" "}
                    {previous.title}
                  </Link>
                </Button>
              ) : (
                <span className="hidden sm:block" />
              )}
              {next ? (
                <Button asChild className="w-full sm:w-auto">
                  <Link
                    to="/learn/$courseId/$lessonId"
                    params={{ courseId: course.id, lessonId: next.id }}
                  >
                    <span className="hidden sm:inline">Next:</span> {next.title} <ChevronRight />
                  </Link>
                </Button>
              ) : (
                <Button asChild className="w-full sm:w-auto">
                  <Link to="/dashboard">
                    Finish course view <ArrowRight />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function LockedMaterial({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed bg-card p-10 text-center">
      <LockKeyhole className="mx-auto size-8 text-muted-foreground" />
      <h3 className="mt-3 font-extrabold text-navy">Enrollment required</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}

function Curriculum({
  course,
  currentLessonId,
  userId,
  state,
  query,
  onQueryChange,
  locked,
}: {
  course: NonNullable<ReturnType<typeof getCourse>>;
  currentLessonId: string;
  userId?: string | undefined;
  state: ReturnType<typeof useStore>["state"];
  query: string;
  onQueryChange: (value: string) => void;
  locked: boolean;
}) {
  const lowered = query.trim().toLowerCase();
  return (
    <div className="flex h-full flex-col">
      <div className="border-b p-4">
        <p className="flex items-center gap-2 text-sm font-extrabold text-navy">
          <ListVideo className="size-4 text-primary" /> Course content
        </p>
        <label className="relative mt-3 block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Find a lesson"
            className="h-9 bg-muted/55 pl-9"
          />
        </label>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-3">
          {course.sections.map((section, sectionIndex) => {
            const lessons = section.lessons.filter(
              (lesson) =>
                lesson.published && (!lowered || lesson.title.toLowerCase().includes(lowered)),
            );
            if (!lessons.length) return null;
            return (
              <div key={section.id} className="mb-5">
                <p className="px-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-muted-foreground">
                  {sectionIndex + 1}. {section.title}
                </p>
                <div className="mt-2 grid gap-1">
                  {lessons.map((lesson) => {
                    const progress = userId ? getProgress(state, userId, lesson.id) : undefined;
                    const current = lesson.id === currentLessonId;
                    const unavailable = locked && !lesson.isPreview;
                    return (
                      <Link
                        key={lesson.id}
                        to="/learn/$courseId/$lessonId"
                        params={{ courseId: course.id, lessonId: lesson.id }}
                        className={cn(
                          "flex items-start gap-3 rounded-xl p-3 transition",
                          current ? "bg-accent text-accent-foreground" : "hover:bg-muted/65",
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border",
                            progress?.completed
                              ? "border-success bg-success text-white"
                              : current
                                ? "border-primary bg-primary text-white"
                                : "border-border text-muted-foreground",
                          )}
                        >
                          {progress?.completed ? (
                            <Check className="size-3.5" />
                          ) : unavailable ? (
                            <LockKeyhole className="size-3" />
                          ) : (
                            <PlayCircle className="size-3.5" />
                          )}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold leading-5">{lesson.title}</span>
                          <span className="mt-1 block text-[11px] text-muted-foreground">
                            {lesson.durationMin} min {lesson.isPreview ? "· Free preview" : ""}
                          </span>
                          {progress && !progress.completed && progress.percent > 0 && (
                            <span className="mt-2 block h-1 overflow-hidden rounded-full bg-border">
                              <span
                                className="block h-full rounded-full bg-primary"
                                style={{ width: `${progress.percent}%` }}
                              />
                            </span>
                          )}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="border-t p-4 text-xs text-muted-foreground">
        {courseStats(course).lessons} lessons · Access ends {formatDate(course.accessCloseAt)}
      </div>
    </div>
  );
}
