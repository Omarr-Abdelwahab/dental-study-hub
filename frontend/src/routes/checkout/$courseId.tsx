import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarClock,
  Check,
  Clock3,
  Copy,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { AppHeader, BrandMark } from "@/components/app-shell";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { brand } from "@/config/brand";
import { courseStatus, daysRemaining, formatDate, formatPrice } from "@/lib/format";
import { getCourse, isEnrolled } from "@/lib/selectors";
import { useStore } from "@/lib/use-store";

export const Route = createFileRoute("/checkout/$courseId")({ component: CheckoutPage });

function CheckoutPage() {
  const { courseId } = Route.useParams();
  const { state, user, requestPurchase } = useStore();
  const course = getCourse(state, courseId);
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (!course)
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
  if (courseStatus(course) !== "open")
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
  if (!user || user.role !== "student")
    return (
      <div className="min-h-screen bg-secondary/40">
        <AppHeader />
        <div className="container-page grid min-h-[calc(100vh-108px)] place-items-center py-12">
          <div className="w-full max-w-lg rounded-3xl border bg-card p-7 text-center shadow-lift sm:p-9">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
              <LockKeyhole />
            </span>
            <h1 className="mt-5 text-2xl font-extrabold text-navy">Sign in before checkout</h1>
            <p className="mt-2 leading-6 text-muted-foreground">
              Your request must be linked to your student account before the administrator can
              verify it.
            </p>
            <Button asChild className="mt-7 h-11 w-full">
              <Link to="/auth">Sign in or create an account</Link>
            </Button>
          </div>
        </div>
      </div>
    );

  if (isEnrolled(state, user.id, course.id)) {
    return (
      <div className="min-h-screen bg-secondary/40">
        <AppHeader />
        <div className="container-page grid min-h-[calc(100vh-108px)] place-items-center py-12">
          <div className="w-full max-w-lg rounded-3xl border bg-card p-8 text-center shadow-lift">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-success/12 text-success">
              <Check />
            </span>
            <h1 className="mt-5 text-2xl font-extrabold text-navy">You already have access</h1>
            <p className="mt-2 text-muted-foreground">This course is active in My Learning.</p>
            <Button asChild className="mt-7 w-full">
              <Link to="/dashboard">Open My Learning</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const existing = state.payments.find(
    (item) => item.userId === user.id && item.courseId === course.id && item.status === "pending",
  );
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!agreed || !brand.instaPayAddress) return;
    setProcessing(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const result = await requestPurchase({
      courseId: course.id,
      transferReference: String(data.get("reference")),
    });
    setProcessing(false);
    if (!result.ok) {
      setError(result.error ?? "Could not submit your request.");
      return;
    }
    setSubmitted(true);
    toast.success("Transfer submitted for administrator review.");
  };

  if (submitted || existing)
    return (
      <div className="min-h-screen bg-secondary/40">
        <AppHeader />
        <div className="container-page grid min-h-[calc(100vh-108px)] place-items-center py-12">
          <div className="w-full max-w-xl rounded-3xl border bg-card p-7 text-center shadow-lift sm:p-10">
            <span className="mx-auto grid size-16 place-items-center rounded-full bg-warning/12 text-warning">
              <Clock3 className="size-8" />
            </span>
            <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-warning">
              Verification pending
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-navy">We received your request.</h1>
            <p className="mt-3 leading-7 text-muted-foreground">
              An administrator will match your InstaPay transfer and activate{" "}
              <strong className="text-navy">{course.title}</strong>. It will appear in My Learning
              after approval.
            </p>
            <div className="mt-6 rounded-xl bg-muted p-4 text-left text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Transfer reference</span>
                <span className="font-bold text-navy">{existing?.txnId ?? "Submitted"}</span>
              </div>
              <div className="mt-2 flex justify-between gap-4">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold text-navy">{formatPrice(course.price)}</span>
              </div>
            </div>
            <Button asChild className="mt-7 h-12 w-full">
              <Link to="/dashboard">Return to My Learning</Link>
            </Button>
          </div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-secondary/40">
      <div className="border-b bg-background">
        <div className="container-page flex h-17 items-center justify-between">
          <BrandMark />
          <span className="inline-flex items-center gap-2 text-xs font-bold text-muted-foreground">
            <ShieldCheck className="size-4 text-success" /> Secure request
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
              InstaPay transfer
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-navy">Request course access</h1>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Transfer the exact amount below, then submit the transaction reference. Access remains
              locked until an administrator confirms the transfer.
            </p>
            {!brand.instaPayAddress && (
              <Alert variant="destructive" className="mt-6">
                <AlertTitle>InstaPay details unavailable</AlertTitle>
                <AlertDescription>
                  Please contact support. The site owner must configure the receiving InstaPay
                  address.
                </AlertDescription>
              </Alert>
            )}
            <div className="mt-7 rounded-2xl border-2 border-primary/20 bg-accent/45 p-5">
              <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                Send exactly
              </p>
              <p className="mt-1 text-3xl font-extrabold text-navy">{formatPrice(course.price)}</p>
              <div className="mt-5 flex items-center justify-between gap-4 rounded-xl bg-background p-4">
                <div>
                  <p className="text-xs font-bold text-muted-foreground">InstaPay number / IPA</p>
                  <p className="mt-1 break-all font-extrabold text-navy">
                    {brand.instaPayAddress || "Not configured"}
                  </p>
                </div>
                {brand.instaPayAddress && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(brand.instaPayAddress);
                        toast.success("InstaPay address copied.");
                      } catch {
                        toast.error(
                          "Could not copy automatically. Please copy the address manually.",
                        );
                      }
                    }}
                    aria-label="Copy InstaPay address"
                  >
                    <Copy />
                  </Button>
                )}
              </div>
            </div>
            <form onSubmit={submit} className="mt-7 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="reference">InstaPay transaction reference</Label>
                <Input
                  id="reference"
                  name="reference"
                  placeholder="Enter the reference shown in InstaPay"
                  minLength={4}
                  maxLength={100}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This lets the administrator match your transfer. Each reference can only be
                  submitted once on the website.
                </p>
              </div>
              <Label
                htmlFor="access-agreement"
                className="flex cursor-pointer items-start gap-3 rounded-xl border border-primary/20 bg-accent/55 p-4"
              >
                <Checkbox
                  id="access-agreement"
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked === true)}
                  className="mt-0.5"
                />
                <span className="text-sm font-medium leading-6 text-accent-foreground">
                  I sent the exact amount and understand that access closes for everyone on{" "}
                  <strong>{formatDate(course.accessCloseAt)}</strong>.
                </span>
              </Label>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full"
                disabled={!agreed || processing || !brand.instaPayAddress}
              >
                <Landmark /> {processing ? "Submitting…" : "Submit for verification"}
              </Button>
            </form>
          </section>
          <aside className="h-fit rounded-2xl border bg-card p-6 shadow-card">
            <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Order summary
            </p>
            <h2 className="mt-3 text-xl font-extrabold text-navy">{course.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {course.subject} · {course.level}
            </p>
            <div className="my-5 border-t" />
            <div className="flex items-center justify-between text-lg">
              <span className="font-bold text-navy">Total</span>
              <span className="text-2xl font-extrabold text-navy">{formatPrice(course.price)}</span>
            </div>
            <div className="mt-6 grid gap-3 text-sm text-muted-foreground">
              <span className="flex items-start gap-2">
                <CalendarClock className="mt-0.5 size-4 text-primary" /> Access closes{" "}
                {formatDate(course.accessCloseAt)}
              </span>
              <span className="flex items-start gap-2">
                <Clock3 className="mt-0.5 size-4 text-primary" />{" "}
                {daysRemaining(course.accessCloseAt)} days of course access remain
              </span>
              <span className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 text-success" /> One course, no recurring charge
              </span>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
