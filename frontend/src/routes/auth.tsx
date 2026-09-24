import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  LockKeyhole,
  MailCheck,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { BrandMark } from "@/components/app-shell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStore } from "@/lib/use-store";

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
  const { signIn, signUp, sendPasswordReset, backendReady } = useStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [forgot, setForgot] = useState(false);

  const submitSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    const data = new FormData(event.currentTarget);
    const result = await signIn(String(data.get("email")), String(data.get("password")));
    setBusy(false);
    if (!result.ok) {
      setError(result.error ?? "Could not sign in.");
      return;
    }
    void navigate({ to: "/dashboard" });
  };

  const submitSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password"));
    if (password !== String(data.get("confirmPassword"))) {
      setBusy(false);
      setError("Passwords do not match.");
      return;
    }
    const result = await signUp({
      name: String(data.get("name")),
      email: String(data.get("email")),
      password,
      phone: String(data.get("phone")),
      university: String(data.get("university")),
      academicYear: String(data.get("academicYear")),
    });
    setBusy(false);
    if (!result.ok) {
      setError(result.error ?? "Could not create the account.");
      return;
    }
    if (result.requiresVerification) {
      toast.success("Check your email to verify your account, then sign in.");
      return;
    }
    toast.success("Your account is ready.");
    void navigate({ to: "/dashboard" });
  };

  const submitReset = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    const data = new FormData(event.currentTarget);
    const result = await sendPasswordReset(String(data.get("email")));
    setBusy(false);
    if (!result.ok) {
      setError(result.error ?? "Could not send the reset email.");
      return;
    }
    toast.success("If that address has an account, a reset link is on its way.");
    setForgot(false);
  };

  return (
    <main className="grid min-h-screen bg-background lg:grid-cols-[.92fr_1.08fr]">
      <section className="relative hidden overflow-hidden bg-navy p-12 text-white lg:flex lg:flex-col">
        <div className="absolute -left-32 bottom-10 size-96 rounded-full bg-primary/14 blur-3xl" />
        <BrandMark light />
        <div className="relative my-auto max-w-xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
            Your learning stays organized
          </p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[1.08] tracking-[-0.045em]">
            Pick up exactly where you stopped.
          </h1>
          <p className="mt-5 text-lg leading-8 text-white/68">
            Your courses, watched lessons, quiz attempts, bookmarks and streak are securely saved in
            one focused dashboard.
          </p>
          <div className="mt-10 grid gap-4">
            {[
              [BookOpen, "Resume videos from your last saved position"],
              [UserRoundCheck, "Track completion through mandatory quizzes"],
              [ShieldCheck, "Protected accounts and admin-reviewed enrollment"],
            ].map(([Icon, text]) => {
              const FeatureIcon = Icon as typeof BookOpen;
              return (
                <div
                  key={String(text)}
                  className="flex items-center gap-3 text-sm font-semibold text-white/82"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-white/8 text-primary">
                    <FeatureIcon className="size-4" />
                  </span>
                  {String(text)}
                </div>
              );
            })}
          </div>
        </div>
        <p className="relative text-xs text-white/38">
          Secure learning accounts · Manual InstaPay verification
        </p>
      </section>

      <section className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <BrandMark />
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft /> Home
              </Link>
            </Button>
          </div>
          <div className="mb-7 hidden lg:block">
            <Button variant="ghost" size="sm" asChild className="-ml-3">
              <Link to="/">
                <ArrowLeft /> Back to home
              </Link>
            </Button>
          </div>
          <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-navy">
            {forgot ? "Reset your password" : "Welcome back"}
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {forgot
              ? "Enter your email and we will send a secure password reset link."
              : "Sign in to continue learning or create your student account."}
          </p>

          {!backendReady && (
            <Alert variant="destructive" className="mt-5">
              <AlertDescription>
                Student registration is temporarily unavailable because the secure account database
                is not connected. Once connected, anyone can create and use an account without
                administrator approval.
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive" className="mt-5">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {forgot ? (
            <form onSubmit={submitReset} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reset-email">Email address</Label>
                <Input id="reset-email" name="email" type="email" autoComplete="email" required />
              </div>
              <Button type="submit" className="h-11 w-full" disabled={busy || !backendReady}>
                <MailCheck /> {busy ? "Sending…" : "Send reset link"}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setForgot(false);
                  setError("");
                }}
              >
                Back to sign in
              </Button>
            </form>
          ) : (
            <Tabs defaultValue="signin" onValueChange={() => setError("")} className="mt-6">
              <TabsList className="grid h-11 w-full grid-cols-2">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Create account</TabsTrigger>
              </TabsList>
              <TabsContent value="signin" className="mt-5">
                <form onSubmit={submitSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email address</Label>
                    <Input
                      id="signin-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="signin-password">Password</Label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgot(true);
                          setError("");
                        }}
                        className="text-xs font-bold text-primary hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <Input
                      id="signin-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                    />
                  </div>
                  <Button type="submit" className="h-11 w-full" disabled={busy || !backendReady}>
                    <LockKeyhole /> {busy ? "Signing in…" : "Sign in"}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup" className="mt-5">
                <form onSubmit={submitSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full name</Label>
                    <Input
                      id="signup-name"
                      name="name"
                      autoComplete="name"
                      minLength={2}
                      maxLength={120}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email address</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="signup-phone">Phone</Label>
                      <Input
                        id="signup-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        maxLength={40}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-year">Academic year</Label>
                      <Input id="signup-year" name="academicYear" maxLength={80} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-university">University</Label>
                    <Input id="signup-university" name="university" maxLength={160} required />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        name="password"
                        type="password"
                        minLength={8}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm">Confirm</Label>
                      <Input
                        id="signup-confirm"
                        name="confirmPassword"
                        type="password"
                        minLength={8}
                        autoComplete="new-password"
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="h-11 w-full" disabled={busy || !backendReady}>
                    {busy ? "Creating account…" : "Create student account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}
          <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
            By creating an account, you agree to the Terms of Use and Privacy Policy.
          </p>
        </div>
      </section>
    </main>
  );
}
