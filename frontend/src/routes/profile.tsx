import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Mail, Phone, School, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { PublicPage } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/use-store";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const { user, updateProfile, sendPasswordReset } = useStore();
  const [key, setKey] = useState(0);
  const [saving, setSaving] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  useEffect(() => setKey((value) => value + 1), [user?.id]);

  if (!user) {
    return (
      <PublicPage>
        <div className="container-page py-24 text-center">
          <UserRound className="mx-auto size-9 text-muted-foreground" />
          <h1 className="mt-4 text-3xl font-extrabold text-navy">Sign in to view your profile</h1>
          <Button asChild className="mt-6">
            <Link to="/auth">Go to sign in</Link>
          </Button>
        </div>
      </PublicPage>
    );
  }

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSaving(true);
    try {
      const result = await updateProfile({
        name: String(data.get("name")),
        phone: String(data.get("phone")),
        university: String(data.get("university")),
        academicYear: String(data.get("academicYear")),
      });
      if (result.ok) toast.success("Profile updated.");
      else toast.error(result.error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <PublicPage>
      <section className="border-b bg-secondary/45 py-12">
        <div className="container-page">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">Account</p>
          <h1 className="mt-2 text-3xl font-extrabold text-navy sm:text-4xl">Profile settings</h1>
        </div>
      </section>
      <section className="py-12">
        <div className="container-page grid gap-7 lg:grid-cols-[320px_1fr]">
          <aside className="h-fit rounded-2xl border bg-card p-6 shadow-card">
            <span className="grid size-16 place-items-center rounded-2xl bg-accent text-2xl font-extrabold text-accent-foreground">
              {user.name.charAt(0)}
            </span>
            <h2 className="mt-4 text-xl font-extrabold text-navy">{user.name}</h2>
            <Badge className="mt-2 capitalize">{user.role}</Badge>
            <div className="mt-6 grid gap-3 border-t pt-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail className="size-4 text-primary" /> {user.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="size-4 text-primary" /> {user.phone}
              </span>
              <span className="flex items-center gap-2">
                <School className="size-4 text-primary" /> {user.university}
              </span>
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4 text-primary" /> Joined {formatDate(user.createdAt)}
              </span>
            </div>
          </aside>
          <div className="rounded-2xl border bg-card p-6 shadow-card sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-navy">Personal information</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Used across your learning dashboard.
                </p>
              </div>
            </div>
            <form key={key} onSubmit={save} className="mt-7 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Full name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={user.name}
                  minLength={2}
                  maxLength={120}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" defaultValue={user.phone} maxLength={40} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="university">University</Label>
                <Input
                  id="university"
                  name="university"
                  defaultValue={user.university}
                  maxLength={160}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="academicYear">Academic year</Label>
                <Input
                  id="academicYear"
                  name="academicYear"
                  defaultValue={user.academicYear}
                  maxLength={80}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving…" : "Save changes"}
                </Button>
              </div>
            </form>
            <div className="mt-8 flex gap-3 rounded-xl border border-primary/20 bg-accent/60 p-4">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
              <p className="text-sm leading-6 text-accent-foreground">
                Your account uses secure authentication. Password recovery is handled through a
                verified email link, and passwords are never stored in the browser.
              </p>
            </div>
            <div className="mt-5 flex flex-col items-start justify-between gap-3 rounded-xl border p-4 sm:flex-row sm:items-center">
              <div>
                <p className="font-bold text-navy">Change your password</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We will email a secure, single-use recovery link to {user.email}.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                disabled={sendingReset}
                onClick={async () => {
                  setSendingReset(true);
                  try {
                    const result = await sendPasswordReset(user.email);
                    if (result.ok) toast.success("Password reset email sent.");
                    else toast.error(result.error);
                  } finally {
                    setSendingReset(false);
                  }
                }}
              >
                {sendingReset ? "Sending…" : "Email reset link"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
