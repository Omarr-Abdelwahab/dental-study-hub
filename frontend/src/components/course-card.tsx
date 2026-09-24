import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, CalendarClock, Clock3, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Course } from "@/lib/types";
import {
  courseStats,
  courseStatus,
  formatDate,
  formatDuration,
  formatPrice,
  statusLabel,
} from "@/lib/format";
import { cn } from "@/lib/utils";

const statusStyles = {
  open: "border-success/20 bg-success/10 text-success",
  upcoming: "border-primary/20 bg-accent text-accent-foreground",
  closed: "border-warning/30 bg-warning/10 text-amber-800",
  expired: "border-border bg-muted text-muted-foreground",
};

export function CourseStatusBadge({ course }: { course: Course }) {
  const status = courseStatus(course);
  return (
    <Badge variant="outline" className={cn("border font-bold", statusStyles[status])}>
      {statusLabel[status]}
    </Badge>
  );
}

export function CourseCard({ course }: { course: Course }) {
  const stats = courseStats(course);
  const preview = course.sections
    .flatMap((section) => section.lessons)
    .some((lesson) => lesson.isPreview);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link
        to="/courses/$slug"
        params={{ slug: course.slug }}
        className="relative block overflow-hidden"
      >
        <img
          src={course.thumbnail}
          alt=""
          className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <CourseStatusBadge course={course} />
          {preview && (
            <Badge className="gap-1 border-0 bg-navy/88 text-white backdrop-blur">
              <PlayCircle className="size-3" /> Free preview
            </Badge>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-primary">
          {course.subject}
        </p>
        <Link to="/courses/$slug" params={{ slug: course.slug }}>
          <h3 className="mt-2 text-xl font-extrabold leading-snug text-navy transition-colors group-hover:text-primary">
            {course.title}
          </h3>
        </Link>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {course.summary}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-2 border-y py-3 text-xs font-semibold text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-3.5 text-primary" /> {stats.lessons} lessons
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="size-3.5 text-primary" /> {formatDuration(stats.minutes)}
          </span>
          <span className="col-span-2 inline-flex items-center gap-1.5">
            <CalendarClock className="size-3.5 text-primary" /> Access until{" "}
            {formatDate(course.accessCloseAt)}
          </span>
        </div>
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              One-time payment
            </p>
            <p className="mt-0.5 text-xl font-extrabold text-navy">{formatPrice(course.price)}</p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/courses/$slug" params={{ slug: course.slug }}>
              View course <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
