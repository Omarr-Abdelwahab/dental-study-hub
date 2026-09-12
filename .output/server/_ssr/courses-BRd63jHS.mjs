import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as courseStatus, g as useStore } from "./store-By_ZMgNx.mjs";
import { l as SlidersHorizontal, p as Search } from "../_libs/lucide-react.mjs";
import { a as SectionHeading, i as PublicPage } from "./app-shell-CAxw0SYi.mjs";
import { _ as visibleCourses } from "./selectors-Z06sDMBN.mjs";
import { t as Input } from "./input-D2aMc97k.mjs";
import { t as CourseCard } from "./course-card-DCLks9GM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/courses-BRd63jHS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoursesPage() {
	const { state } = useStore();
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const courses = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return visibleCourses(state).filter((course) => {
			const matchesQuery = !q || `${course.title} ${course.subject} ${course.summary}`.toLowerCase().includes(q);
			const status = courseStatus(course);
			return matchesQuery && (filter === "all" || status === filter || filter === "closed" && status === "expired");
		});
	}, [
		filter,
		query,
		state
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicPage, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-b bg-secondary/45 py-14 sm:py-18",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Course catalogue",
				title: "Choose the subject you need",
				description: "Preview the teaching style, syllabus, price and fixed access date before you pay."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-3 rounded-2xl border bg-card p-3 shadow-card md:flex-row md:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (event) => setQuery(event.target.value),
						placeholder: "Search by course or subject",
						className: "h-11 border-0 bg-muted/65 pl-10 shadow-none"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 overflow-x-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "mx-2 size-4 shrink-0 text-muted-foreground" }), [
						"all",
						"open",
						"upcoming",
						"closed"
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setFilter(item),
						className: `rounded-lg px-3 py-2 text-sm font-bold capitalize transition ${filter === item ? "bg-navy text-white" : "text-muted-foreground hover:bg-muted hover:text-navy"}`,
						children: item === "all" ? "All courses" : item === "closed" ? "Closed / expired" : item
					}, item))]
				})]
			})]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-14 sm:py-18",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-6 text-sm font-semibold text-muted-foreground",
				children: [
					courses.length,
					" ",
					courses.length === 1 ? "course" : "courses",
					" found"
				]
			}), courses.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3",
				children: courses.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course }, course.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-dashed bg-card py-20 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "mx-auto size-8 text-muted-foreground" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-xl font-extrabold text-navy",
						children: "No matching courses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Try another subject or clear the filter."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setQuery("");
							setFilter("all");
						},
						className: "mt-4 text-sm font-bold text-primary hover:underline",
						children: "Clear filters"
					})
				]
			})]
		})
	})] });
}
//#endregion
export { CoursesPage as component };
