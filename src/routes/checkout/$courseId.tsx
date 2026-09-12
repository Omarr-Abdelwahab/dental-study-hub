import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarClock,
  Check,
  CheckCircle2,
  Clock3,
  CreditCard,
  GraduationCap,
  LoaderCircle,
  LockKeyhole,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { AppHeader, BrandMark } from "@/components/app-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { daysRemaining, formatDate, formatPrice, courseStatus } from "@/lib/format";
import { createPayment, type PaymentResult } from "@/lib/payment-service";
import { getCourse } from "@/lib/selectors";
import { useStore } from "@/lib/store";
import type { PaymentStatus } from "@/lib/types";

export const Route = createFileRoute("/checkout/$courseId")({ component: CheckoutPage });

function CheckoutPage() {
  const { courseId } = Route.useParams();
  const { state, user, enterDemo, recordPayment } = useStore();
  const course = getCourse(state, courseId);
  const [agreed, setAgreed] = useState(false);
  const [simulation, setSimulation] = useState<PaymentStatus>("success");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<PaymentResult | null>(null);

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container-page py-24 text-center">
          <h1 className="text-3xl font-extrabold text-navy">Course not found</h1>
          <Button asChild className="mt-6">
            <Link to="/courses">Browse courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (courseStatus(course) !== "open") {
    return (
      <div className="min-h-screen bg-background">
        <AppHeader />
        <div className="container-page max-w-2xl py-24 text-center">
          <TriangleAlert className="mx-auto size-10 text-warning" />
          <h1 className="mt-4 text-3xl font-extrabold text-navy">Enrollment is not available</h1>
          <p className="mt-3 text-muted-foreground">
            Sales for this course are not currently open.
          </p>
          <Button variant="outline" asChild className="mt-6">
            <Link to="/courses/$slug" params={{ slug: course.slug }}>
              Return to course
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const pay = async () => {
    if (!user || user.role !== "student" || !agreed) return;
    setProcessing(true);
    setResult(null);
    try {
      const payment = await createPayment({
        courseId: course.id,
        userId: user.id,
        amount: course.price,
        currency: "EGP",
        simulate: simulation,
      });
      recordPayment({
        courseId: course.id,
        amount: course.price,
        txnId: payment.txnId,
        status: payment.status,
        method: payment.method,
      });
      setResult(payment);
      if (payment.status === "success")
        toast.success("Demo payment approved. Course access is active.");
      else if (payment.status === "pending") toast.warning("Demo payment is pending.");
      else toast.error("Demo payment failed. Try the success scenario.");
    } finally {
      setProcessing(false);
    }
  };

  if (!user || user.role !== "student") {
    return (
      <div className="min-h-screen bg-secondary/40">
        <AppHeader />
        <div className="container-page grid min-h-[calc(100vh-108px)] place-items-center py-12">
          <div className="w-full max-w-lg rounded-3xl border bg-card p-7 text-center shadow-lift sm:p-9">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
              <LockKeyhole className="size-6" />
            </span>
            <h1 className="mt-5 text-2xl font-extrabold text-navy">Sign in before checkout</h1>
            <p className="mt-2 leading-6 text-muted-foreground">
              Your purchase needs a student account so the course can appear in My Learning.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Button onClick={() => enterDemo("student")} className="h-11">
                <GraduationCap /> Use student demo
              </Button>
              <Button variant="outline" asChild className="h-11">
                <Link to="/auth">Sign in normally</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (result?.status === "success") {
    return (
      <div className="min-h-screen bg-secondary/40">
        <AppHeader />
        <div className="container-page grid min-h-[calc(100vh-108px)] place-items-center py-12">
          <div className="w-full max-w-xl rounded-3xl border bg-card p-7 text-center shadow-lift sm:p-10">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-success/12 text-success">
              <CheckCircle2 className="size-8" />
            </span>
            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-success">
              Enrollment activated
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-navy">
              You are in, {user.name.split(" ")[0]}.
            </h1>
            <p className="mt-3 leading-7 text-muted-foreground">
              {course.title} is now in your dashboard. Access remains available until{" "}
              <strong className="text-navy">{formatDate(course.accessCloseAt)}</strong>.
            </p>
            <div className="mt-6 rounded-xl bg-muted p-4 text-left text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Demo transaction</span>
                <span className="font-bold text-navy">{result.txnId}</span>
              </div>
              <div className="mt-2 flex justify-between gap-4">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold text-navy">{formatPrice(course.price)}</span>
              </div>
            </div>
            <Button size="lg" asChild className="mt-7 h-12 w-full">
              <Link to="/dashboard">Open My Learning</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/40">
      <div className="border-b bg-background">
        <div className="container-page flex h-17 items-center justify-between">
          <BrandMark />
          <span className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <ShieldCheck className="size-4 text-success" /> Demo checkout
          </span>
        </div>
      </div>
      <main className="container-page py-8 sm:py-12">
        <Button variant="ghost" size="sm" asChild className="-ml-3">
          <Link to="/courses/$slug" params={{ slug: course.slug }}>
            <ArrowLeft /> Back to course
          </Link>
        </Button>
        <div className="mt-5 grid gap-7 lg:grid-cols-[1fr_390px]">
          <section className="rounded-2xl border bg-card p-6 shadow-card sm:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
              Step 1 of 1
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-navy">Confirm your enrollment</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This payment screen is simulated. It will not ask for or charge a real card.
            </p>

            <div className="mt-7 rounded-xl border bg-secondary/35 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Student
              </p>
              <p className="mt-1 font-extrabold text-navy">{user.name}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{user.email}</p>
            </div>

            <div className="mt-7">
              <Label className="text-base font-extrabold text-navy">Choose demo outcome</Label>
              <RadioGroup
                value={simulation}
                onValueChange={(value) => {
                  setSimulation(value as PaymentStatus);
                  setResult(null);
                }}
                className="mt-3 grid gap-3 sm:grid-cols-3"
              >
                {(
                  [
                    ["success", "Approved"],
                    ["pending", "Pending"],
                    ["failed", "Declined"],
                  ] as const
                ).map(([value, label]) => (
                  <Label
                    key={value}
                    htmlFor={`payment-${value}`}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border bg-card p-4 hover:bg-muted/40"
                  >
                    <RadioGroupItem id={`payment-${value}`} value={value} />
                    <span className="font-bold">{label}</span>
                  </Label>
                ))}
              </RadioGroup>
            </div>

            <Label
              htmlFor="access-agreement"
              className="mt-7 flex cursor-pointer items-start gap-3 rounded-xl border border-primary/20 bg-accent/55 p-4"
            >
              <Checkbox
                id="access-agreement"
                checked={agreed}
                onCheckedChange={(checked) => setAgreed(checked === true)}
                className="mt-0.5"
              />
              <span className="text-sm font-medium leading-6 text-accent-foreground">
                I understand that access closes for every student on{" "}
                <strong>{formatDate(course.accessCloseAt)}</strong>, regardless of purchase date.
              </span>
            </Label>

            {result && (
              <Alert
                variant={result.status === "failed" ? "destructive" : "default"}
                className="mt-5"
              >
                <TriangleAlert className="size-4" />
                <AlertTitle>
                  {result.status === "pending" ? "Payment pending" : "Payment declined"}
                </AlertTitle>
                <AlertDescription>{result.message}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={() => void pay()}
              disabled={!agreed || processing}
              size="lg"
              className="mt-7 h-12 w-full text-base"
            >
              {processing ? (
                <>
                  <LoaderCircle className="animate-spin" /> Processing demo payment…
                </>
              ) : (
                <>
                  <CreditCard /> Pay {formatPrice(course.price)}
                </>
              )}
            </Button>
          </section>

          <aside className="h-fit rounded-2xl border bg-card p-6 shadow-card lg:sticky lg:top-8">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Order summary
            </p>
            <div className="mt-4 flex gap-4">
              <img src={course.thumbnail} alt="" className="size-20 rounded-xl object-cover" />
              <div>
                <p className="font-extrabold leading-5 text-navy">{course.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{course.level}</p>
              </div>
            </div>
            <div className="mt-6 grid gap-3 border-y py-5 text-sm">
              <div className="flex items-center gap-3">
                <CalendarClock className="size-4 text-primary" />
                <div>
                  <p className="font-bold text-navy">Access closes</p>
                  <p className="text-muted-foreground">{formatDate(course.accessCloseAt)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock3 className="size-4 text-primary" />
                <div>
                  <p className="font-bold text-navy">Time remaining</p>
                  <p className="text-muted-foreground">
                    {Math.max(0, daysRemaining(course.accessCloseAt))} days
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Check className="size-4 text-success" />
                <div>
                  <p className="font-bold text-navy">Payment type</p>
                  <p className="text-muted-foreground">One time · no renewal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-5">
              <span className="font-bold text-muted-foreground">Total</span>
              <span className="text-2xl font-extrabold text-navy">{formatPrice(course.price)}</span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
