import { brand } from "@/config/brand";
import type { Course, CourseStatus } from "./types";

export function formatPrice(amount: number) {
  return `${brand.currency} ${amount.toLocaleString("en-US")}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(brand.locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString(brand.locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString(brand.locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function daysBetween(from: Date, to: Date) {
  return Math.ceil((to.getTime() - from.getTime()) / 86_400_000);
}

export function daysRemaining(iso: string) {
  return daysBetween(new Date(), new Date(iso));
}

export function formatDuration(totalMinutes: number) {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

export function formatClock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const m = Math.floor(s / 60);
  const rest = s % 60;
  return `${m}:${rest.toString().padStart(2, "0")}`;
}

export function toDateKey(d: Date | string) {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toISOString().slice(0, 10);
}

export function courseStatus(course: Course, now = new Date()): CourseStatus {
  const t = now.getTime();
  if (t > new Date(course.accessCloseAt).getTime()) return "expired";
  if (t < new Date(course.salesOpenAt).getTime()) return "upcoming";
  if (t > new Date(course.salesCloseAt).getTime()) return "closed";
  return "open";
}

export const statusLabel: Record<CourseStatus, string> = {
  open: "Open",
  upcoming: "Upcoming",
  closed: "Enrollment Closed",
  expired: "Expired",
};

export function isAccessActive(course: Course, now = new Date()) {
  const t = now.getTime();
  return (
    t >= new Date(course.accessOpenAt).getTime() && t <= new Date(course.accessCloseAt).getTime()
  );
}

export function courseLessons(course: Course) {
  return course.sections.flatMap((s) => s.lessons);
}

export function courseStats(course: Course) {
  const lessons = courseLessons(course);
  return {
    lessons: lessons.length,
    sections: course.sections.length,
    quizzes: lessons.filter((l) => l.quiz.length > 0).length,
    minutes: lessons.reduce((sum, l) => sum + l.durationMin, 0),
  };
}
