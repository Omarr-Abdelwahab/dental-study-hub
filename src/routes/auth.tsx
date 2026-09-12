import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  LockKeyhole,
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
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
  const { signIn, signUp, enterDemo } = useStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const goDemo = (role: "student" | "admin") => {
    enterDemo(role);
    void navigate({ to: role === "admin" ? "/admin" : "/dashboard" });
  };

  const submitSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const result = signIn(String(data.get("email")), String(data.get("password")));
    if (!result.ok) {
      setError(result.error ?? "Could not sign in.");
      return;
    }
    void navigate({ to: "/dashboard" });
  };

  const submitSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const data = new FormData(event.currentTarget);
    const result = signUp({
      name: String(data.get("name")),
      email: String(data.get("email")),
      password: String(data.get("password")),
      phone: String(data.get("phone")),
      university: String(data.get("university")),
      academicYear: String(data.get("academicYear")),
    });
    if (!result.ok) {
      setError(result.error ?? "Could not create the account.");
      return;
    }
    toast.success("Your demo account is ready.");
    void navigate({ to: "/dashboard" });
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
            Your courses, watched lessons, quiz attempts, bookmarks and streak are saved in one
            focused dashboard.
          </p>
          <div className="mt-10 grid gap-4">
            {[
              [BookOpen, "Resume videos from your last saved position"],
              [UserRoundCheck, "Track completion through mandatory quizzes"],
              [ShieldCheck, "See every course closing date before paying"],
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
        <p className="relative text-xs text-white/38">Interactive prototype · No real payment</p>
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
          <h2 className="text-3xl font-extrabold tracking-[-0.035em] text-navy">Welcome back</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Sign in normally or jump straight into either side of the demo.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11" onClick={() => goDemo("student")}>
              <GraduationCap /> Student demo
            </Button>
            <Button variant="outline" className="h-11" onClick={() => goDemo("admin")}>
              <ShieldCheck /> Admin demo
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or use an account{" "}
            <div className="h-px flex-1 bg-border" />
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="signin" onValueChange={() => setError("")}>
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
                    defaultValue="student@demo.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="signin-password">Password</Label>
                    <button
                      type="button"
                      onClick={() => toast.info("For the demo, use demo1234.")}
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <Input
                    id="signin-password"
                    name="password"
                    type="password"
                    defaultValue="demo1234"
                    required
                  />
                </div>
                <Button type="submit" className="h-11 w-full">
                  <LockKeyhole /> Sign in
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup" className="mt-5">
              <form onSubmit={submitSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full name</Label>
                  <Input id="signup-name" name="name" placeholder="Your full name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email address</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone</Label>
                    <Input id="signup-phone" name="phone" placeholder="+20..." required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-year">Academic year</Label>
                    <Input id="signup-year" name="academicYear" placeholder="3rd year" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-university">University</Label>
                  <Input
                    id="signup-university"
                    name="university"
                    placeholder="Your university"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    minLength={6}
                    required
                  />
                </div>
                <Button type="submit" className="h-11 w-full">
                  Create student account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
            This prototype stores demo data only in this browser.
          </p>
        </div>
      </section>
    </main>
  );
}
