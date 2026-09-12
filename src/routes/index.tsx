import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookCheck,
  Check,
  Clock3,
  FileText,
  Flame,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import heroStudy from "@/assets/hero-study.jpg";
import { PublicPage, SectionHeading } from "@/components/app-shell";
import { CourseCard } from "@/components/course-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { visibleCourses } from "@/lib/selectors";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
  const { state } = useStore();
  const courses = visibleCourses(state);

  return (
    <PublicPage>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute -left-28 top-16 size-72 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-primary/16 blur-3xl" />
        <div className="container-page relative grid min-h-[620px] items-center gap-12 py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-20">
          <div className="max-w-2xl">
            <Badge className="border border-white/12 bg-white/8 px-3 py-1.5 text-white shadow-none">
              <Sparkles className="mr-1.5 size-3.5 text-primary" /> Built around your dental
              syllabus
            </Badge>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-[-0.05em] sm:text-5xl lg:text-6xl">
              Understand the subject.{" "}
              <span className="text-primary">Walk into the exam ready.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg">
              Focused video lessons, clear slide decks and a mandatory quiz after every
              topic—organized in the same order you study at university.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                <Link
                  to="/courses/$slug"
                  params={{ slug: "oral-pathology-essentials" }}
                  hash="preview"
                >
                  <Play /> Watch free preview
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-white/12 border-y border-white/12 py-4">
              <div className="pr-4">
                <p className="text-lg font-extrabold">Pay once</p>
                <p className="mt-1 text-xs text-white/55">Per course</p>
              </div>
              <div className="px-4">
                <p className="text-lg font-extrabold">Learn clearly</p>
                <p className="mt-1 text-xs text-white/55">Video + slides</p>
              </div>
              <div className="pl-4">
                <p className="text-lg font-extrabold">Check progress</p>
                <p className="mt-1 text-xs text-white/55">Quiz every lesson</p>
              </div>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -inset-5 rounded-[2.2rem] border border-white/8 bg-white/4" />
            <img
              src={heroStudy}
              alt="Dental students studying together"
              className="relative aspect-[4/3] w-full rounded-[1.8rem] object-cover shadow-2xl"
            />
            <div className="absolute -bottom-5 left-4 rounded-2xl border border-white/10 bg-white p-4 text-navy shadow-xl sm:-left-8">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-orange-50 text-orange-600">
                  <Flame />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    Current streak
                  </p>
                  <p className="text-lg font-extrabold">6 learning days</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-2 top-5 rounded-2xl border border-white/10 bg-navy/92 p-4 text-white shadow-xl backdrop-blur sm:-right-6">
              <p className="text-xs text-white/55">Oral Pathology</p>
              <p className="mt-1 text-sm font-extrabold">43% complete</p>
              <div className="mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-white/15">
                <div className="h-full w-[43%] rounded-full bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Courses"
              title="Study one subject properly"
              description="Every course tells you exactly what is included, what it costs and when access ends—before you pay."
            />
            <Button variant="outline" asChild className="self-start sm:self-auto">
              <Link to="/courses">
                View all courses <ArrowRight />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {courses.slice(0, 3).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y bg-secondary/45 py-20 sm:py-24">
        <div className="container-page">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="From syllabus to real understanding"
            description="No bundles, confusing memberships or hidden renewal. Pick the subject you need and follow a clear learning path."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                n: "01",
                icon: BookCheck,
                title: "Choose your subject",
                body: "Preview the curriculum, lesson format and access dates before committing.",
              },
              {
                n: "02",
                icon: Play,
                title: "Learn at your pace",
                body: "Resume each video exactly where you stopped and keep the slides beside you.",
              },
              {
                n: "03",
                icon: Check,
                title: "Prove you understood",
                body: "Pass the short quiz attached to every lesson and see your progress update.",
              },
            ].map(({ n, icon: Icon, title, body }) => (
              <div
                key={n}
                className="relative overflow-hidden rounded-2xl border bg-card p-7 shadow-card"
              >
                <span className="absolute right-5 top-3 text-5xl font-black text-navy/[0.055]">
                  {n}
                </span>
                <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-6 text-xl font-extrabold text-navy">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Built for revision"
              title="Everything useful stays in one place"
              description="The platform remembers the small details so you can spend your energy on the subject."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Clock3,
                  title: "Continue watching",
                  text: "Return to the exact lesson and timestamp.",
                },
                {
                  icon: FileText,
                  title: "Slides beside each lesson",
                  text: "Open the matching PDF without searching chats.",
                },
                {
                  icon: BookCheck,
                  title: "Mandatory checks",
                  text: "A 70% pass mark confirms lesson completion.",
                },
                {
                  icon: Flame,
                  title: "A streak that means something",
                  text: "Only real learning activity keeps it alive.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="flex gap-3 rounded-xl border bg-card p-4">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <h3 className="font-bold text-navy">{title}</h3>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-navy p-6 text-white shadow-lift sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.17em] text-primary">
              One clear rule
            </p>
            <h3 className="mt-3 text-3xl font-extrabold">Every course has a fixed closing date.</h3>
            <p className="mt-4 leading-7 text-white/68">
              Everyone gets access until the date shown on the course page, regardless of when they
              bought it. You see the date again at checkout and throughout your dashboard.
            </p>
            <div className="mt-7 rounded-2xl border border-white/10 bg-white/6 p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                <div>
                  <p className="font-bold">No recurring charges</p>
                  <p className="mt-1 text-sm text-white/60">
                    One transparent payment for one course.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <SectionHeading
            eyebrow="Questions"
            title="Know what you are buying"
            description="The rules are intentionally straightforward."
          />
          <Accordion type="single" collapsible className="w-full">
            {[
              [
                "Is this a recurring subscription?",
                "No. You make one payment for each course you choose.",
              ],
              [
                "How long can I access a course?",
                "Until the fixed closing date displayed on the course page and confirmed again at checkout.",
              ],
              [
                "Do I receive a certificate?",
                "No. These courses support your university subjects and are not accredited programmes.",
              ],
              [
                "Do quizzes lock later lessons?",
                "No. Every published lesson remains accessible, but you must pass its quiz to mark that lesson complete.",
              ],
              [
                "Can I download the slides?",
                "Download availability is shown per lesson. You can always view included slides inside the course.",
              ],
            ].map(([question, answer], index) => (
              <AccordionItem key={question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left font-bold text-navy">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="leading-6 text-muted-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="pb-20 sm:pb-24">
        <div className="container-page">
          <div className="rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground shadow-lift sm:px-12">
            <h2 className="text-3xl font-extrabold sm:text-4xl">Start with a free lesson.</h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/78">
              See the teaching style, curriculum and course dates before deciding.
            </p>
            <Button size="lg" variant="secondary" asChild className="mt-7">
              <Link to="/courses">
                Browse all courses <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
