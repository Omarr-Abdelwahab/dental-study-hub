import { Link, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  RotateCcw,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import type { ReactNode } from "react";

import { brand } from "@/config/brand";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function BrandMark({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5" aria-label={`${brand.name} home`}>
      <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <BookOpen className="size-4.5" strokeWidth={2.2} />
      </span>
      <span className={light ? "text-white" : "text-navy"}>
        <span className="block text-[15px] font-extrabold leading-none tracking-[-0.03em]">
          Dental Study
        </span>
        <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
          Hub
        </span>
      </span>
    </Link>
  );
}

function NavLinks({ mobile = false }: { mobile?: boolean }) {
  const cls = mobile
    ? "block rounded-lg px-3 py-2.5 text-base font-semibold text-navy hover:bg-accent"
    : "text-sm font-semibold text-muted-foreground transition-colors hover:text-navy";
  return (
    <>
      <Link to="/courses" className={cls} activeProps={{ className: `${cls} text-navy` }}>
        Courses
      </Link>
      <a href="/#how-it-works" className={cls}>
        How it works
      </a>
    </>
  );
}

export function AppHeader() {
  const { user, enterDemo, signOut, resetDemo } = useStore();
  const navigate = useNavigate();

  const enter = (role: "student" | "admin") => {
    enterDemo(role);
    void navigate({ to: role === "admin" ? "/admin" : "/dashboard" });
  };

  return (
    <>
      <div className="border-b border-white/10 bg-navy text-navy-foreground">
        <div className="container-page flex min-h-9 items-center justify-between gap-3 py-1.5 text-[11px] sm:text-xs">
          <p className="truncate text-white/72">
            Interactive prototype — no real payments are processed.
          </p>
          <div className="flex shrink-0 items-center gap-1">
            <button
              onClick={() => enter("student")}
              className="rounded-md px-2 py-1 font-bold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              Student demo
            </button>
            <span className="text-white/25">/</span>
            <button
              onClick={() => enter("admin")}
              className="rounded-md px-2 py-1 font-bold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              Admin demo
            </button>
          </div>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/94 backdrop-blur supports-[backdrop-filter]:bg-background/86">
        <div className="container-page flex h-17 items-center justify-between gap-4">
          <BrandMark />
          <nav className="hidden items-center gap-7 md:flex">
            <NavLinks />
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to={user.role === "admin" ? "/admin" : "/dashboard"}>
                    <LayoutDashboard />
                    {user.role === "admin" ? "Admin" : "My learning"}
                  </Link>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <span className="grid size-6 place-items-center rounded-full bg-accent text-xs font-extrabold text-accent-foreground">
                        {user.name.charAt(0)}
                      </span>
                      <span className="max-w-28 truncate">{user.name.split(" ")[0]}</span>
                      <ChevronDown className="size-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <span className="block truncate">{user.name}</span>
                      <span className="block truncate text-xs font-normal text-muted-foreground">
                        {user.email}
                      </span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">
                        <UserRound /> Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={resetDemo}>
                      <RotateCcw /> Reset demo data
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        signOut();
                        void navigate({ to: "/" });
                      }}
                    >
                      <LogOut /> Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/auth">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link to="/courses">Explore courses</Link>
                </Button>
              </>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm p-0">
              <SheetHeader className="border-b p-5 text-left">
                <SheetTitle>
                  <BrandMark />
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-1 p-4">
                <SheetClose asChild>
                  <div>
                    <NavLinks mobile />
                  </div>
                </SheetClose>
                <div className="my-3 border-t" />
                {user ? (
                  <>
                    <SheetClose asChild>
                      <Link
                        to={user.role === "admin" ? "/admin" : "/dashboard"}
                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 font-semibold text-navy hover:bg-accent"
                      >
                        <LayoutDashboard className="size-4" /> Dashboard
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 font-semibold text-navy hover:bg-accent"
                      >
                        <UserRound className="size-4" /> Profile
                      </Link>
                    </SheetClose>
                    <button
                      onClick={() => {
                        signOut();
                        void navigate({ to: "/" });
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left font-semibold text-destructive hover:bg-destructive/5"
                    >
                      <LogOut className="size-4" /> Sign out
                    </button>
                  </>
                ) : (
                  <div className="grid gap-2 pt-2">
                    <SheetClose asChild>
                      <Button variant="outline" asChild>
                        <Link to="/auth">Sign in</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button asChild>
                        <Link to="/courses">Explore courses</Link>
                      </Button>
                    </SheetClose>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
}

export function AppFooter() {
  return (
    <footer className="border-t bg-navy text-white">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="max-w-sm">
          <BrandMark light />
          <p className="mt-4 text-sm leading-6 text-white/65">
            Structured video lessons, focused slides and honest progress tracking for university
            dental students.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Platform</p>
          <div className="mt-4 grid gap-2.5 text-sm text-white/68">
            <Link to="/courses" className="hover:text-white">
              Browse courses
            </Link>
            <Link to="/auth" className="hover:text-white">
              Student sign in
            </Link>
            <a href="/#how-it-works" className="hover:text-white">
              How it works
            </a>
          </div>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Support</p>
          <div className="mt-4 grid gap-2.5 text-sm text-white/68">
            <a href={`mailto:${brand.supportEmail}`} className="hover:text-white">
              Contact support
            </a>
            <span>Privacy policy</span>
            <span>Terms of use</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 {brand.name}. Demo experience.</span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" /> Supplementary learning, not accredited education.
          </span>
        </div>
      </div>
    </footer>
  );
}

export function PublicPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">{eyebrow}</p>
      )}
      <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.035em] text-navy sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-7 text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
