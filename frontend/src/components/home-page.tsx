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

const learningSteps = [
  {
    icon: BookOpen,
    title: "Choose a topic",
    text: "See exactly what each clinical guide covers before you begin.",
  },
  {
    icon: FileText,
    title: "Preview the slides",
    text: "Open the complete presentation and check that it fits your study needs.",
  },
  {
    icon: Check,
    title: "Study at your pace",
    text: "Move through one clear slide at a time and resume whenever you need.",
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

export function CompactHomePage() {
  const { state } = useStore();
  const courses = visibleCourses(state);
  const featuredCourses = [...courses].reverse().slice(0, 3);

  return (
    <PublicPage>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute -left-24 top-12 size-72 rounded-full bg-primary/14 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 size-80 rounded-full bg-primary/16 blur-3xl" />
        <div className="container-page relative grid min-h-[500px] items-center gap-10 py-14 sm:py-16 lg:grid-cols-[minmax(190px,0.45fr)_minmax(0,1.55fr)] lg:gap-14">
          <div className="mx-auto w-full max-w-48 sm:max-w-56 lg:justify-self-start">
            <div className="relative aspect-square">
              <div className="absolute -inset-8 rounded-full bg-primary/18 blur-3xl" />
              <div className="absolute inset-3 rounded-full border border-white/10" />
              <div className="relative size-full overflow-hidden rounded-full border-[6px] border-white/12 shadow-2xl shadow-black/20 ring-1 ring-white/18">
                <img
                  src="/denta-help-logo.png"
                  alt="Denta Help logo"
                  width={224}
                  height={224}
                  className="size-full scale-[1.18] object-cover"
                />
              </div>
              <span className="absolute right-1 top-5 size-3 rounded-full bg-brand-foreground shadow-[0_0_20px_oklch(0.84_0.085_196/0.8)]" />
              <span className="absolute bottom-8 left-0 size-2 rounded-full bg-white/70" />
            </div>
          </div>
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="border border-white/12 bg-white/8 px-3 py-1.5 text-white shadow-none">
              Dental courses built around your syllabus
            </Badge>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.06] tracking-[-0.05em] sm:text-5xl lg:text-[3.55rem]">
              Study less randomly.{" "}
              <span className="text-brand-foreground">Walk into the exam ready.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/72 sm:text-lg">
              Focused clinical slide guides organized around the topics you study at university.
              Preview every course before you decide.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button size="lg" asChild className="h-12 px-6 text-base">
                <Link to="/courses">
                  Explore courses <ArrowRight />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 border-white/20 bg-white/5 px-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <Link to="/free-snippets">
                  <Play /> Watch free snippets
                </Link>
              </Button>
            </div>
            <ul
              className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/68"
              aria-label="Course benefits"
            >
              <li className="flex items-center gap-2">
                <Check className="size-4 text-brand-foreground" /> Free slide previews
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-brand-foreground" /> Clear access dates
              </li>
              <li className="flex items-center gap-2">
                <Check className="size-4 text-brand-foreground" /> Progress saved
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-page">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Popular courses"
              title="Start with the subject you need"
              description="Preview the curriculum and access details before you decide."
            />
            <Button variant="ghost" asChild className="self-start text-navy sm:self-auto">
              <Link to="/courses">
                View all courses <ArrowRight />
              </Link>
            </Button>
          </div>
          {courses.length > 0 ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border bg-card p-8 text-center">
              <p className="font-bold text-navy">New courses are being prepared.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try a free lesson in the meantime.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="relative overflow-hidden border-y bg-navy py-14 text-white sm:py-20">
        <div className="pointer-events-none absolute -left-20 top-12 size-72 rounded-full bg-primary/12 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-brand-foreground/8 blur-3xl" />
        <div className="container-page relative">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto grid size-11 place-items-center rounded-2xl bg-white/10 text-brand-foreground ring-1 ring-white/10">
              <MessageCircleHeart className="size-5" />
            </div>
            <p className="mt-4 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-foreground">
              Real student feedback
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.035em] sm:text-4xl">
              Explained clearly. Remembered when it matters.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-white/66">
              Honest messages from dental students who studied with Denta Help and took that
              confidence into their exams and clinical work.
            </p>
          </div>

          <div className="mt-10 grid items-start gap-5 md:grid-cols-2">
            {studentFeedback.map((feedback) => (
              <figure
                key={feedback.image}
                className="group overflow-hidden rounded-2xl border border-white/12 bg-white/[0.07] p-3 shadow-2xl shadow-black/15 transition duration-300 hover:-translate-y-1 hover:border-primary/45 hover:bg-white/[0.1]"
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
                <figcaption className="flex items-center justify-between gap-4 px-2 pb-1 pt-4">
                  <div>
                    <p className="text-sm font-bold text-white">{feedback.highlight}</p>
                    <p className="mt-0.5 text-xs text-white/50">
                      Real message from a dental student
                    </p>
                  </div>
                  <ExternalLink
                    className="size-4 shrink-0 text-brand-foreground/65"
                    aria-hidden="true"
                  />
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-9 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
            <p className="text-sm font-semibold text-white/72">
              See the teaching style for yourself.
            </p>
            <Button asChild>
              <Link to="/courses">
                Explore the courses <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y bg-secondary/45 py-14 sm:py-16">
        <div className="container-page grid gap-9 lg:grid-cols-[.72fr_1.28fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="A simpler study flow"
              title="Everything you need. Nothing to hunt for."
              description="Move through every clinical guide in one clear, distraction-free path."
            />
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
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
          <ol className="grid gap-3 sm:grid-cols-3">
            {learningSteps.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="rounded-2xl border bg-card p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="size-5" />
                  </span>
                  <span className="text-xs font-extrabold text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="mt-5 font-extrabold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-navy px-6 py-8 text-white shadow-lift sm:flex-row sm:items-center sm:px-9">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-brand-foreground">
                Not ready to choose?
              </p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Start with a free preview.
              </h2>
              <p className="mt-2 text-sm text-white/65 sm:text-base">
                Review the public slides and teaching snippets before choosing a course.
              </p>
            </div>
            <Button size="lg" asChild className="shrink-0">
              <Link to="/free-snippets">
                Watch free snippets <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
