import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { c as formatDate, f as isAccessActive, g as useStore, l as formatDateTime, o as daysRemaining, r as courseLessons, s as formatClock } from "./store-By_ZMgNx.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Bell, A as GraduationCap, H as CircleCheck, T as LockKeyhole, X as Bookmark, Y as CalendarClock, Z as BookOpen, _ as Play, a as Trophy, et as ArrowRight, j as Flame, k as History } from "../_libs/lucide-react.mjs";
import { r as Button, t as AppHeader } from "./app-shell-CAxw0SYi.mjs";
import { a as courseProgressPercent, d as isEnrolled, g as studentAnnouncements, h as streakInfo, p as lastWatched, r as completedLessons, s as findLesson } from "./selectors-Z06sDMBN.mjs";
import { t as Badge } from "./badge-DDEClDpn.mjs";
import { t as Progress } from "./progress-CuwXnkvg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-CSTYbt9_.js
var import_jsx_runtime = require_jsx_runtime();
function StudentDashboard() {
	const { state, user, enterDemo } = useStore();
	if (!user || user.role !== "student") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-secondary/35",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page grid min-h-[calc(100vh-108px)] place-items-center py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-lg rounded-3xl border bg-card p-8 text-center shadow-lift",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-auto grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 text-3xl font-extrabold text-navy",
						children: "Open the student demo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 leading-7 text-muted-foreground",
						children: "See the enrolled courses, saved playback, quizzes, bookmarks and six-day streak."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: () => enterDemo("student"),
						className: "mt-7 h-11",
						children: ["Enter Student Demo ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					})
				]
			})
		})]
	});
	const enrolledCourses = state.courses.filter((course) => isEnrolled(state, user.id, course.id));
	const activeCourses = enrolledCourses.filter((course) => isAccessActive(course));
	const expiredCourses = enrolledCourses.filter((course) => !isAccessActive(course));
	const recentProgress = lastWatched(state, user.id);
	const recentActive = recentProgress.find((item) => activeCourses.some((course) => course.id === item.courseId));
	const continueCourse = recentActive ? activeCourses.find((course) => course.id === recentActive.courseId) : activeCourses[0];
	const continueLesson = continueCourse && recentActive ? findLesson(continueCourse, recentActive.lessonId) : continueCourse ? courseLessons(continueCourse)[0] : void 0;
	const streak = streakInfo(state, user.id);
	const announcements = studentAnnouncements(state, user.id);
	const bookmarks = state.bookmarks.filter((bookmark) => bookmark.userId === user.id).map((bookmark) => {
		const course = state.courses.find((item) => item.id === bookmark.courseId);
		const lesson = course ? findLesson(course, bookmark.lessonId) : void 0;
		return course && lesson ? {
			bookmark,
			course,
			lesson
		} : null;
	}).filter((item) => Boolean(item));
	const recentAttempts = [...state.attempts].filter((attempt) => attempt.userId === user.id).sort((a, b) => b.takenAt.localeCompare(a.takenAt)).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-secondary/32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "container-page py-8 sm:py-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold uppercase tracking-[0.18em] text-primary",
							children: "My learning"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-2 text-3xl font-extrabold tracking-[-0.04em] text-navy sm:text-4xl",
							children: [
								"Welcome back, ",
								user.name.split(" ")[0],
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-muted-foreground",
							children: "Pick up where you stopped and keep your revision moving."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/courses",
							children: ["Browse more courses ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-5 xl:grid-cols-[1.55fr_.75fr]",
					children: [continueCourse && continueLesson ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "relative overflow-hidden rounded-3xl bg-navy p-6 text-white shadow-lift sm:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-24 -top-24 size-64 rounded-full bg-primary/20 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative grid items-center gap-7 md:grid-cols-[1fr_250px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									className: "border-white/10 bg-white/8 text-white",
									children: "Continue learning"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 text-sm font-bold text-primary",
									children: continueCourse.subject
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 text-2xl font-extrabold sm:text-3xl",
									children: continueLesson.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 line-clamp-2 text-sm leading-6 text-white/62",
									children: continueLesson.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-5 flex flex-wrap gap-4 text-xs font-semibold text-white/65",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-3.5 text-primary" }),
											"Resume at ",
											formatClock(recentActive?.lastPositionSec ?? 0)
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3.5 text-primary" }),
											Math.max(0, daysRemaining(continueCourse.accessCloseAt)),
											" days left"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "lg",
									className: "mt-6 h-11",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/learn/$courseId/$lessonId",
										params: {
											courseId: continueCourse.id,
											lessonId: continueLesson.id
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), " Continue lesson"]
									})
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "overflow-hidden rounded-2xl border border-white/10 bg-white/7",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: continueCourse.thumbnail,
									alt: "",
									className: "aspect-[16/10] w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-between text-xs font-bold",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-white/62",
											children: "Course progress"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [courseProgressPercent(state, user.id, continueCourse), "%"] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 h-2 overflow-hidden rounded-full bg-white/12",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full bg-primary",
											style: { width: `${courseProgressPercent(state, user.id, continueCourse)}%` }
										})
									})]
								})]
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-3xl border bg-card p-8 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-9 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-2xl font-extrabold text-navy",
								children: "Choose your first course"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted-foreground",
								children: "Your active learning will appear here."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/courses",
									children: "Explore courses"
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-3xl border bg-card p-6 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground",
									children: "Learning streak"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 flex items-center gap-2 text-3xl font-extrabold text-navy",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-7 fill-orange-500 text-orange-500" }),
										" ",
										streak.current,
										" days"
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-10 place-items-center rounded-xl bg-orange-50 text-orange-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "size-5" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-6 text-muted-foreground",
								children: "Watch 10 minutes or pass one quiz today to keep it going."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 grid grid-cols-7 gap-1.5",
								children: streak.week.map((day) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] font-bold uppercase text-muted-foreground",
										children: day.date.toLocaleDateString("en-GB", { weekday: "narrow" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `mt-2 grid aspect-square place-items-center rounded-lg ${day.active ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground"}`,
										children: day.active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-3.5 fill-current" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-current opacity-25" })
									})]
								}, day.key))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-xs font-semibold text-muted-foreground",
								children: [
									"Longest streak: ",
									streak.longest,
									" days"
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-9",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold uppercase tracking-[0.16em] text-primary",
							children: "Active courses"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-2xl font-extrabold text-navy",
							children: "Keep learning"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm font-semibold text-muted-foreground",
							children: [activeCourses.length, " active"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 grid gap-5 lg:grid-cols-2",
						children: activeCourses.map((course) => {
							const progress = courseProgressPercent(state, user.id, course);
							const completed = completedLessons(state, user.id, course);
							const lessons = courseLessons(course).filter((lesson) => lesson.published);
							const latest = recentProgress.find((item) => item.courseId === course.id);
							const nextLesson = latest ? findLesson(course, latest.lessonId) : lessons[0];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("article", {
								className: "overflow-hidden rounded-2xl border bg-card shadow-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-[190px_1fr]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: course.thumbnail,
										alt: "",
										className: "h-full min-h-44 w-full object-cover"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "p-5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-start justify-between gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs font-bold uppercase tracking-wide text-primary",
													children: course.subject
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "mt-1 font-extrabold text-navy",
													children: course.title
												})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
													variant: "outline",
													className: "shrink-0",
													children: [Math.max(0, daysRemaining(course.accessCloseAt)), " days left"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-5 flex justify-between text-xs font-bold",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-muted-foreground",
													children: [
														completed,
														" of ",
														lessons.length,
														" lessons complete"
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-navy",
													children: [progress, "%"]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
												value: progress,
												className: "mt-2 h-2"
											}),
											nextLesson && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												className: "mt-5",
												asChild: true,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: "/learn/$courseId/$lessonId",
													params: {
														courseId: course.id,
														lessonId: nextLesson.id
													},
													children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
												})
											})
										]
									})]
								})
							}, course.id);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-9 grid gap-6 xl:grid-cols-[1fr_1fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border bg-card p-6 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold uppercase tracking-[0.16em] text-primary",
								children: "Saved for revision"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-xl font-extrabold text-navy",
								children: "Bookmarks"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "size-5 text-primary" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 divide-y",
							children: bookmarks.length ? bookmarks.map(({ course, lesson }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/learn/$courseId/$lessonId",
								params: {
									courseId: course.id,
									lessonId: lesson.id
								},
								className: "flex items-center justify-between gap-4 py-4 group",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-bold text-navy group-hover:text-primary",
										children: lesson.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: [
											course.title,
											" · ",
											lesson.durationMin,
											" min"
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 shrink-0 text-muted-foreground group-hover:text-primary" })]
							}, lesson.id)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "py-8 text-center text-sm text-muted-foreground",
								children: "Bookmark a lesson to find it here."
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border bg-card p-6 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold uppercase tracking-[0.16em] text-primary",
								children: "Recent results"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-xl font-extrabold text-navy",
								children: "Quiz attempts"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5 text-primary" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 divide-y",
							children: recentAttempts.map((attempt) => {
								const course = state.courses.find((item) => item.id === attempt.courseId);
								const lesson = course ? findLesson(course, attempt.lessonId) : void 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-4 py-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-bold text-navy",
											children: lesson?.title ?? "Lesson quiz"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: formatDateTime(attempt.takenAt)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										className: attempt.passed ? "bg-success/10 text-success shadow-none" : "bg-destructive/10 text-destructive shadow-none",
										children: [
											attempt.score,
											"% · ",
											attempt.passed ? "Passed" : "Retry"
										]
									})]
								}, attempt.id);
							})
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-9 grid gap-6 xl:grid-cols-[1.1fr_.9fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border bg-card p-6 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-extrabold uppercase tracking-[0.16em] text-primary",
								children: "Updates"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-xl font-extrabold text-navy",
								children: "Announcements"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-5 text-primary" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 divide-y",
							children: announcements.slice(0, 3).map((announcement) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "py-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-bold text-navy",
										children: announcement.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 text-xs text-muted-foreground",
										children: formatDate(announcement.createdAt)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-6 text-muted-foreground",
									children: announcement.body
								})]
							}, announcement.id))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border bg-card p-6 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold uppercase tracking-[0.16em] text-muted-foreground",
							children: "Past access"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-xl font-extrabold text-navy",
							children: "Expired courses"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3",
							children: expiredCourses.map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "flex gap-4 rounded-xl bg-muted/60 p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: course.thumbnail,
									alt: "",
									className: "size-16 rounded-lg object-cover grayscale-[25%]"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate font-bold text-navy",
												children: course.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "size-4 shrink-0 text-muted-foreground" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-xs text-muted-foreground",
											children: ["Access ended ", formatDate(course.accessCloseAt)]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-2 text-xs font-bold text-navy",
											children: [courseProgressPercent(state, user.id, course), "% history retained"]
										})
									]
								})]
							}, course.id))
						})]
					})]
				})
			]
		})]
	});
}
//#endregion
export { StudentDashboard as component };
