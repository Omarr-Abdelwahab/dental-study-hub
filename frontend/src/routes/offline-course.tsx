import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpLeft,
  Check,
  GraduationCap,
  Heart,
  Images,
  MapPin,
  MessageCircle,
  Play,
  Sparkles,
  UserRound,
  UsersRound,
} from "lucide-react";

import heroStudy from "@/assets/hero-study.jpg";
import { PublicPage } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { brand } from "@/config/brand";

const feedback = [
  {
    image: "/student-feedback/exam-support.jpeg",
    alt: "رسالة من طالبة عن فائدة الكورس قبل الامتحانات والتزام دكتورة سلمى",
  },
  {
    image: "/student-feedback/supportive-teaching.svg",
    alt: "رسالة من طالبة عن أمانة دكتورة سلمى واستفادتها من التدريب العملي",
  },
  {
    image: "/student-feedback/useful-and-enjoyable.jpeg",
    alt: "رسالة من طالبة عن شرح دكتورة سلمى المفيد والممتع",
  },
];

const sessionTypes = [
  {
    icon: UsersRound,
    label: "Group Sessions",
    title: "نتعلم مع بعض، ونتطور مع بعض.",
    text: "هتتدرّب وسط مجموعة صغيرة، تسأل براحتك، وتتعلم من أخطائك وأخطاء زمايلك، مع توجيه وFeedback خطوة بخطوة.",
    points: ["مجموعة صغيرة", "تعلم تفاعلي", "Feedback مستمر"],
  },
  {
    icon: UserRound,
    label: "One-on-One Sessions",
    title: "الـ Session كلها على احتياجاتك.",
    text: "نركز على الـ Topics اللي إنت محتاجها، ونمشي بالسرعة اللي تناسبك، مع اهتمام كامل بشغلك وFeedback مباشر.",
    points: ["خطة على احتياجك", "سرعتك الخاصة", "متابعة فردية"],
  },
];

function SectionTitle({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 text-sm font-extrabold text-brand-foreground">
        <span className="h-px w-7 bg-primary/50" />
        {number}
        <span className="h-px w-7 bg-primary/50" />
      </span>
      <h2 className="mt-3 text-3xl font-black leading-tight text-navy sm:text-4xl">{title}</h2>
      {description && (
        <p className="mx-auto mt-3 max-w-xl text-base leading-8 text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}

function OfflineCoursePage() {
  const whatsAppHref = `${brand.whatsAppUrl}${brand.whatsAppUrl.includes("?") ? "&" : "?"}text=${encodeURIComponent(
    "مرحبًا DentaHelp، حابب أعرف تفاصيل أكتر عن الـ Offline Sessions",
  )}`;

  return (
    <PublicPage>
      <div dir="rtl" lang="ar" className="overflow-hidden font-[Tahoma,Arial,sans-serif]">
        <section className="relative isolate overflow-hidden bg-navy text-white">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,oklch(0.66_0.09_196/0.25),transparent_32%),radial-gradient(circle_at_10%_90%,oklch(1_0_0/0.08),transparent_35%)]" />
          <div className="container-page grid min-h-[620px] items-center gap-12 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-sm font-bold text-white/85">
                <Sparkles className="size-4 text-brand-foreground" />
                تدريب عملي لطلبة الأسنان
              </div>
              <h1 className="mt-6 text-4xl font-black leading-[1.25] sm:text-5xl lg:text-[3.6rem]">
                الـ <span className="text-brand-foreground">Preclinical</span> مش لازم تكون صعبة
                لوحدك
                <span className="mr-2 inline-block" aria-hidden="true">
                  ❤️
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-9 text-white/72">
                عارفين إن مرحلة الـ Preclinical فيها تحديات كتير، وعشان كده DentaHelp موجودة علشان
                تساعدك تتدرّب عملي، تفهم أخطاءك، وتبني مهاراتك وثقتك في شغلك خطوة بخطوة.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button size="lg" asChild className="h-13 rounded-xl px-6 text-base font-bold">
                  <a href={whatsAppHref} target="_blank" rel="noreferrer">
                    احجز مكانك <ArrowLeft />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-13 rounded-xl border-white/20 bg-white/5 px-6 text-base text-white hover:bg-white/10 hover:text-white"
                >
                  <a href="#sessions">شوف طرق التدريب</a>
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65">
                {["تدريب عملي", "Feedback مباشر", "خطوة بخطوة"].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <span className="grid size-5 place-items-center rounded-full bg-primary/20 text-brand-foreground">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:mr-auto">
              <div className="absolute -inset-5 rounded-[2.25rem] border border-white/10" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/8 p-2 shadow-2xl shadow-black/25">
                <img
                  src={heroStudy}
                  alt="طلبة أسنان بيتعلموا ويتدربوا مع بعض"
                  className="aspect-[4/3] w-full rounded-[1.55rem] object-cover"
                />
                <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-navy/85 p-4 shadow-xl backdrop-blur-md">
                  <div>
                    <p className="text-xs text-white/58">مساحة آمنة للتجربة</p>
                    <p className="mt-1 font-extrabold">اسأل، جرّب، واتعلم من أخطائك</p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-white">
                    <Heart className="size-5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sessions" className="py-16 sm:py-20">
          <div className="container-page">
            <SectionTitle
              number="01"
              title="اختار طريقة التدريب اللي تناسبك"
              description="سواء بتحب طاقة المجموعة أو محتاج تركيز فردي، عندنا مساحة مناسبة لطريقة تعلمك."
            />
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-2">
              {sessionTypes.map(({ icon: Icon, label, title, text, points }, index) => (
                <article
                  key={label}
                  className={`group relative overflow-hidden rounded-3xl border p-7 shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-8 ${index === 0 ? "bg-navy text-white" : "bg-card"}`}
                >
                  <div
                    className={`absolute -left-12 -top-12 size-40 rounded-full ${index === 0 ? "bg-primary/16" : "bg-accent"}`}
                  />
                  <div
                    className={`relative grid size-13 place-items-center rounded-2xl ${index === 0 ? "bg-white/10 text-brand-foreground" : "bg-accent text-accent-foreground"}`}
                  >
                    <Icon className="size-6" />
                  </div>
                  <p
                    className={`relative mt-6 text-sm font-extrabold tracking-wide ${index === 0 ? "text-brand-foreground" : "text-brand-foreground"}`}
                  >
                    {label}
                  </p>
                  <h3
                    className={`relative mt-2 text-2xl font-black ${index === 0 ? "text-white" : "text-navy"}`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`relative mt-4 leading-8 ${index === 0 ? "text-white/66" : "text-muted-foreground"}`}
                  >
                    {text}
                  </p>
                  <ul
                    className={`relative mt-6 space-y-3 border-t pt-5 ${index === 0 ? "border-white/12" : "border-border"}`}
                  >
                    {points.map((point) => (
                      <li key={point} className="flex items-center gap-2.5 text-sm font-bold">
                        <Check
                          className={`size-4 ${index === 0 ? "text-brand-foreground" : "text-primary"}`}
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y bg-secondary/45 py-16 sm:py-20">
          <div className="container-page grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <span className="text-sm font-extrabold text-brand-foreground">02 — شوف التجربة</span>
              <h2 className="mt-3 text-3xl font-black leading-tight text-navy sm:text-4xl">
                حابب تعرف بنشتغل إزاي؟
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                الكلام مهم، بس الأحسن إنك تشوف بنفسك! فيديو قصير من الـ Offline Sessions هيوريك شكل
                التدريب والـ Feedback العملي.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm font-bold text-navy">
                <span className="grid size-9 place-items-center rounded-full bg-accent text-primary">
                  <Play className="size-4 fill-current" />
                </span>
                الفيديو هيتضاف قريبًا
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-3xl bg-navy shadow-lift">
              <img
                src={heroStudy}
                alt="لقطة تمثيلية لمساحة التدريب"
                className="size-full object-cover opacity-35"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/20 to-transparent" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center text-white">
                  <span className="mx-auto grid size-18 place-items-center rounded-full border border-white/25 bg-white/12 backdrop-blur">
                    <Play className="mr-1 size-7 fill-current" />
                  </span>
                  <p className="mt-4 text-sm font-bold text-white/75">
                    فيديو من الـ Offline Sessions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-page grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative mx-auto w-full max-w-md">
              <div className="aspect-[4/5] overflow-hidden rounded-[2rem] bg-navy p-7 text-white shadow-lift">
                <div className="grid h-full place-items-center rounded-[1.5rem] border border-white/12 bg-[radial-gradient(circle_at_50%_25%,oklch(0.66_0.09_196/0.28),transparent_38%)] text-center">
                  <div>
                    <img
                      src="/denta-help-logo.png"
                      alt="DentaHelp"
                      className="mx-auto size-28 rounded-full border-4 border-white/12 object-cover shadow-xl"
                    />
                    <p className="mt-6 text-2xl font-black">د. سلمى</p>
                    <p className="mt-2 text-sm font-bold text-brand-foreground">مؤسسة DentaHelp</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -right-5 rounded-2xl border bg-card p-4 shadow-lift">
                <GraduationCap className="size-6 text-primary" />
              </div>
            </div>
            <div>
              <span className="text-sm font-extrabold text-brand-foreground">
                03 — اتعرف على مدرّبتك
              </span>
              <h2 className="mt-3 text-3xl font-black text-navy sm:text-4xl">مين هي د. سلمى؟</h2>
              <p className="mt-5 text-lg leading-9 text-muted-foreground">
                خريجة كلية طب الأسنان جامعة عين شمس، ومؤسسة DentaHelp.
              </p>
              <p className="mt-4 text-lg leading-9 text-muted-foreground">
                بحب إن التدريب يكون خطوة بخطوة، وإنك تبقى مرتاح تسأل وتجرب وتتعلم من أخطائك، علشان
                تطوّر مهاراتك وتدخل الـ Clinical بثقة أكبر.
              </p>
              <blockquote className="mt-7 rounded-2xl border-r-4 border-primary bg-accent/65 p-5 text-lg font-bold leading-8 text-navy">
                “هدفي إنك تفهم إنت بتعمل إيه وليه — مش بس تحفظ الخطوات.”
              </blockquote>
            </div>
          </div>
        </section>

        <section className="bg-navy py-16 text-white sm:py-20">
          <div className="container-page">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-extrabold text-brand-foreground">04 — كلام الطلبة</span>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">تجربة الطلبة معانا</h2>
              <p className="mt-4 text-lg text-white/66">
                مش لازم تاخد كلامنا بس، شوف تجربتهم بنفسك!
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-6xl items-stretch gap-5 md:grid-cols-3">
              {feedback.map((item, index) => (
                <a
                  key={item.image}
                  href={item.image}
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex flex-col overflow-hidden rounded-2xl border border-white/12 bg-white/7 p-2 transition hover:-translate-y-1 hover:border-primary/50 ${index === 1 ? "md:translate-y-7 md:hover:translate-y-6" : ""}`}
                >
                  <span className="flex aspect-video items-center overflow-hidden rounded-xl bg-[#f8f5ed]">
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      className="size-full object-contain"
                    />
                  </span>
                  <span className="mt-auto flex items-center justify-between px-3 py-3 text-xs font-bold text-white/65">
                    Feedback حقيقي من طالب <ArrowUpLeft className="size-4" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="container-page grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="text-sm font-extrabold text-brand-foreground">
                05 — مكان التدريب
              </span>
              <h2 className="mt-3 text-3xl font-black text-navy sm:text-4xl">
                تعالى شوف المكان بنفسك!
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                مساحة مريحة ومجهزة علشان تركز في التدريب وتاخد وقتك في التطبيق.
              </p>
              <div className="mt-7 rounded-2xl border bg-card p-5 shadow-card">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-primary">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="font-black text-navy">عنوان مكان التدريب</p>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      ابعتلنا على WhatsApp وهنتبعتلك العنوان الدقيق والـ Google Maps location.
                    </p>
                  </div>
                </div>
                <Button variant="outline" asChild className="mt-5 w-full rounded-xl">
                  <a href={brand.trainingMapUrl || whatsAppHref} target="_blank" rel="noreferrer">
                    {brand.trainingMapUrl ? "افتح على Google Maps" : "اطلب الـ Location"}
                    <ArrowLeft />
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {["مساحة التدريب", "الأدوات والـ Facilities", "جو مريح للتعلّم"].map(
                (label, index) => (
                  <div
                    key={label}
                    className={`grid min-h-40 place-items-center rounded-2xl border bg-secondary/55 p-5 text-center ${index === 0 ? "col-span-2 min-h-52" : ""}`}
                  >
                    <div>
                      <Images className="mx-auto size-7 text-primary/65" />
                      <p className="mt-3 text-sm font-bold text-navy">{label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">الصورة هتضاف هنا</p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section className="border-t bg-secondary/45 py-16 sm:py-20">
          <div className="container-page">
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-navy px-6 py-10 text-center text-white shadow-lift sm:px-12 sm:py-14">
              <div className="absolute -right-16 -top-16 size-56 rounded-full bg-primary/15 blur-2xl" />
              <MessageCircle className="relative mx-auto size-9 text-brand-foreground" />
              <h2 className="relative mt-4 text-3xl font-black sm:text-4xl">عندك أسئلة؟</h2>
              <p className="relative mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/68">
                لو حابب تعرف تفاصيل أكتر أو محتار تختار أنهي Session، ابعتلنا على WhatsApp وهنساعدك
                تختار الأنسب ليك.
              </p>
              <Button
                size="lg"
                asChild
                className="relative mt-7 h-13 rounded-xl px-7 text-base font-bold"
              >
                <a href={whatsAppHref} target="_blank" rel="noreferrer">
                  اسأل عن الـ Offline Sessions <ArrowLeft />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PublicPage>
  );
}

export const Route = createFileRoute("/offline-course")({
  head: () => ({
    meta: [
      { title: "Offline Training | Denta Help" },
      {
        name: "description",
        content:
          "تدريب عملي لطلبة أسنان الـ Preclinical في Group Sessions أو One-on-One مع د. سلمى من DentaHelp.",
      },
    ],
  }),
  component: OfflineCoursePage,
});
