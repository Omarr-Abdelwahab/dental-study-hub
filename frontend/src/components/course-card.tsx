import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, Clock3, FileText } from "lucide-react";

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
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border/70 bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lift">
      <Link
        to="/courses/$slug"
        params={{ slug: course.slug }}
        className="relative block overflow-hidden bg-muted"
      >
        <img
          src={course.thumbnail}
          alt=""
          className="aspect-video w-full object-cover transition duration-500 group-hover:scale-[1.035]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-navy/10" />
        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4">
          <CourseStatusBadge course={course} />
          {preview && (
            <Badge className="gap-1.5 border border-white/20 bg-navy/75 text-white shadow-sm backdrop-blur-md">
              <FileText className="size-3" /> Slides included
            </Badge>
          )}
        </div>
        <p className="absolute inset-x-5 bottom-4 text-xs font-extrabold uppercase tracking-[0.15em] text-white/90">
          {course.subject}
        </p>
      </Link>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <Link to="/courses/$slug" params={{ slug: course.slug }}>
          <h3 className="text-xl font-extrabold leading-snug text-navy transition-colors group-hover:text-primary">
            {course.title}
          </h3>
        </Link>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
          {course.summary}
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-navy">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5">
            <FileText className="size-3.5 text-primary" /> Clinical slide guide
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5">
            <Clock3 className="size-3.5 text-primary" /> {formatDuration(stats.minutes)}
          </span>
        </div>
        <div className="mt-4 border-t pt-4 text-xs font-semibold text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <CalendarClock className="size-3.5 text-primary" /> Access until{" "}
            {formatDate(course.accessCloseAt)}
          </span>
        </div>
        <div className="mt-auto flex items-center justify-between gap-4 pt-5">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
              Course access
            </p>
            <p className="mt-0.5 text-base font-extrabold text-navy">{formatPrice(course.price)}</p>
          </div>
          <Button size="sm" asChild>
            <Link to="/courses/$slug" params={{ slug: course.slug }}>
              Preview course <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
