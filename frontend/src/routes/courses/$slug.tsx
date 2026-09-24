import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  Check,
  CheckCircle2,
  Clock3,
  FileQuestion,
  LockKeyhole,
  Play,
  ShieldCheck,
} from "lucide-react";

import { PublicPage } from "@/components/app-shell";
import { CourseStatusBadge } from "@/components/course-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  courseLessons,
  courseStats,
  courseStatus,
  formatDate,
  formatDuration,
  formatPrice,
  isAccessActive,
} from "@/lib/format";
import {
  courseProgressPercent,
  getCourse,
  isEnrolled,
  lastActivityInCourse,
} from "@/lib/selectors";
import { useStore } from "@/lib/use-store";
import { getVideoEmbedUrl, getVideoSourceUrl, isGoogleDriveSource } from "@/lib/video-source";

export const Route = createFileRoute("/courses/$slug")({ component: CourseDetailsPage });

function CourseDetailsPage() {
  const { slug } = Route.useParams();
  const { state, user } = useStore();
  const course = getCourse(state, slug);

  if (!course) {
    return (
      <PublicPage>
        <div className="container-page py-24 text-center">
          <h1 className="text-3xl font-extrabold text-navy">Course not found</h1>
          <Button asChild className="mt-6">
            <Link to="/courses">Browse courses</Link>
          </Button>
        </div>
      </PublicPage>
    );
  }

  const stats = courseStats(course);
  const lessons = courseLessons(course).filter((lesson) => lesson.published);
  const preview = lessons.find((lesson) => lesson.isPreview);
  const enrolled = isEnrolled(state, user?.id ?? null, course.id);
  const active = isAccessActive(course);
  const status = courseStatus(course);
  const progress = user ? courseProgressPercent(state, user.id, course) : 0;
  const last = user ? lastActivityInCourse(state, user.id, course) : undefined;
  const targetLesson = last?.lessonId ?? lessons[0]?.id ?? "";

  const cta =
    enrolled && active ? (
      <Button size="lg" className="h-12 w-full text-base" asChild>
        <Link
          to="/learn/$courseId/$lessonId"
          params={{ courseId: course.id, lessonId: targetLesson }}
        >
          {progress ? `Continue course · ${progress}%` : "Start course"} <ArrowRight />
        </Link>
      </Button>
    ) : status === "open" ? (
      <Button size="lg" className="h-12 w-full text-base" asChild>
        <Link to="/checkout/$courseId" params={{ courseId: course.id }}>
          Enroll now <ArrowRight />
        </Link>
      </Button>
    ) : (
      <Button size="lg" className="h-12 w-full" disabled>
        {status === "upcoming"
          ? "Enrollment opens soon"
          : status === "expired"
            ? "Course access ended"
            : "Enrollment closed"}
      </Button>
    );

  return (
    <PublicPage>
      <section className="bg-navy text-white">
        <div className="container-page grid gap-10 py-12 lg:grid-cols-[1.15fr_.85fr] lg:py-16">
          <div className="self-center">
            <div className="flex flex-wrap items-center gap-2">
              <CourseStatusBadge course={course} />
              <Badge className="border-white/10 bg-white/8 text-white">{course.subject}</Badge>
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-5xl">
              {course.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/68">{course.summary}</p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/72">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="size-4 text-primary" /> {stats.lessons} lessons
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4 text-primary" /> {formatDuration(stats.minutes)}
              </span>
              <span className="inline-flex items-center gap-2">
                <FileQuestion className="size-4 text-primary" /> {stats.quizzes} quizzes
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarClock className="size-4 text-primary" /> Access until{" "}
                {formatDate(course.accessCloseAt)}
              </span>
            </div>
          </div>
          <img
            src={course.thumbnail}
            alt=""
            className="aspect-[16/10] w-full rounded-3xl object-cover shadow-2xl"
          />
        </div>
      </section>

      <section className="border-b bg-secondary/45">
        <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_360px]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
              Course overview
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy">What you will learn</h2>
            <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">{course.description}</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {course.outcomes.map((outcome) => (
                <div key={outcome} className="flex gap-3 rounded-xl border bg-card p-4">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-success/10 text-success">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-sm font-semibold leading-6 text-navy">{outcome}</span>
                </div>
              ))}
            </div>
          </div>
          <aside className="lg:-mt-24">
            <div className="sticky top-28 rounded-2xl border bg-card p-6 shadow-lift">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                One-time payment
              </p>
              <p className="mt-1 text-3xl font-extrabold text-navy">{formatPrice(course.price)}</p>
              <div className="mt-5 rounded-xl border border-primary/20 bg-accent/70 p-4">
                <p className="flex items-center gap-2 text-sm font-extrabold text-accent-foreground">
                  <CalendarClock className="size-4" /> Fixed access date
                </p>
                <p className="mt-1 text-sm text-accent-foreground/80">
                  All student access ends on <strong>{formatDate(course.accessCloseAt)}</strong>.
                </p>
              </div>
              <div className="mt-5">{cta}</div>
              <div className="mt-5 grid gap-2.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-success" /> All published lessons included
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-success" /> Slides and mandatory quizzes
                </span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-success" /> No recurring charge
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {preview && (
        <section id="preview" className="py-16 sm:py-20">
          <div className="container-page grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
            <div className="overflow-hidden rounded-2xl bg-black shadow-lift">
              <div className="aspect-video">
                {isGoogleDriveSource(preview.youtubeId) ? (
                  <video
                    controls
                    preload="metadata"
                    className="h-full w-full bg-black object-contain"
                    src={getVideoSourceUrl(preview.youtubeId)}
                  />
                ) : (
                  <iframe
                    className="h-full w-full"
                    src={getVideoEmbedUrl(preview.youtubeId)}
                    title={`${preview.title} free preview`}
                    referrerPolicy="strict-origin-when-cross-origin"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </div>
            <div>
              <Badge
                variant="outline"
                className="gap-1.5 border-primary/25 bg-accent text-accent-foreground"
              >
                <Play className="size-3.5" /> Free lesson
              </Badge>
              <h2 className="mt-4 text-3xl font-extrabold text-navy">
                Try the teaching style first
              </h2>
              <h3 className="mt-4 text-lg font-bold text-navy">{preview.title}</h3>
              <p className="mt-2 leading-7 text-muted-foreground">{preview.description}</p>
              <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <Clock3 className="size-4 text-primary" /> {preview.durationMin} minutes
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="border-y bg-secondary/45 py-16 sm:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
              Curriculum
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-navy">Inside the course</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {stats.sections} sections · {stats.lessons} lessons · {formatDuration(stats.minutes)}{" "}
              total
            </p>
          </div>
          <Accordion
            type="multiple"
            defaultValue={[course.sections[0]?.id ?? ""]}
            className="space-y-3"
          >
            {course.sections.map((section, sectionIndex) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="overflow-hidden rounded-xl border bg-card px-5 shadow-card"
              >
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left">
                    <span className="block text-xs font-bold uppercase tracking-wide text-primary">
                      Section {sectionIndex + 1}
                    </span>
                    <span className="mt-1 block font-extrabold text-navy">{section.title}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="divide-y">
                    {section.lessons.map((lesson, lessonIndex) => (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between gap-4 py-3 text-sm"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted font-bold text-muted-foreground">
                            {lessonIndex + 1}
                          </span>
                          <div className="min-w-0">
                            <p className="font-bold text-navy">{lesson.title}</p>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                              {lesson.durationMin} min · Quiz included
                            </p>
                          </div>
                        </div>
                        {lesson.isPreview ? (
                          <Badge className="shrink-0 bg-accent text-accent-foreground">
                            Preview
                          </Badge>
                        ) : (
                          <LockKeyhole className="size-4 shrink-0 text-muted-foreground/60" />
                        )}
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </PublicPage>
  );
}
