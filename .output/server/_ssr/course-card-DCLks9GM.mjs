import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as courseStatus, c as formatDate, d as formatPrice, i as courseStats, p as statusLabel, u as formatDuration } from "./store-By_ZMgNx.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as CirclePlay, L as Clock3, Y as CalendarClock, Z as BookOpen, et as ArrowRight } from "../_libs/lucide-react.mjs";
import { d as cn, r as Button } from "./app-shell-CAxw0SYi.mjs";
import { t as Badge } from "./badge-DDEClDpn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/course-card-DCLks9GM.js
var import_jsx_runtime = require_jsx_runtime();
var statusStyles = {
	open: "border-success/20 bg-success/10 text-success",
	upcoming: "border-primary/20 bg-accent text-accent-foreground",
	closed: "border-warning/30 bg-warning/10 text-amber-800",
	expired: "border-border bg-muted text-muted-foreground"
};
function CourseStatusBadge({ course }) {
	const status = courseStatus(course);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		className: cn("border font-bold", statusStyles[status]),
		children: statusLabel[status]
	});
}
function CourseCard({ course }) {
	const stats = courseStats(course);
	const preview = course.sections.flatMap((section) => section.lessons).some((lesson) => lesson.isPreview);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/courses/$slug",
			params: { slug: course.slug },
			className: "relative block overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: course.thumbnail,
				alt: "",
				className: "aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.035]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 top-0 flex items-start justify-between gap-3 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseStatusBadge, { course }), preview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					className: "gap-1 border-0 bg-navy/88 text-white backdrop-blur",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-3" }), " Free preview"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-extrabold uppercase tracking-[0.14em] text-primary",
					children: course.subject
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/courses/$slug",
					params: { slug: course.slug },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 text-xl font-extrabold leading-snug text-navy transition-colors group-hover:text-primary",
						children: course.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground",
					children: course.summary
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid grid-cols-2 gap-2 border-y py-3 text-xs font-semibold text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3.5 text-primary" }),
								" ",
								stats.lessons,
								" lessons"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3.5 text-primary" }),
								" ",
								formatDuration(stats.minutes)
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "col-span-2 inline-flex items-center gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3.5 text-primary" }),
								" Access until",
								" ",
								formatDate(course.accessCloseAt)
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-end justify-between gap-4 pt-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
						children: "One-time payment"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xl font-extrabold text-navy",
						children: formatPrice(course.price)
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/courses/$slug",
							params: { slug: course.slug },
							children: ["View course ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					})]
				})
			]
		})]
	});
}
//#endregion
export { CourseStatusBadge as n, CourseCard as t };
