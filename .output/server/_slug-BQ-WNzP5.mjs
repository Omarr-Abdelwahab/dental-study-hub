import { v as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { a as courseStatus, c as formatDate, d as formatPrice, f as isAccessActive, g as useStore, i as courseStats, r as courseLessons, u as formatDuration } from "./_ssr/store-By_ZMgNx.mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { H as CircleCheck, L as Clock3, N as FileQuestionMark, T as LockKeyhole, Y as CalendarClock, Z as BookOpen, _ as Play, et as ArrowRight, q as Check, u as ShieldCheck } from "./_libs/lucide-react.mjs";
import { i as PublicPage, r as Button } from "./_ssr/app-shell-CAxw0SYi.mjs";
import { a as courseProgressPercent, c as getCourse, d as isEnrolled, f as lastActivityInCourse } from "./_ssr/selectors-Z06sDMBN.mjs";
import { t as Badge } from "./_ssr/badge-DDEClDpn.mjs";
import { t as Route } from "./_slug-Cg2Y7B7M.mjs";
import { n as CourseStatusBadge } from "./_ssr/course-card-DCLks9GM.mjs";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./_ssr/accordion-02PSgIsQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-BQ-WNzP5.js
var import_jsx_runtime = require_jsx_runtime();
function CourseDetailsPage() {
	const { slug } = Route.useParams();
	const { state, user } = useStore();
	const course = getCourse(state, slug);
	if (!course) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PublicPage, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-24 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-extrabold text-navy",
			children: "Course not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/courses",
				children: "Browse courses"
			})
		})]
	}) });
	const stats = courseStats(course);
	const lessons = courseLessons(course).filter((lesson) => lesson.published);
	const preview = lessons.find((lesson) => lesson.isPreview);
	const enrolled = isEnrolled(state, user?.id ?? null, course.id);
	const active = isAccessActive(course);
	const status = courseStatus(course);
	const progress = user ? courseProgressPercent(state, user.id, course) : 0;
	const targetLesson = (user ? lastActivityInCourse(state, user.id, course) : void 0)?.lessonId ?? lessons[0]?.id ?? "";
	const cta = enrolled && active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "lg",
		className: "h-12 w-full text-base",
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/learn/$courseId/$lessonId",
			params: {
				courseId: course.id,
				lessonId: targetLesson
			},
			children: [
				progress ? `Continue course · ${progress}%` : "Start course",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
			]
		})
	}) : status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "lg",
		className: "h-12 w-full text-base",
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/checkout/$courseId",
			params: { courseId: course.id },
			children: ["Enroll now ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		size: "lg",
		className: "h-12 w-full",
		disabled: true,
		children: status === "upcoming" ? "Enrollment opens soon" : status === "expired" ? "Course access ended" : "Enrollment closed"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicPage, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-navy text-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid gap-10 py-12 lg:grid-cols-[1.15fr_.85fr] lg:py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "self-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseStatusBadge, { course }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								className: "border-white/10 bg-white/8 text-white",
								children: course.subject
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.045em] sm:text-5xl",
							children: course.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-2xl text-base leading-7 text-white/68",
							children: course.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/72",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4 text-primary" }),
										" ",
										stats.lessons,
										" lessons"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4 text-primary" }),
										" ",
										formatDuration(stats.minutes)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileQuestionMark, { className: "size-4 text-primary" }),
										" ",
										stats.quizzes,
										" quizzes"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4 text-primary" }),
										" Access until",
										" ",
										formatDate(course.accessCloseAt)
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: course.thumbnail,
					alt: "",
					className: "aspect-[16/10] w-full rounded-3xl object-cover shadow-2xl"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-b bg-secondary/45",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid gap-10 py-12 lg:grid-cols-[1fr_360px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-extrabold uppercase tracking-[0.18em] text-primary",
						children: "Course overview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl font-extrabold text-navy",
						children: "What you will learn"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-3xl leading-7 text-muted-foreground",
						children: course.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-7 grid gap-3 sm:grid-cols-2",
						children: course.outcomes.map((outcome) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 rounded-xl border bg-card p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-success/10 text-success",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-semibold leading-6 text-navy",
								children: outcome
							})]
						}, outcome))
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "lg:-mt-24",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky top-28 rounded-2xl border bg-card p-6 shadow-lift",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
								children: "One-time payment"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-3xl font-extrabold text-navy",
								children: formatPrice(course.price)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 rounded-xl border border-primary/20 bg-accent/70 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "flex items-center gap-2 text-sm font-extrabold text-accent-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4" }), " Fixed access date"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-accent-foreground/80",
									children: [
										"All student access ends on ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatDate(course.accessCloseAt) }),
										"."
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5",
								children: cta
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 grid gap-2.5 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-success" }), " All published lessons included"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-success" }), " Slides and mandatory quizzes"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-success" }), " No recurring charge"]
									})
								]
							})
						]
					})
				})]
			})
		}),
		preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "preview",
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-2xl bg-black shadow-lift",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-video",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							className: "h-full w-full",
							src: `https://www.youtube.com/embed/${preview.youtubeId}?rel=0`,
							title: `${preview.title} free preview`,
							allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
							allowFullScreen: true
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						variant: "outline",
						className: "gap-1.5 border-primary/25 bg-accent text-accent-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), " Free lesson"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 text-3xl font-extrabold text-navy",
						children: "Try the teaching style first"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 text-lg font-bold text-navy",
						children: preview.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 leading-7 text-muted-foreground",
						children: preview.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4 text-primary" }),
							" ",
							preview.durationMin,
							" minutes"
						]
					})
				] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y bg-secondary/45 py-16 sm:py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid gap-10 lg:grid-cols-[.7fr_1.3fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-extrabold uppercase tracking-[0.18em] text-primary",
						children: "Curriculum"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-3xl font-extrabold text-navy",
						children: "Inside the course"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-sm leading-6 text-muted-foreground",
						children: [
							stats.sections,
							" sections · ",
							stats.lessons,
							" lessons · ",
							formatDuration(stats.minutes),
							" ",
							"total"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "multiple",
					defaultValue: [course.sections[0]?.id ?? ""],
					className: "space-y-3",
					children: course.sections.map((section, sectionIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: section.id,
						className: "overflow-hidden rounded-xl border bg-card px-5 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "hover:no-underline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block text-xs font-bold uppercase tracking-wide text-primary",
									children: ["Section ", sectionIndex + 1]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block font-extrabold text-navy",
									children: section.title
								})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "pb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "divide-y",
								children: section.lessons.map((lesson, lessonIndex) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-4 py-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex min-w-0 items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-8 shrink-0 place-items-center rounded-lg bg-muted font-bold text-muted-foreground",
											children: lessonIndex + 1
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-navy",
												children: lesson.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-0.5 text-xs text-muted-foreground",
												children: [lesson.durationMin, " min · Quiz included"]
											})]
										})]
									}), lesson.isPreview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										className: "shrink-0 bg-accent text-accent-foreground",
										children: "Preview"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "size-4 shrink-0 text-muted-foreground/60" })]
								}, lesson.id))
							})
						})]
					}, section.id))
				})]
			})
		})
	] });
}
//#endregion
export { CourseDetailsPage as component };
