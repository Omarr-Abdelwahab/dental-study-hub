import { createFileRoute } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { PublicPage, SectionHeading } from "@/components/app-shell";
import { CourseCard } from "@/components/course-card";
import { Input } from "@/components/ui/input";
import { courseStatus } from "@/lib/format";
import { visibleCourses } from "@/lib/selectors";
import { useStore } from "@/lib/use-store";

export const Route = createFileRoute("/courses/")({ component: CoursesPage });

function CoursesPage() {
  const { state } = useStore();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "open" | "upcoming" | "closed">("all");
  const courses = useMemo(() => {
    const q = query.trim().toLowerCase();
    return visibleCourses(state).filter((course) => {
      const matchesQuery =
        !q || `${course.title} ${course.subject} ${course.summary}`.toLowerCase().includes(q);
      const status = courseStatus(course);
      const matchesFilter =
        filter === "all" || status === filter || (filter === "closed" && status === "expired");
      return matchesQuery && matchesFilter;
    });
  }, [filter, query, state]);

  return (
    <PublicPage>
      <section className="border-b bg-secondary/45 py-14 sm:py-18">
        <div className="container-page">
          <SectionHeading
            eyebrow="Course catalogue"
            title="Choose the subject you need"
            description="Preview the teaching style, syllabus, price and fixed access date before you pay."
          />
          <div className="mt-8 flex flex-col gap-3 rounded-2xl border bg-card p-3 shadow-card md:flex-row md:items-center">
            <label className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by course or subject"
                className="h-11 border-0 bg-muted/65 pl-10 shadow-none"
              />
            </label>
            <div className="flex items-center gap-1 overflow-x-auto">
              <SlidersHorizontal className="mx-2 size-4 shrink-0 text-muted-foreground" />
              {(["all", "open", "upcoming", "closed"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-3 py-2 text-sm font-bold capitalize transition ${
                    filter === item
                      ? "bg-navy text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-navy"
                  }`}
                >
                  {item === "all" ? "All courses" : item === "closed" ? "Closed / expired" : item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-14 sm:py-18">
        <div className="container-page">
          <p className="mb-6 text-sm font-semibold text-muted-foreground">
            {courses.length} {courses.length === 1 ? "course" : "courses"} found
          </p>
          {courses.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed bg-card py-20 text-center">
              <Search className="mx-auto size-8 text-muted-foreground" />
              <h2 className="mt-4 text-xl font-extrabold text-navy">No matching courses</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Try another subject or clear the filter.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setFilter("all");
                }}
                className="mt-4 text-sm font-bold text-primary hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </PublicPage>
  );
}
