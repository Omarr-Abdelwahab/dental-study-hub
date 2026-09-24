import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PublicPage } from "@/components/app-shell";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useStore } from "@/lib/use-store";

export const Route = createFileRoute("/reset-password")({ component: ResetPasswordPage });
function ResetPasswordPage() {
  const { updatePassword, backendReady } = useStore();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const password = String(data.get("password"));
    if (password !== String(data.get("confirm"))) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    setError("");
    const result = await updatePassword(password);
    setBusy(false);
    if (!result.ok) {
      setError(result.error ?? "Could not update the password. Request a new reset link.");
      return;
    }
    toast.success("Password updated. You can now continue securely.");
    void navigate({ to: "/dashboard" });
  };
  return (
    <PublicPage>
      <section className="container-page grid min-h-[65vh] place-items-center py-16">
        <div className="w-full max-w-md rounded-3xl border bg-card p-7 shadow-lift sm:p-9">
          <span className="grid size-12 place-items-center rounded-xl bg-accent text-primary">
            <KeyRound />
          </span>
          <h1 className="mt-5 text-3xl font-extrabold text-navy">Choose a new password</h1>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Use at least eight characters and avoid a password you use elsewhere.
          </p>
          {error && (
            <Alert variant="destructive" className="mt-5">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                name="password"
                type="password"
                minLength={8}
                autoComplete="new-password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                name="confirm"
                type="password"
                minLength={8}
                autoComplete="new-password"
                required
              />
            </div>
            <Button className="h-11 w-full" disabled={busy || !backendReady}>
              {busy ? "Updating…" : "Update password"}
            </Button>
          </form>
          <Button variant="link" asChild className="mt-3 w-full">
            <Link to="/auth">Back to sign in</Link>
          </Button>
        </div>
      </section>
    </PublicPage>
  );
}
