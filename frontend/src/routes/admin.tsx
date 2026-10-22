import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  CircleAlert,
  CircleDollarSign,
  CreditCard,
  Eye,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Megaphone,
  Menu,
  Pencil,
  Plus,
  Search,
  Send,
  Settings2,
  ShieldCheck,
  TrendingUp,
  Trash2,
  UserRoundCheck,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";

import { BrandMark, FullPageLoading } from "@/components/app-shell";
import { CourseStatusBadge } from "@/components/course-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { courseLessons, courseStats, formatDate, formatDateTime, formatPrice } from "@/lib/format";
import {
  courseEnrollmentCount,
  courseProgressPercent,
  courseRevenue,
  isEnrolled,
} from "@/lib/selectors";
import { createId } from "@/lib/id";
import type { ActionResult } from "@/lib/store-context";
import { useStore } from "@/lib/use-store";
import type {
  Course,
  Lesson,
  Payment,
  PaymentStatus,
  PublishState,
  QuizQuestion,
  Section,
  User,
} from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({ component: AdminPage });

type AdminTab = "overview" | "courses" | "students" | "payments" | "announcements";
type CourseFilter = "all" | PublishState;
type PaymentFilter = "all" | PaymentStatus;

const navigation: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "students", label: "Students", icon: Users },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "announcements", label: "Announcements", icon: Megaphone },
];

function AdminPage() {
  const { user, hydrated } = useStore();

  if (!hydrated) return <FullPageLoading label="Checking administrator access…" />;
  if (user?.role === "student") return <Navigate to="/dashboard" replace />;

  if (!user) {
    return (
      <div className="grid min-h-screen place-items-center bg-secondary/35 px-4">
        <div className="w-full max-w-lg rounded-3xl border bg-card p-8 text-center shadow-lift">
          <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-accent text-accent-foreground">
            <ShieldCheck className="size-7" />
          </span>
          <h1 className="mt-5 text-3xl font-extrabold text-navy">Administrator access required</h1>
          <p className="mt-3 leading-7 text-muted-foreground">
            Sign in with an administrator account to manage courses, students, access, payments and
            announcements.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link to="/auth">Sign in</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/">Return home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <AdminWorkspace user={user} />;
}

function AdminWorkspace({ user }: { user: User }) {
  const {
    state,
    signOut,
    reviewPayment,
    saveCourse,
    setPublishState,
    grantAccess,
    revokeAccess,
    publishAnnouncement,
    deleteAnnouncement,
  } = useStore();
  const [tab, setTab] = useState<AdminTab>("overview");
  const [courseEditor, setCourseEditor] = useState<Course | null>(null);
  const [managedStudent, setManagedStudent] = useState<User | null>(null);
  const [approvedPaymentId, setApprovedPaymentId] = useState<string | null>(null);
  const [rejectedPaymentId, setRejectedPaymentId] = useState<string | null>(null);
  const [courseQuery, setCourseQuery] = useState("");
  const [studentQuery, setStudentQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<CourseFilter>("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentFilter>("all");
  const [reviewingPaymentId, setReviewingPaymentId] = useState<string | null>(null);
  const [updatingCourseId, setUpdatingCourseId] = useState<string | null>(null);
  const pendingPaymentCount = state.payments.filter(
    (payment) => payment.status === "pending",
  ).length;
  const activeTabLabel = navigation.find((item) => item.id === tab)?.label ?? "Overview";

  const { students, totalRevenue, activeEnrollmentCount, avgProgress, avgQuiz } = useMemo(() => {
    const studentUsers = state.users.filter((item) => item.role === "student");
    const revenue = state.payments.reduce(
      (sum, payment) => sum + (payment.status === "success" ? payment.amount : 0),
      0,
    );
    const activeEnrollments = state.enrollments.filter((enrollment) => !enrollment.revoked);
    const coursesById = new Map(state.courses.map((course) => [course.id, course]));
    const progressValues = activeEnrollments.flatMap((enrollment) => {
      const course = coursesById.get(enrollment.courseId);
      return course ? [courseProgressPercent(state, enrollment.userId, course)] : [];
    });
    const quizScoreTotal = state.attempts.reduce((sum, attempt) => sum + attempt.score, 0);
    return {
      students: studentUsers,
      totalRevenue: revenue,
      activeEnrollmentCount: activeEnrollments.length,
      avgProgress: progressValues.length
        ? Math.round(progressValues.reduce((sum, value) => sum + value, 0) / progressValues.length)
        : 0,
      avgQuiz: state.attempts.length ? Math.round(quizScoreTotal / state.attempts.length) : 0,
    };
  }, [state]);

  const filteredCourses = useMemo(() => {
    const query = courseQuery.trim().toLowerCase();
    return state.courses.filter(
      (course) =>
        (courseFilter === "all" || course.publishState === courseFilter) &&
        (!query || `${course.title} ${course.subject}`.toLowerCase().includes(query)),
    );
  }, [courseFilter, courseQuery, state.courses]);

  const filteredStudents = useMemo(() => {
    const query = studentQuery.trim().toLowerCase();
    if (!query) return students;
    return students.filter((student) =>
      `${student.name} ${student.email} ${student.university}`.toLowerCase().includes(query),
    );
  }, [studentQuery, students]);

  const filteredPayments = useMemo(
    () =>
      [...state.payments]
        .filter((payment) => paymentFilter === "all" || payment.status === paymentFilter)
        .sort((a, b) => {
          if (a.status === "pending" && b.status !== "pending") return -1;
          if (a.status !== "pending" && b.status === "pending") return 1;
          return b.createdAt.localeCompare(a.createdAt);
        }),
    [paymentFilter, state.payments],
  );

  const createCourse = () => {
    const template = state.courses[0];
    if (!template) return;
    const id = createId("course");
    const draft: Course = {
      ...structuredClone(template),
      id,
      slug: `untitled-course-${id.slice(-5)}`,
      title: "Untitled Dental Course",
      subject: "New subject",
      summary: "Add a clear one-sentence course summary.",
      description: "Add the full course description.",
      outcomes: ["Add the first learning outcome"],
      publishState: "draft",
      sections: [],
    };
    setCourseEditor(draft);
  };

  const sidebar = (
    <div className="flex h-full flex-col bg-navy text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <BrandMark light />
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-300 opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-teal-300" />
          </span>
          <span className="text-[11px] font-bold text-white/70">Live administration workspace</span>
        </div>
      </div>
      <div className="px-4 pt-5">
        <p className="px-3 text-[10px] font-extrabold uppercase tracking-[0.18em] text-white/35">
          Administration
        </p>
        <nav className="mt-3 grid gap-1">
          {navigation.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              aria-current={tab === id ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition",
                tab === id
                  ? "bg-primary text-primary-foreground"
                  : "text-white/65 hover:bg-white/7 hover:text-white",
              )}
            >
              <Icon className="size-4" />
              <span className="flex-1">{label}</span>
              {id === "payments" && pendingPaymentCount > 0 && (
                <span
                  className={cn(
                    "grid min-w-5 place-items-center rounded-full px-1.5 py-0.5 text-[10px] font-extrabold",
                    tab === id ? "bg-white/20 text-white" : "bg-primary text-primary-foreground",
                  )}
                  aria-label={`${pendingPaymentCount} pending payments`}
                >
                  {pendingPaymentCount}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t border-white/10 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3">
          <span className="grid size-9 place-items-center rounded-lg bg-primary font-extrabold text-primary-foreground">
            {user.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{user.name}</p>
            <p className="truncate text-[11px] text-white/45">Administrator</p>
          </div>
        </div>
        <button
          onClick={async () => {
            const result = await signOut();
            if (!result.ok) toast.error(result.error);
          }}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-white/55 hover:bg-white/7 hover:text-white"
        >
          <LogOut className="size-4" /> Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,var(--secondary),var(--background)_28rem)] lg:grid lg:grid-cols-[268px_1fr]">
      <aside className="hidden lg:block">
        <div className="fixed inset-y-0 w-[268px]">{sidebar}</div>
      </aside>
      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b bg-background/94 backdrop-blur">
          <div className="flex h-[72px] items-center justify-between gap-4 px-4 sm:px-7 lg:px-8">
            <div className="flex items-center gap-3">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] p-0">
                  <SheetHeader className="sr-only">
                    <SheetTitle>Admin navigation</SheetTitle>
                  </SheetHeader>
                  {sidebar}
                </SheetContent>
              </Sheet>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
                  Admin workspace
                </p>
                <h1 className="font-extrabold text-navy">{activeTabLabel}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {pendingPaymentCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTab("payments")}
                  className="hidden border-amber-200 bg-amber-50 text-amber-900 hover:bg-amber-100 sm:inline-flex"
                >
                  <CircleAlert /> {pendingPaymentCount} awaiting review
                </Button>
              )}
              <Button variant="outline" size="sm" asChild>
                <Link to="/">
                  <Eye /> <span className="hidden sm:inline">View site</span>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-7 lg:p-8">
          {tab === "overview" && (
            <Overview
              state={state}
              totalRevenue={totalRevenue}
              activeEnrollmentCount={activeEnrollmentCount}
              students={students}
              avgProgress={avgProgress}
              avgQuiz={avgQuiz}
              adminName={user.name}
              onNavigate={setTab}
              onCreateCourse={createCourse}
            />
          )}

          {tab === "courses" && (
            <section>
              <PageHeading
                eyebrow="Content"
                title="Courses"
                description="Edit course information, access dates and lesson settings."
                action={
                  <Button onClick={createCourse}>
                    <Plus /> Create course
                  </Button>
                }
              />
              <div className="mt-7 overflow-hidden rounded-2xl border bg-card shadow-card">
                <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
                  <label className="relative block max-w-sm">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={courseQuery}
                      onChange={(event) => setCourseQuery(event.target.value)}
                      placeholder="Search courses"
                      className="pl-9"
                    />
                  </label>
                  <div className="flex flex-wrap gap-2" aria-label="Filter courses">
                    {(["all", "published", "draft", "archived"] as const).map((filter) => {
                      const count =
                        filter === "all"
                          ? state.courses.length
                          : state.courses.filter((course) => course.publishState === filter).length;
                      return (
                        <FilterPill
                          key={filter}
                          active={courseFilter === filter}
                          onClick={() => setCourseFilter(filter)}
                        >
                          <span className="capitalize">{filter}</span>
                          <span className="opacity-60">{count}</span>
                        </FilterPill>
                      );
                    })}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Access closes</TableHead>
                        <TableHead>Revenue</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCourses.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                            {courseQuery.trim()
                              ? "No courses match your search."
                              : courseFilter !== "all"
                                ? `No ${courseFilter} courses.`
                                : "No courses yet. Create the first course to get started."}
                          </TableCell>
                        </TableRow>
                      )}
                      {filteredCourses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell>
                            <div className="flex min-w-64 items-center gap-3">
                              <img
                                src={course.thumbnail}
                                alt=""
                                className="size-12 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-extrabold text-navy">{course.title}</p>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  {course.subject} · {courseStats(course).lessons} lessons
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col items-start gap-1.5">
                              <CourseStatusBadge course={course} />
                              <Badge variant="outline" className="capitalize">
                                {course.publishState}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="font-bold">{formatPrice(course.price)}</TableCell>
                          <TableCell>{courseEnrollmentCount(state, course.id)}</TableCell>
                          <TableCell className="whitespace-nowrap">
                            {formatDate(course.accessCloseAt)}
                          </TableCell>
                          <TableCell className="font-bold">
                            {formatPrice(courseRevenue(state, course.id))}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCourseEditor(structuredClone(course))}
                              >
                                <Pencil /> Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                disabled={updatingCourseId === course.id}
                                onClick={async () => {
                                  const next: PublishState =
                                    course.publishState === "published" ? "draft" : "published";
                                  setUpdatingCourseId(course.id);
                                  try {
                                    const result = await setPublishState(course.id, next);
                                    if (result.ok) toast.success(`Course set to ${next}.`);
                                    else toast.error(result.error);
                                  } finally {
                                    setUpdatingCourseId(null);
                                  }
                                }}
                              >
                                {updatingCourseId === course.id
                                  ? "Updating…"
                                  : course.publishState === "published"
                                    ? "Unpublish"
                                    : "Publish"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </section>
          )}

          {tab === "students" && (
            <section>
              <PageHeading
                eyebrow="Learners"
                title="Students"
                description="Review enrollment, activity and progress, then manage course access."
              />
              <div className="mt-7 overflow-hidden rounded-2xl border bg-card shadow-card">
                <div className="border-b p-4">
                  <label className="relative block max-w-sm">
                    <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      value={studentQuery}
                      onChange={(event) => setStudentQuery(event.target.value)}
                      placeholder="Search name, email or university"
                      className="pl-9"
                    />
                  </label>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>University</TableHead>
                        <TableHead>Courses</TableHead>
                        <TableHead>Average progress</TableHead>
                        <TableHead>Last activity</TableHead>
                        <TableHead className="text-right">Access</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                            {studentQuery.trim()
                              ? "No students match your search."
                              : "Student accounts will appear here after signup."}
                          </TableCell>
                        </TableRow>
                      )}
                      {filteredStudents.map((student) => {
                        const enrollments = state.enrollments.filter(
                          (item) => item.userId === student.id && !item.revoked,
                        );
                        const values = enrollments.flatMap((item) => {
                          const course = state.courses.find((entry) => entry.id === item.courseId);
                          return course ? [courseProgressPercent(state, student.id, course)] : [];
                        });
                        const average = values.length
                          ? Math.round(
                              values.reduce((sum, value) => sum + value, 0) / values.length,
                            )
                          : 0;
                        const recent = [...state.progress]
                          .filter((item) => item.userId === student.id)
                          .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
                        return (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div className="flex min-w-52 items-center gap-3">
                                <span className="grid size-10 place-items-center rounded-xl bg-accent font-extrabold text-accent-foreground">
                                  {student.name.charAt(0)}
                                </span>
                                <div>
                                  <p className="font-extrabold text-navy">{student.name}</p>
                                  <p className="text-xs text-muted-foreground">{student.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="font-semibold">{student.university}</p>
                              <p className="text-xs text-muted-foreground">
                                {student.academicYear}
                              </p>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{enrollments.length} active</Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex min-w-32 items-center gap-3">
                                <Progress value={average} className="h-1.5" />
                                <span className="text-xs font-bold">{average}%</span>
                              </div>
                            </TableCell>
                            <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                              {recent ? formatDateTime(recent.updatedAt) : "No activity"}
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setManagedStudent(student)}
                              >
                                <Settings2 /> Manage
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </section>
          )}

          {tab === "payments" && (
            <section>
              <PageHeading
                eyebrow="Transactions"
                title="InstaPay requests"
                description="Verify each transfer before granting course access. Approval is atomic and cannot be repeated."
              />
              <div className="mt-7 overflow-hidden rounded-2xl border bg-card shadow-card">
                <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-extrabold text-navy">Transfer queue</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Pending requests are shown first.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2" aria-label="Filter payments">
                    {(["all", "pending", "success", "failed"] as const).map((filter) => {
                      const count =
                        filter === "all"
                          ? state.payments.length
                          : state.payments.filter((payment) => payment.status === filter).length;
                      const label =
                        filter === "success"
                          ? "Approved"
                          : filter === "failed"
                            ? "Rejected"
                            : filter;
                      return (
                        <FilterPill
                          key={filter}
                          active={paymentFilter === filter}
                          onClick={() => setPaymentFilter(filter)}
                        >
                          <span className="capitalize">{label}</span>
                          <span className="opacity-60">{count}</span>
                        </FilterPill>
                      );
                    })}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Review</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="h-32 text-center text-muted-foreground">
                            {state.payments.length === 0
                              ? "Payment requests will appear here when students submit transfers."
                              : "No payments match this filter."}
                          </TableCell>
                        </TableRow>
                      )}
                      {filteredPayments.map((payment) => {
                        const student = state.users.find((item) => item.id === payment.userId);
                        const course = state.courses.find((item) => item.id === payment.courseId);
                        return (
                          <TableRow key={payment.id}>
                            <TableCell className="font-mono text-xs font-bold">
                              {payment.txnId}
                            </TableCell>
                            <TableCell>
                              <p className="font-bold text-navy">{student?.name ?? "Unknown"}</p>
                              <p className="text-xs text-muted-foreground">{student?.email}</p>
                            </TableCell>
                            <TableCell className="min-w-48 font-semibold">
                              {course?.title ?? "Unknown course"}
                            </TableCell>
                            <TableCell className="font-extrabold">
                              {formatPrice(payment.amount)}
                            </TableCell>
                            <TableCell>{payment.method}</TableCell>
                            <TableCell className="whitespace-nowrap">
                              {formatDateTime(payment.createdAt)}
                            </TableCell>
                            <TableCell>
                              <PaymentBadge status={payment.status} />
                              {payment.status === "failed" && payment.rejectionReason && (
                                <p className="mt-1 max-w-52 text-xs leading-5 text-destructive">
                                  {payment.rejectionReason}
                                </p>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {payment.status === "pending" ? (
                                <div className="flex justify-end gap-2">
                                  <Button
                                    size="sm"
                                    disabled={reviewingPaymentId === payment.id}
                                    onClick={() => setApprovedPaymentId(payment.id)}
                                  >
                                    <Check />
                                    {reviewingPaymentId === payment.id ? "Approving…" : "Approve"}
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={reviewingPaymentId === payment.id}
                                    onClick={() => setRejectedPaymentId(payment.id)}
                                  >
                                    <X /> Reject
                                  </Button>
                                </div>
                              ) : (
                                <div className="text-xs text-muted-foreground">
                                  <p>
                                    {payment.reviewedAt
                                      ? formatDateTime(payment.reviewedAt)
                                      : "Reviewed"}
                                  </p>
                                  {payment.reviewedBy && (
                                    <p>
                                      by{" "}
                                      {state.users.find((item) => item.id === payment.reviewedBy)
                                        ?.name ?? "administrator"}
                                    </p>
                                  )}
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </section>
          )}

          {tab === "announcements" && (
            <Announcements
              courses={state.courses}
              announcements={state.announcements}
              onPublish={publishAnnouncement}
              onDelete={deleteAnnouncement}
            />
          )}
        </main>
      </div>

      <CourseEditor
        course={courseEditor}
        onClose={() => setCourseEditor(null)}
        onSave={async (course) => {
          const result = await saveCourse(course);
          if (result.ok) {
            setCourseEditor(null);
            toast.success("Course saved.");
          } else toast.error(result.error);
        }}
      />
      <AccessManager
        student={managedStudent}
        courses={state.courses}
        isEnrolled={(courseId) => isEnrolled(state, managedStudent?.id ?? null, courseId)}
        onClose={() => setManagedStudent(null)}
        onGrant={async (studentId, courseId) => {
          const result = await grantAccess(studentId, courseId);
          if (result.ok) toast.success("Course access granted.");
          else toast.error(result.error);
        }}
        onRevoke={async (studentId, courseId) => {
          const result = await revokeAccess(studentId, courseId);
          if (result.ok) toast.success("Course access revoked.");
          else toast.error(result.error);
        }}
      />
      <RejectPaymentDialog
        paymentId={rejectedPaymentId}
        onClose={() => setRejectedPaymentId(null)}
        onConfirm={async (paymentId, reason) => {
          const result = await reviewPayment(paymentId, false, reason);
          if (result.ok) {
            setRejectedPaymentId(null);
            toast.success("Transfer request rejected.");
          } else toast.error(result.error);
          return result;
        }}
      />
      <ApprovePaymentDialog
        payment={state.payments.find((payment) => payment.id === approvedPaymentId) ?? null}
        student={state.users.find(
          (student) =>
            student.id ===
            state.payments.find((payment) => payment.id === approvedPaymentId)?.userId,
        )}
        course={state.courses.find(
          (course) =>
            course.id ===
            state.payments.find((payment) => payment.id === approvedPaymentId)?.courseId,
        )}
        submitting={reviewingPaymentId === approvedPaymentId}
        onClose={() => setApprovedPaymentId(null)}
        onConfirm={async () => {
          if (!approvedPaymentId) return;
          setReviewingPaymentId(approvedPaymentId);
          try {
            const result = await reviewPayment(approvedPaymentId, true);
            if (result.ok) {
              setApprovedPaymentId(null);
              toast.success("Transfer approved and access activated.");
            } else toast.error(result.error);
          } finally {
            setReviewingPaymentId(null);
          }
        }}
      />
    </div>
  );
}

function Overview({
  state,
  totalRevenue,
  activeEnrollmentCount,
  students,
  avgProgress,
  avgQuiz,
  adminName,
  onNavigate,
  onCreateCourse,
}: {
  state: ReturnType<typeof useStore>["state"];
  totalRevenue: number;
  activeEnrollmentCount: number;
  students: User[];
  avgProgress: number;
  avgQuiz: number;
  adminName: string;
  onNavigate: (tab: AdminTab) => void;
  onCreateCourse: () => void;
}) {
  const pendingPayments = state.payments.filter((payment) => payment.status === "pending");
  const draftCourses = state.courses.filter((course) => course.publishState === "draft");
  const publishedCourses = state.courses.filter((course) => course.publishState === "published");
  const firstName = adminName.trim().split(/\s+/)[0] || "Admin";
  const metrics = [
    {
      label: "Total revenue",
      value: formatPrice(totalRevenue),
      note: `${state.payments.filter((payment) => payment.status === "success").length} approved transfers`,
      icon: CircleDollarSign,
      tone: "bg-success/10 text-success",
    },
    {
      label: "Students",
      value: String(students.length),
      note: `${activeEnrollmentCount} active enrollments`,
      icon: Users,
      tone: "bg-accent text-accent-foreground",
    },
    {
      label: "Published courses",
      value: String(publishedCourses.length),
      note: `${draftCourses.length} drafts need review`,
      icon: BookOpen,
      tone: "bg-blue-50 text-blue-700",
    },
    {
      label: "Learning health",
      value: `${avgProgress}%`,
      note: `${avgQuiz}% average quiz score`,
      icon: TrendingUp,
      tone: "bg-orange-50 text-orange-700",
    },
  ];
  return (
    <section>
      <PageHeading
        eyebrow="Dashboard"
        title={`Welcome back, ${firstName}.`}
        description="Here is what needs your attention and how the academy is performing."
        action={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => onNavigate("announcements")}>
              <Megaphone /> New announcement
            </Button>
            <Button onClick={onCreateCourse}>
              <Plus /> Create course
            </Button>
          </div>
        }
      />
      {(pendingPayments.length > 0 || draftCourses.length > 0) && (
        <div className="mt-7 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-card p-5 shadow-card">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-800">
                <CircleAlert className="size-5" />
              </span>
              <div>
                <p className="font-extrabold text-navy">Action center</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Clear these items first to keep student access and the catalog up to date.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {pendingPayments.length > 0 && (
                <Button size="sm" onClick={() => onNavigate("payments")}>
                  Review {pendingPayments.length} payment{pendingPayments.length === 1 ? "" : "s"}
                  <ArrowUpRight />
                </Button>
              )}
              {draftCourses.length > 0 && (
                <Button size="sm" variant="outline" onClick={() => onNavigate("courses")}>
                  Review {draftCourses.length} draft{draftCourses.length === 1 ? "" : "s"}
                  <ChevronRight />
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="mt-7 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {metrics.map(({ label, value, note, icon: Icon, tone }) => (
          <div
            key={label}
            className="rounded-2xl border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {label}
                </p>
                <p className="mt-2 text-2xl font-extrabold text-navy">{value}</p>
              </div>
              <span className={cn("grid size-10 place-items-center rounded-xl", tone)}>
                <Icon className="size-5" />
              </span>
            </div>
            <p className="mt-4 text-xs font-semibold text-muted-foreground">{note}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_.75fr]">
        <div className="rounded-2xl border bg-card shadow-card">
          <div className="flex items-center justify-between border-b p-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-brand-foreground">
                Performance
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-navy">Course overview</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNavigate("courses")}>
              Manage courses <ChevronRight />
            </Button>
          </div>
          <div className="divide-y">
            {state.courses.length === 0 && (
              <p className="p-8 text-center text-sm text-muted-foreground">
                Course performance will appear after you create a course.
              </p>
            )}
            {state.courses.map((course) => (
              <div
                key={course.id}
                className="grid items-center gap-4 p-5 sm:grid-cols-[1fr_auto_auto]"
              >
                <div className="flex items-center gap-3">
                  <img src={course.thumbnail} alt="" className="size-12 rounded-lg object-cover" />
                  <div>
                    <p className="font-extrabold text-navy">{course.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {courseEnrollmentCount(state, course.id)} students ·{" "}
                      {courseStats(course).lessons} lessons
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs text-muted-foreground">Revenue</p>
                  <p className="font-extrabold text-navy">
                    {formatPrice(courseRevenue(state, course.id))}
                  </p>
                </div>
                <CourseStatusBadge course={course} />
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-brand-foreground">
                Recent
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-navy">Payments</h2>
            </div>
            <CreditCard className="size-5 text-brand-foreground" />
          </div>
          <div className="mt-4 divide-y">
            {state.payments.length === 0 && (
              <p className="py-8 text-center text-sm text-muted-foreground">
                No payment requests yet.
              </p>
            )}
            {state.payments.slice(0, 5).map((payment) => {
              const student = state.users.find((item) => item.id === payment.userId);
              return (
                <div key={payment.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-navy">{student?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(payment.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-navy">
                      {formatPrice(payment.amount)}
                    </p>
                    <PaymentBadge status={payment.status} />
                  </div>
                </div>
              );
            })}
          </div>
          <Button variant="outline" className="mt-4 w-full" onClick={() => onNavigate("payments")}>
            View all payments
          </Button>
        </div>
      </div>
    </section>
  );
}

function PageHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-foreground">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-3xl font-extrabold tracking-[-0.035em] text-navy">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-extrabold transition",
        active
          ? "border-navy bg-navy text-white shadow-sm"
          : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-navy",
      )}
    >
      {children}
    </button>
  );
}

function PaymentBadge({ status }: { status: "success" | "pending" | "failed" }) {
  const label = status === "success" ? "Approved" : status === "failed" ? "Rejected" : "Pending";
  return (
    <Badge
      className={cn(
        "capitalize shadow-none",
        status === "success"
          ? "bg-success/10 text-success"
          : status === "pending"
            ? "bg-warning/15 text-amber-800"
            : "bg-destructive/8 text-destructive",
      )}
    >
      {label}
    </Badge>
  );
}

function CurriculumEditor({
  sections,
  onChange,
}: {
  sections: Section[];
  onChange: (sections: Section[]) => void;
}) {
  const updateSection = (sectionId: string, update: (section: Section) => Section) =>
    onChange(sections.map((section) => (section.id === sectionId ? update(section) : section)));
  const updateLesson = (sectionId: string, lessonId: string, patch: Partial<Lesson>) =>
    updateSection(sectionId, (section) => ({
      ...section,
      lessons: section.lessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, ...patch } : lesson,
      ),
    }));
  const updateQuestion = (
    sectionId: string,
    lesson: Lesson,
    questionId: string,
    patch: Partial<QuizQuestion>,
  ) =>
    updateLesson(sectionId, lesson.id, {
      quiz: lesson.quiz.map((question) =>
        question.id === questionId ? { ...question, ...patch } : question,
      ),
    });

  return (
    <div className="space-y-5">
      {sections.length === 0 && (
        <div className="rounded-2xl border border-dashed bg-muted/25 px-6 py-10 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-xl bg-accent text-accent-foreground">
            <BookOpen className="size-5" />
          </span>
          <p className="mt-4 font-extrabold text-navy">Start building the curriculum</p>
          <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-muted-foreground">
            Add a section, then add lessons, videos, slides and optional quiz questions inside it.
          </p>
        </div>
      )}
      {sections.map((section, sectionIndex) => (
        <div key={section.id} className="rounded-xl border p-4">
          <div className="flex items-end gap-3">
            <div className="flex-1 space-y-2">
              <Label htmlFor={`section-${section.id}`}>Section {sectionIndex + 1}</Label>
              <Input
                id={`section-${section.id}`}
                value={section.title}
                onChange={(event) =>
                  updateSection(section.id, (current) => ({
                    ...current,
                    title: event.target.value,
                  }))
                }
              />
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              aria-label="Delete section"
              onClick={() => onChange(sections.filter((item) => item.id !== section.id))}
            >
              <Trash2 />
            </Button>
          </div>

          <div className="mt-4 space-y-4">
            {section.lessons.map((lesson, lessonIndex) => (
              <div key={lesson.id} className="rounded-xl bg-muted/45 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-extrabold text-navy">Lesson {lessonIndex + 1}</p>
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    aria-label="Delete lesson"
                    onClick={() =>
                      updateSection(section.id, (current) => ({
                        ...current,
                        lessons: current.lessons.filter((item) => item.id !== lesson.id),
                      }))
                    }
                  >
                    <Trash2 />
                  </Button>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <LabeledInput
                    label="Lesson title"
                    value={lesson.title}
                    onChange={(value) => updateLesson(section.id, lesson.id, { title: value })}
                  />
                  <LabeledInput
                    label="Duration (minutes)"
                    type="number"
                    value={String(lesson.durationMin)}
                    onChange={(value) =>
                      updateLesson(section.id, lesson.id, { durationMin: Number(value) })
                    }
                  />
                  <LabeledInput
                    label="Video source (YouTube or Google Drive ID/URL)"
                    value={lesson.youtubeId}
                    onChange={(value) => updateLesson(section.id, lesson.id, { youtubeId: value })}
                  />
                  <LabeledInput
                    label="PDF URL (HTTPS or local path)"
                    value={lesson.pdfUrl ?? ""}
                    onChange={(value) =>
                      updateLesson(section.id, lesson.id, { pdfUrl: value || null })
                    }
                  />
                  <LabeledInput
                    label="PDF file name"
                    value={lesson.pdfName ?? ""}
                    onChange={(value) =>
                      updateLesson(section.id, lesson.id, { pdfName: value || null })
                    }
                  />
                </div>
                <div className="mt-3 space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={lesson.description}
                    onChange={(event) =>
                      updateLesson(section.id, lesson.id, { description: event.target.value })
                    }
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-5">
                  {(
                    [
                      ["published", "Published"],
                      ["isPreview", "Free preview"],
                      ["allowDownload", "Allow PDF download"],
                    ] as const
                  ).map(([field, label]) => (
                    <Label key={field} className="flex items-center gap-2 text-xs font-bold">
                      <Switch
                        checked={lesson[field]}
                        onCheckedChange={(checked) =>
                          updateLesson(section.id, lesson.id, { [field]: checked })
                        }
                      />
                      {label}
                    </Label>
                  ))}
                </div>

                <div className="mt-5 border-t pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-extrabold text-navy">Quiz questions</p>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateLesson(section.id, lesson.id, {
                          quiz: [
                            ...lesson.quiz,
                            {
                              id: createId("question"),
                              text: "New question",
                              choices: ["First choice", "Second choice"],
                              correctIndex: 0,
                              explanation: "Explain why this answer is correct.",
                            },
                          ],
                        })
                      }
                    >
                      <Plus /> Add question
                    </Button>
                  </div>
                  <div className="mt-3 space-y-3">
                    {lesson.quiz.map((question, questionIndex) => (
                      <div key={question.id} className="rounded-lg border bg-card p-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-brand-foreground">
                            Question {questionIndex + 1}
                          </p>
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            aria-label="Delete question"
                            onClick={() =>
                              updateLesson(section.id, lesson.id, {
                                quiz: lesson.quiz.filter((item) => item.id !== question.id),
                              })
                            }
                          >
                            <Trash2 />
                          </Button>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <LabeledInput
                            label="Question"
                            value={question.text}
                            onChange={(value) =>
                              updateQuestion(section.id, lesson, question.id, { text: value })
                            }
                          />
                          <LabeledInput
                            label="Explanation"
                            value={question.explanation ?? ""}
                            onChange={(value) =>
                              updateQuestion(section.id, lesson, question.id, {
                                explanation: value,
                              })
                            }
                          />
                          <div className="space-y-2">
                            <Label>Choices (one per line)</Label>
                            <Textarea
                              value={question.choices.join("\n")}
                              onChange={(event) =>
                                updateQuestion(section.id, lesson, question.id, {
                                  choices: event.target.value.split("\n"),
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Correct choice</Label>
                            <Select
                              value={String(question.correctIndex ?? 0)}
                              onValueChange={(value) =>
                                updateQuestion(section.id, lesson, question.id, {
                                  correctIndex: Number(value),
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {question.choices.map((choice, index) => (
                                  <SelectItem key={`${question.id}-${index}`} value={String(index)}>
                                    {index + 1}. {choice || "Empty choice"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={() =>
              updateSection(section.id, (current) => ({
                ...current,
                lessons: [
                  ...current.lessons,
                  {
                    id: createId("lesson"),
                    title: "New lesson",
                    description: "Add a concise lesson description.",
                    durationMin: 15,
                    youtubeId: "",
                    pdfUrl: null,
                    pdfName: null,
                    allowDownload: false,
                    isPreview: false,
                    published: false,
                    quiz: [],
                  },
                ],
              }))
            }
          >
            <Plus /> Add lesson
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          onChange([...sections, { id: createId("section"), title: "New section", lessons: [] }])
        }
      >
        <Plus /> Add section
      </Button>
    </div>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}

function CourseEditor({
  course,
  onClose,
  onSave,
}: {
  course: Course | null;
  onClose: () => void;
  onSave: (course: Course) => Promise<void>;
}) {
  const [draft, setDraft] = useState<Course | null>(course);
  const [saving, setSaving] = useState(false);
  useEffect(() => setDraft(course), [course]);
  if (!draft) return <Dialog open={false} />;

  const patch = (values: Partial<Course>) =>
    setDraft((current) => (current ? { ...current, ...values } : current));
  const dateValue = (iso: string) => iso.slice(0, 16);
  const isoValue = (value: string) => (value ? new Date(value).toISOString() : null);
  const lessons = courseLessons(draft);
  const previewCount = lessons.filter((lesson) => lesson.isPreview).length;
  const publishedLessonCount = lessons.filter((lesson) => lesson.published).length;

  return (
    <Dialog
      open={Boolean(course)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-h-[92vh] max-w-5xl overflow-hidden p-0">
        <DialogHeader className="border-b p-6 pb-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <DialogTitle className="text-2xl text-navy">Edit course</DialogTitle>
              <DialogDescription className="mt-1">
                Changes are validated before they reach the live catalog.
              </DialogDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{draft.sections.length} sections</Badge>
              <Badge variant="outline">{lessons.length} lessons</Badge>
              <Badge variant="outline">{previewCount} free previews</Badge>
            </div>
          </div>
        </DialogHeader>
        <Tabs defaultValue="details" className="min-h-0">
          <div className="border-b px-6">
            <TabsList className="h-11 bg-transparent p-0">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="access">Pricing & access</TabsTrigger>
              <TabsTrigger value="curriculum">
                Curriculum
                <span className="ml-1.5 rounded-full bg-muted px-1.5 text-[10px]">
                  {publishedLessonCount}/{lessons.length}
                </span>
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="max-h-[62vh] overflow-y-auto p-6">
            <TabsContent value="details" className="mt-0 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="course-title">Course title</Label>
                  <Input
                    id="course-title"
                    value={draft.title}
                    onChange={(event) => patch({ title: event.target.value })}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="course-slug">URL slug</Label>
                  <Input
                    id="course-slug"
                    value={draft.slug}
                    onChange={(event) =>
                      patch({
                        slug: event.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9-]+/g, "-")
                          .replace(/-{2,}/g, "-"),
                      })
                    }
                    onBlur={() => patch({ slug: draft.slug.replace(/^-+|-+$/g, "") })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course-subject">Subject</Label>
                  <Input
                    id="course-subject"
                    value={draft.subject}
                    onChange={(event) => patch({ subject: event.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="course-level">Academic level</Label>
                  <Input
                    id="course-level"
                    value={draft.level}
                    onChange={(event) => patch({ level: event.target.value })}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="course-summary">Short summary</Label>
                  <Textarea
                    id="course-summary"
                    value={draft.summary}
                    onChange={(event) => patch({ summary: event.target.value })}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="course-description">Full description</Label>
                  <Textarea
                    id="course-description"
                    rows={5}
                    value={draft.description}
                    onChange={(event) => patch({ description: event.target.value })}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="course-outcomes">Learning outcomes (one per line)</Label>
                  <Textarea
                    id="course-outcomes"
                    rows={4}
                    value={draft.outcomes.join("\n")}
                    onChange={(event) => patch({ outcomes: event.target.value.split("\n") })}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="course-thumbnail">Thumbnail URL (HTTPS or local path)</Label>
                  <Input
                    id="course-thumbnail"
                    value={draft.thumbnail}
                    onChange={(event) => patch({ thumbnail: event.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Publishing state</Label>
                  <Select
                    value={draft.publishState}
                    onValueChange={(value) => patch({ publishState: value as PublishState })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="access" className="mt-0 space-y-5">
              <div className="rounded-xl border border-primary/20 bg-accent/55 p-4 text-sm leading-6 text-accent-foreground">
                <strong>Universal access rule:</strong> every enrolled student loses access on the
                same closing date.
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="course-price">One-time price (EGP)</Label>
                  <Input
                    id="course-price"
                    type="number"
                    min={0}
                    value={draft.price}
                    onChange={(event) => patch({ price: Number(event.target.value) })}
                  />
                </div>
                <div />
                <div className="space-y-2">
                  <Label htmlFor="sales-open">Sales open</Label>
                  <Input
                    id="sales-open"
                    type="datetime-local"
                    value={dateValue(draft.salesOpenAt)}
                    onChange={(event) => {
                      const value = isoValue(event.target.value);
                      if (value) patch({ salesOpenAt: value });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sales-close">Sales close</Label>
                  <Input
                    id="sales-close"
                    type="datetime-local"
                    value={dateValue(draft.salesCloseAt)}
                    onChange={(event) => {
                      const value = isoValue(event.target.value);
                      if (value) patch({ salesCloseAt: value });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="access-open">Access opens</Label>
                  <Input
                    id="access-open"
                    type="datetime-local"
                    value={dateValue(draft.accessOpenAt)}
                    onChange={(event) => {
                      const value = isoValue(event.target.value);
                      if (value) patch({ accessOpenAt: value });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="access-close">Access closes for everyone</Label>
                  <Input
                    id="access-close"
                    type="datetime-local"
                    value={dateValue(draft.accessCloseAt)}
                    onChange={(event) => {
                      const value = isoValue(event.target.value);
                      if (value) patch({ accessCloseAt: value });
                    }}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="curriculum" className="mt-0">
              <CurriculumEditor
                sections={draft.sections}
                onChange={(sections) => patch({ sections })}
              />
            </TabsContent>
          </div>
        </Tabs>
        <DialogFooter className="border-t p-5">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              try {
                await onSave(draft);
              } finally {
                setSaving(false);
              }
            }}
          >
            <Check /> {saving ? "Saving…" : "Save course"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function AccessManager({
  student,
  courses,
  isEnrolled,
  onClose,
  onGrant,
  onRevoke,
}: {
  student: User | null;
  courses: Course[];
  isEnrolled: (courseId: string) => boolean;
  onClose: () => void;
  onGrant: (studentId: string, courseId: string) => Promise<void>;
  onRevoke: (studentId: string, courseId: string) => Promise<void>;
}) {
  return (
    <Dialog
      open={Boolean(student)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-navy">Manage course access</DialogTitle>
          <DialogDescription>
            {student?.name} · {student?.email}
          </DialogDescription>
        </DialogHeader>
        <div className="my-2 divide-y rounded-xl border">
          {student &&
            courses.map((course) => {
              const active = isEnrolled(course.id);
              return (
                <div key={course.id} className="flex items-center justify-between gap-4 p-4">
                  <div className="min-w-0">
                    <p className="truncate font-extrabold text-navy">{course.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Access closes {formatDate(course.accessCloseAt)}
                    </p>
                  </div>
                  {active ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onRevoke(student.id, course.id)}
                    >
                      <LockKeyhole /> Revoke
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => onGrant(student.id, course.id)}>
                      <UserRoundCheck /> Grant
                    </Button>
                  )}
                </div>
              );
            })}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Announcements({
  courses,
  announcements,
  onPublish,
  onDelete,
}: {
  courses: Course[];
  announcements: ReturnType<typeof useStore>["state"]["announcements"];
  onPublish: (input: {
    courseId: string | null;
    title: string;
    body: string;
  }) => Promise<ActionResult>;
  onDelete: (id: string) => Promise<ActionResult>;
}) {
  const [audience, setAudience] = useState("all");
  const [publishing, setPublishing] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setPublishing(true);
    try {
      const result = await onPublish({
        courseId: audience === "all" ? null : audience,
        title: String(data.get("title")),
        body: String(data.get("body")),
      });
      if (result.ok) {
        form.reset();
        toast.success("Announcement published.");
      } else toast.error(result.error);
    } finally {
      setPublishing(false);
    }
  };
  return (
    <>
      <section>
        <PageHeading
          eyebrow="Communication"
          title="Announcements"
          description="Publish an update to all students or one course."
        />
        <div className="mt-7 grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
          <form onSubmit={submit} className="h-fit rounded-2xl border bg-card p-6 shadow-card">
            <h2 className="text-xl font-extrabold text-navy">New announcement</h2>
            <div className="mt-5 space-y-2">
              <Label>Audience</Label>
              <Select value={audience} onValueChange={setAudience}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All enrolled students</SelectItem>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="announcement-title">Title</Label>
              <Input
                id="announcement-title"
                name="title"
                required
                placeholder="What students need to know"
              />
            </div>
            <div className="mt-4 space-y-2">
              <Label htmlFor="announcement-body">Message</Label>
              <Textarea
                id="announcement-body"
                name="body"
                rows={5}
                required
                placeholder="Write the announcement…"
              />
            </div>
            <Button type="submit" disabled={publishing} className="mt-5 w-full">
              <Send /> {publishing ? "Publishing…" : "Publish announcement"}
            </Button>
          </form>
          <div className="rounded-2xl border bg-card shadow-card">
            <div className="border-b p-5">
              <h2 className="text-xl font-extrabold text-navy">Published announcements</h2>
            </div>
            <div className="divide-y">
              {announcements.length === 0 && (
                <p className="p-8 text-center text-sm text-muted-foreground">
                  Published announcements will appear here.
                </p>
              )}
              {announcements.map((announcement) => {
                const course = courses.find((item) => item.id === announcement.courseId);
                return (
                  <article key={announcement.id} className="flex items-start gap-4 p-5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
                      <Megaphone className="size-4" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold text-navy">{announcement.title}</h3>
                        <Badge variant="outline">{course?.title ?? "Everyone"}</Badge>
                      </div>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {announcement.body}
                      </p>
                      <p className="mt-2 text-xs font-semibold text-muted-foreground">
                        {formatDateTime(announcement.createdAt)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setAnnouncementToDelete(announcement.id)}
                      aria-label="Delete announcement"
                    >
                      <X />
                    </Button>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Dialog
        open={Boolean(announcementToDelete)}
        onOpenChange={(open) => !open && setAnnouncementToDelete(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-navy">Delete this announcement?</DialogTitle>
            <DialogDescription>
              Students will no longer see it. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAnnouncementToDelete(null)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={deleting}
              onClick={async () => {
                if (!announcementToDelete) return;
                setDeleting(true);
                try {
                  const result = await onDelete(announcementToDelete);
                  if (result.ok) {
                    setAnnouncementToDelete(null);
                    toast.success("Announcement deleted.");
                  } else toast.error(result.error);
                } finally {
                  setDeleting(false);
                }
              }}
            >
              <Trash2 /> {deleting ? "Deleting…" : "Delete announcement"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ApprovePaymentDialog({
  payment,
  student,
  course,
  submitting,
  onClose,
  onConfirm,
}: {
  payment: Payment | null;
  student: User | undefined;
  course: Course | undefined;
  submitting: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) {
  return (
    <Dialog open={Boolean(payment)} onOpenChange={(open) => !open && !submitting && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-navy">Confirm this transfer?</DialogTitle>
          <DialogDescription>
            Approving is final and immediately grants the student access to the course.
          </DialogDescription>
        </DialogHeader>
        {payment && (
          <dl className="my-2 grid gap-3 rounded-xl border bg-muted/35 p-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Reference</dt>
              <dd className="break-all text-right font-mono font-bold text-navy">
                {payment.txnId}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Student</dt>
              <dd className="text-right font-bold text-navy">{student?.name ?? "Unknown"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Course</dt>
              <dd className="text-right font-bold text-navy">{course?.title ?? "Unknown"}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Exact amount</dt>
              <dd className="text-right text-lg font-extrabold text-navy">
                {formatPrice(payment.amount)}
              </dd>
            </div>
          </dl>
        )}
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="button" onClick={() => void onConfirm()} disabled={submitting}>
            <Check /> {submitting ? "Approving…" : "I verified it — approve"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RejectPaymentDialog({
  paymentId,
  onClose,
  onConfirm,
}: {
  paymentId: string | null;
  onClose: () => void;
  onConfirm: (paymentId: string, reason?: string) => Promise<ActionResult>;
}) {
  const [submitting, setSubmitting] = useState(false);

  return (
    <Dialog open={Boolean(paymentId)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (!paymentId) return;
            const reason = String(new FormData(event.currentTarget).get("reason") ?? "").trim();
            setSubmitting(true);
            try {
              await onConfirm(paymentId, reason || undefined);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <DialogHeader>
            <DialogTitle className="text-navy">Reject transfer request?</DialogTitle>
            <DialogDescription>
              The student will not receive course access. Add a clear explanation so they know what
              to correct.
            </DialogDescription>
          </DialogHeader>
          <div className="my-5 space-y-2">
            <Label htmlFor="rejection-reason">Reason</Label>
            <Textarea
              id="rejection-reason"
              name="reason"
              minLength={3}
              maxLength={500}
              rows={4}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
              Cancel
            </Button>
            <Button type="submit" variant="destructive" disabled={submitting}>
              {submitting ? "Rejecting…" : "Reject request"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
