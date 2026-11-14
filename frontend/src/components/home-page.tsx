import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Check,
  Clock3,
  ExternalLink,
  FileText,
  MessageCircleHeart,
  Play,
  ShieldCheck,
} from "lucide-react";

import { PublicPage, SectionHeading } from "@/components/app-shell";
import { CourseCard } from "@/components/course-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { visibleCourses } from "@/lib/selectors";
import { useStore } from "@/lib/use-store";

const studyNeeds = [
  {
    icon: BookOpen,
    prompt: "I need one topic explained clearly",
    answer: "Focused clinical guides",
    action: "Browse subjects",
    to: "/courses" as const,
  },
  {
    icon: Clock3,
    prompt: "My exam is getting close",
    answer: "Structured revision at your pace",
    action: "Build a study path",
    to: "/courses" as const,
  },
  {
    icon: Play,
    prompt: "I want to try the teaching first",
    answer: "Free slides and snippets",
    action: "Open free previews",
    to: "/free-snippets" as const,
  },
];

const studentFeedback = [
  {
    image: "/student-feedback/clear-step-by-step.jpeg",
    alt: "Student message saying the sessions were useful and explained clearly step by step",
    highlight: "Clear, step-by-step teaching",
  },
  {
    image: "/student-feedback/useful-and-enjoyable.jpeg",
    alt: "Student message praising Dr Salma's useful and enjoyable teaching",
    highlight: "Useful and enjoyable",
  },
  {
    image: "/student-feedback/exam-support.jpeg",
    alt: "Student message saying the course helped greatly before exams",
    highlight: "Helpful before exams",
  },
  {
    image: "/student-feedback/clinical-improvement.jpeg",
    alt: "Student message explaining how the sessions connected concepts and corrected clinical mistakes",
    highlight: "Theory connected to practice",
  },
];

function CourseInterfacePreview() {
  return (
    <div
      className="relative mx-auto mt-10 max-w-4xl select-none text-left sm:mt-14"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute -inset-12 rounded-full bg-primary/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-t-[1.75rem] border border-b-0 border-white/15 bg-card shadow-2xl shadow-black/30">
        <div className="flex h-11 items-center gap-2 border-b bg-secondary/60 px-4">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
          <div className="mx-auto -translate-x-4 truncate rounded-md bg-white px-5 py-1 text-[10px] font-bold text-muted-foreground sm:-translate-x-5 sm:px-20">
            dentahelp.com/learn
          </div>
        </div>

        <div className="grid min-h-[330px] md:min-h-[390px] md:grid-cols-[15rem_1fr]">
          <aside className="hidden border-r bg-secondary/35 p-5 md:block">
            <div className="flex items-center gap-2.5">
              <img
                src="/denta-help-logo.png"
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-lg object-cover"
              />
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-brand-foreground">
                  Course
                </p>
                <p className="text-sm font-extrabold text-navy">Fixed Prosthodontics</p>
              </div>
            </div>
            <div className="mt-7 space-y-2 text-sm">
              <div className="rounded-xl bg-navy px-3.5 py-3 font-bold text-white">
                Full veneer crowns
              </div>
              <div className="rounded-xl px-3.5 py-3 font-semibold text-muted-foreground">
                All-ceramic crowns
              </div>
              <div className="rounded-xl px-3.5 py-3 font-semibold text-muted-foreground">
                Veneered crown prep
              </div>
            </div>
          </aside>

          <div className="p-4 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand-foreground">
                  Clinical slide guide
                </p>
                <p className="mt-1.5 text-xl font-extrabold text-navy sm:text-3xl">
                  Full veneer crown preparation
                </p>
              </div>
              <Badge
                variant="outline"
                className="border-primary/20 bg-accent text-accent-foreground"
              >
                Free preview
              </Badge>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl bg-navy p-5 text-white sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-foreground">
                Preparation sequence
              </p>
              <div className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
                {["Occlusal reduction", "Axial reduction", "Finish line"].map((label, index) => (
                  <div
                    key={label}
                    className="rounded-xl border border-white/12 bg-white/[0.07] p-2.5 sm:p-4"
                  >
                    <span className="text-xs font-extrabold text-brand-foreground">
                      0{index + 1}
                    </span>
                    <p className="mt-5 text-[11px] font-bold leading-4 sm:mt-7 sm:text-sm sm:leading-5">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground">
                <ShieldCheck className="size-4 text-brand-foreground" /> Preview before you enroll
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-foreground">
                Continue lesson <ArrowRight className="size-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CompactHomePage() {
  const { state } = useStore();
  const courses = visibleCourses(state);
  const featuredCourses = [...courses].reverse().slice(0, 3);

  return (
    <PublicPage>
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute left-1/2 top-40 size-[34rem] -translate-x-1/2 rounded-full bg-primary/12 blur-3xl" />
        <div className="container-page relative pb-0 pt-14 text-center sm:pt-20 lg:pt-24">
          <Badge className="border border-white/15 bg-white/8 px-3.5 py-1.5 text-white shadow-none">
            Dental courses built around your syllabus
          </Badge>
          <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-extrabold leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-[4.75rem]">
            Dental school is demanding.
            <span className="mt-1 block font-serif text-[1.08em] font-normal italic tracking-[-0.04em] text-brand-foreground">
              Your study plan shouldn’t be.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            Focused clinical slide guides, free teaching previews and one clear path through every
            topic you need at university.
          </p>
          <div className="mx-auto mt-8 flex max-w-md flex-col justify-center gap-3 sm:max-w-none sm:flex-row">
            <Button size="lg" asChild className="h-12 w-full px-7 text-base sm:w-auto">
              <Link to="/courses">
                Explore courses <ArrowRight />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="h-12 w-full border-white/20 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white sm:w-auto"
            >
              <Link to="/free-snippets">
                <Play /> Try a free lesson
              </Link>
            </Button>
          </div>
          <ul
            className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/65"
            aria-label="Course benefits"
          >
            {["Free previews", "Clear access dates", "Progress saved"].map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <Check className="size-4 text-brand-foreground" /> {benefit}
              </li>
            ))}
          </ul>

          <CourseInterfacePreview />
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 border-b bg-background py-16 sm:py-20 lg:py-24"
      >
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-foreground">
              Start where you are
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.04em] text-navy sm:text-5xl">
              What do you need{" "}
              <span className="font-serif font-normal italic text-brand-foreground">
                right now?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
              Choose the situation that sounds like you. Denta Help keeps the next step simple.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-5xl rounded-[2rem] bg-navy p-3 shadow-lift sm:p-5">
            <div className="grid gap-3 md:grid-cols-3">
              {studyNeeds.map(({ icon: Icon, prompt, answer, action, to }) => (
                <Link
                  key={prompt}
                  to={to}
                  className="group flex min-h-44 flex-col rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-left text-white transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.11] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-brand-foreground transition group-hover:bg-white/15">
                    <Icon className="size-5" />
                  </span>
                  <span className="mt-5 block text-base font-extrabold leading-6">{prompt}</span>
                  <span className="mt-1 block text-sm font-semibold leading-5 text-white/58">
                    {answer}
                  </span>
                  <span className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm font-extrabold text-brand-foreground">
                    {action}
                    <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm font-semibold text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Clock3 className="size-4 text-brand-foreground" /> Resume anytime
            </span>
            <span className="inline-flex items-center gap-2">
              <FileText className="size-4 text-brand-foreground" /> Slides included
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="size-4 text-brand-foreground" /> No subscription
            </span>
          </div>
        </div>
      </section>

      <section id="course-library" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-page">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Explore the library"
              title="Start with the subject you need now"
              description="Review the curriculum, teaching preview and access details before you decide."
            />
            <Button variant="outline" asChild className="self-start sm:self-auto">
              <Link to="/courses">
                View all courses <ArrowRight />
              </Link>
            </Button>
          </div>
          {courses.length > 0 ? (
            <div className="mt-9 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="mt-9 rounded-3xl border bg-card p-9 text-center shadow-card">
              <p className="font-bold text-navy">New courses are being prepared.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a free lesson in the meantime.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden border-y bg-navy py-16 text-white sm:py-20">
        <div className="pointer-events-none absolute -left-20 top-12 size-72 rounded-full bg-primary/12 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-brand-foreground/8 blur-3xl" />
        <div className="container-page relative grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-start lg:gap-14">
          <div className="lg:sticky lg:top-28">
            <div className="grid size-12 place-items-center rounded-2xl bg-white/10 text-brand-foreground ring-1 ring-white/10">
              <MessageCircleHeart className="size-5" />
            </div>
            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-foreground">
              Real student feedback
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
              Clear explanations that stay with you.
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-white/66">
              Honest messages from dental students who studied with Denta Help and applied that
              confidence in exams and clinical work.
            </p>
            <Button asChild className="mt-7">
              <Link to="/courses">
                Explore the courses <ArrowRight />
              </Link>
            </Button>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0">
            {studentFeedback.map((feedback) => (
              <figure
                key={feedback.image}
                className="group w-[82vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-2xl border border-white/12 bg-white/[0.07] p-2.5 shadow-2xl shadow-black/15 transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:bg-white/[0.1] sm:w-auto sm:max-w-none"
              >
                <a
                  href={feedback.image}
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden rounded-xl bg-[#f7f4ed] ring-1 ring-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
                  aria-label={`Open full-size student feedback: ${feedback.highlight}`}
                >
                  <img
                    src={feedback.image}
                    alt={feedback.alt}
                    loading="lazy"
                    className="h-auto w-full transition duration-500 group-hover:scale-[1.01]"
                  />
                </a>
                <figcaption className="flex items-center justify-between gap-4 px-2 pb-1 pt-3.5">
                  <div>
                    <p className="text-sm font-bold text-white">{feedback.highlight}</p>
                    <p className="mt-0.5 text-xs text-white/50">Message from a dental student</p>
                  </div>
                  <ExternalLink
                    className="size-4 shrink-0 text-brand-foreground/65"
                    aria-hidden="true"
                  />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-secondary/45 py-14 sm:py-16">
        <div className="container-page grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-brand-foreground">
              Start before you decide
            </p>
            <h2 className="mt-2 text-2xl font-extrabold text-navy sm:text-3xl">
              Preview the teaching. Then choose with confidence.
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
              Open the public slides and free snippets—no sign-up or payment needed.
            </p>
          </div>
          <Button size="lg" asChild className="w-full md:w-auto">
            <Link to="/free-snippets">
              Explore free previews <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </PublicPage>
  );
}
