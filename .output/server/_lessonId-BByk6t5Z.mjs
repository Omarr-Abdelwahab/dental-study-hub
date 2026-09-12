import { n as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { c as formatDate, f as isAccessActive, g as useStore, i as courseStats, o as daysRemaining, r as courseLessons, s as formatClock } from "./_ssr/store-By_ZMgNx.mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { A as GraduationCap, B as CirclePlay, D as ListVideo, E as LoaderCircle, F as Download, G as ChevronLeft, H as CircleCheck, L as Clock3, M as FileText, T as LockKeyhole, W as ChevronRight, X as Bookmark, Y as CalendarClock, Z as BookOpen, a as Trophy, b as MessageCircle, et as ArrowRight, h as RotateCcw, p as Search, q as Check, t as X, tt as ArrowLeft, x as Menu, z as CircleQuestionMark } from "./_libs/lucide-react.mjs";
import { c as SheetHeader, d as cn, l as SheetTitle, o as Sheet, r as Button, s as SheetContent, t as AppHeader, u as SheetTrigger } from "./_ssr/app-shell-CAxw0SYi.mjs";
import { t as Label } from "./_ssr/label-jUwV-k0U.mjs";
import { a as courseProgressPercent, c as getCourse, d as isEnrolled, l as getProgress, m as lessonSection, n as bestScore, s as findLesson, t as attemptsFor, u as isBookmarked } from "./_ssr/selectors-Z06sDMBN.mjs";
import { n as RadioGroupItem, t as RadioGroup } from "./_ssr/radio-group-BiB-XrLs.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Route } from "./_lessonId-19OXyPr-.mjs";
import { t as Badge } from "./_ssr/badge-DDEClDpn.mjs";
import { t as Input } from "./_ssr/input-D2aMc97k.mjs";
import { t as Progress } from "./_ssr/progress-CuwXnkvg.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./_ssr/tabs-C3fJXHGI.mjs";
import { a as Viewport, i as ScrollAreaThumb, n as Root, r as ScrollAreaScrollbar, t as Corner } from "./_libs/radix-ui__react-scroll-area.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_lessonId-BByk6t5Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LessonQuiz({ courseId, lesson, enabled }) {
	const { state, user, submitQuiz } = useStore();
	const [answers, setAnswers] = (0, import_react.useState)(() => lesson.quiz.map(() => -1));
	const [result, setResult] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setAnswers(lesson.quiz.map(() => -1));
		setResult(null);
	}, [lesson.id, lesson.quiz]);
	const attempts = (0, import_react.useMemo)(() => user ? attemptsFor(state, user.id, lesson.id) : [], [
		lesson.id,
		state,
		user
	]);
	const highest = user ? bestScore(state, user.id, lesson.id) : null;
	const complete = answers.every((answer) => answer >= 0);
	if (!enabled) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed bg-muted/45 p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, { className: "mx-auto size-8 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 text-lg font-extrabold text-navy",
				children: "Quiz available after enrollment"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "The free preview includes the video only. Enroll to check your understanding."
			})
		]
	});
	if (!lesson.quiz.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-xl bg-muted p-5 text-sm text-muted-foreground",
		children: "No quiz has been added to this lesson."
	});
	const submit = () => {
		if (!user || !complete) return;
		const correct = lesson.quiz.reduce((count, question, index) => count + (answers[index] === question.correctIndex ? 1 : 0), 0);
		const score = Math.round(correct / lesson.quiz.length * 100);
		const passed = score >= 70;
		const next = {
			score,
			passed,
			answers: [...answers]
		};
		submitQuiz({
			courseId,
			lessonId: lesson.id,
			answers: next.answers,
			score,
			passed
		});
		setResult(next);
		if (passed) toast.success("Quiz passed. Lesson marked complete.");
		else toast.error("Not quite. Review the explanations and try again.");
	};
	const retake = () => {
		setAnswers(lesson.quiz.map(() => -1));
		setResult(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-extrabold text-navy",
				children: "Lesson quiz"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Pass with 70% or higher. Attempts are unlimited."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant: "outline",
					children: [
						attempts.length,
						" ",
						attempts.length === 1 ? "attempt" : "attempts"
					]
				}), highest !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					className: "bg-accent text-accent-foreground shadow-none",
					children: [
						"Best: ",
						highest,
						"%"
					]
				})]
			})]
		}),
		result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `mt-6 rounded-2xl border p-5 ${result.passed ? "border-success/25 bg-success/8" : "border-destructive/20 bg-destructive/5"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `grid size-11 shrink-0 place-items-center rounded-xl ${result.passed ? "bg-success text-white" : "bg-destructive text-white"}`,
					children: result.passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-xs font-extrabold uppercase tracking-wide ${result.passed ? "text-success" : "text-destructive"}`,
						children: result.passed ? "Passed" : "Try again"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-2xl font-extrabold text-navy",
						children: [result.score, "%"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: result.passed ? "This lesson is now marked complete." : "Read the explanations below, then retake when you are ready."
					})
				] })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 space-y-5",
			children: lesson.quiz.map((question, questionIndex) => {
				const chosen = result?.answers[questionIndex];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
					className: "rounded-2xl border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", {
							className: "sr-only",
							children: ["Question ", questionIndex + 1]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs font-extrabold uppercase tracking-wide text-primary",
							children: [
								"Question ",
								questionIndex + 1,
								" of ",
								lesson.quiz.length
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 font-extrabold leading-6 text-navy",
							children: question.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
							value: (answers[questionIndex] ?? -1) >= 0 ? String(answers[questionIndex]) : "",
							onValueChange: (value) => setAnswers((current) => current.map((answer, index) => index === questionIndex ? Number(value) : answer)),
							disabled: Boolean(result),
							className: "mt-4 gap-2.5",
							children: question.choices.map((choice, choiceIndex) => {
								const correct = result && choiceIndex === question.correctIndex;
								const wrong = result && choiceIndex === chosen && choiceIndex !== question.correctIndex;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: `${question.id}-${choiceIndex}`,
									className: `flex cursor-pointer items-center gap-3 rounded-xl border p-3.5 text-sm font-semibold transition ${correct ? "border-success/35 bg-success/8 text-success" : wrong ? "border-destructive/30 bg-destructive/5 text-destructive" : "hover:border-primary/30 hover:bg-accent/30"}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
											id: `${question.id}-${choiceIndex}`,
											value: String(choiceIndex)
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "flex-1",
											children: choice
										}),
										correct && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }),
										wrong && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
									]
								}, choice);
							})
						}),
						result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl bg-muted/65 p-4 text-sm leading-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-extrabold text-navy",
								children: "Why: "
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: question.explanation
							})]
						})
					]
				}, question.id);
			})
		}),
		result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: retake,
			variant: "outline",
			size: "lg",
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), " Retake quiz"]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: submit,
			disabled: !complete,
			size: "lg",
			className: "mt-6",
			children: "Submit answers"
		})
	] });
}
function YouTubePlayer({ videoId, startAt = 0, onProgress }) {
	const mountRef = (0, import_react.useRef)(null);
	const playerRef = (0, import_react.useRef)(null);
	const intervalRef = (0, import_react.useRef)(null);
	const progressCallbackRef = (0, import_react.useRef)(onProgress);
	const startAtRef = (0, import_react.useRef)(startAt);
	const [ready, setReady] = (0, import_react.useState)(false);
	progressCallbackRef.current = onProgress;
	startAtRef.current = startAt;
	(0, import_react.useEffect)(() => {
		if (!mountRef.current) return;
		let cancelled = false;
		const clearTracking = () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
		};
		const report = () => {
			const player = playerRef.current;
			if (!player || !progressCallbackRef.current) return;
			const position = player.getCurrentTime() || 0;
			const duration = player.getDuration() || 0;
			progressCallbackRef.current(position, duration ? position / duration * 100 : 0);
		};
		const startTracking = () => {
			clearTracking();
			intervalRef.current = setInterval(report, 1e4);
		};
		const create = () => {
			if (cancelled || !mountRef.current || !window.YT?.Player) return;
			playerRef.current = new window.YT.Player(mountRef.current, {
				videoId,
				playerVars: {
					rel: 0,
					modestbranding: 1,
					playsinline: 1,
					start: Math.max(0, Math.floor(startAtRef.current))
				},
				events: {
					onReady: ({ target }) => {
						if (startAtRef.current > 0) target.seekTo(startAtRef.current, true);
						setReady(true);
					},
					onStateChange: ({ data }) => {
						if (data === window.YT?.PlayerState.PLAYING) startTracking();
						else {
							report();
							clearTracking();
						}
					}
				}
			});
		};
		if (window.YT?.Player) create();
		else {
			const previous = window.onYouTubeIframeAPIReady;
			window.onYouTubeIframeAPIReady = () => {
				previous?.();
				create();
			};
			if (!document.querySelector("script[src=\"https://www.youtube.com/iframe_api\"]")) {
				const script = document.createElement("script");
				script.src = "https://www.youtube.com/iframe_api";
				script.async = true;
				document.head.appendChild(script);
			}
		}
		return () => {
			cancelled = true;
			report();
			clearTracking();
			try {
				playerRef.current?.destroy();
			} catch {}
			playerRef.current = null;
		};
	}, [videoId]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative aspect-video overflow-hidden rounded-2xl bg-black",
		children: [!ready && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 z-0 grid place-items-center bg-navy text-white",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mx-auto size-6 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs font-semibold text-white/60",
					children: "Loading video player"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: mountRef,
			className: "relative z-10 h-full w-full [&>iframe]:h-full [&>iframe]:w-full"
		})]
	});
}
var ScrollArea = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Root, {
	ref,
	className: cn("relative overflow-hidden", className),
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Viewport, {
			className: "h-full w-full rounded-[inherit]",
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollBar, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Corner, {})
	]
}));
ScrollArea.displayName = Root.displayName;
var ScrollBar = import_react.forwardRef(({ className, orientation = "vertical", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaScrollbar, {
	ref,
	orientation,
	className: cn("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" })
}));
ScrollBar.displayName = ScrollAreaScrollbar.displayName;
function LessonPage() {
	const { courseId, lessonId } = Route.useParams();
	const { state, user, enterDemo, saveProgress, toggleBookmark } = useStore();
	const course = getCourse(state, courseId);
	const lesson = course ? findLesson(course, lessonId) : void 0;
	const [search, setSearch] = (0, import_react.useState)("");
	const enrolled = Boolean(course) && (user?.role === "admin" || isEnrolled(state, user?.id ?? null, courseId));
	const activeAccess = user?.role === "admin" || Boolean(course && enrolled && isAccessActive(course));
	const previewMode = Boolean(lesson?.isPreview && !activeAccess);
	const canView = activeAccess || previewMode;
	const canUseMaterials = Boolean(activeAccess && user);
	const handleProgress = (0, import_react.useCallback)((positionSec, percent) => {
		if (!canUseMaterials || user?.role !== "student") return;
		saveProgress({
			courseId,
			lessonId,
			positionSec,
			percent,
			watchedSec: positionSec
		});
	}, [
		canUseMaterials,
		courseId,
		lessonId,
		saveProgress,
		user?.role
	]);
	if (!course || !lesson) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page py-24 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-extrabold text-navy",
				children: "Lesson not found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/courses",
					children: "Browse courses"
				})
			})]
		})]
	});
	const lessons = courseLessons(course).filter((item) => item.published);
	const currentIndex = lessons.findIndex((item) => item.id === lesson.id);
	const previous = currentIndex > 0 ? lessons[currentIndex - 1] : void 0;
	const next = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : void 0;
	const saved = user ? getProgress(state, user.id, lesson.id) : void 0;
	const bookmarked = isBookmarked(state, user?.id ?? null, lesson.id);
	const overall = user ? courseProgressPercent(state, user.id, course) : 0;
	const section = lessonSection(course, lesson.id);
	courseStats(course);
	if (!canView) {
		const expired = Boolean(enrolled && !isAccessActive(course));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen bg-secondary/35",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page grid min-h-[calc(100vh-108px)] place-items-center py-12",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-xl rounded-3xl border bg-card p-8 text-center shadow-lift",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mx-auto grid size-16 place-items-center rounded-2xl bg-muted text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "size-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-primary",
							children: expired ? "Course access ended" : "Student access required"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 text-3xl font-extrabold text-navy",
							children: lesson.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 leading-7 text-muted-foreground",
							children: expired ? `Access to ${course.title} ended on ${formatDate(course.accessCloseAt)}. Your progress and quiz history remain in your dashboard.` : "Enroll in this course to watch paid lessons, open the slides and complete the quizzes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 flex flex-col justify-center gap-3 sm:flex-row",
							children: [!user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								onClick: () => enterDemo("student"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {}), " Enter student demo"]
							}) : !expired ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/checkout/$courseId",
									params: { courseId: course.id },
									children: "Enroll now"
								})
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/dashboard",
									children: "View dashboard"
								})
							})]
						})
					]
				})
			})]
		});
	}
	const curriculum = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Curriculum, {
		course,
		currentLessonId: lesson.id,
		userId: user?.id,
		state,
		query: search,
		onQueryChange: setSearch,
		locked: !activeAccess
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-secondary/30",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page flex min-h-16 items-center justify-between gap-4 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-w-0 items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								asChild: true,
								className: "shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/dashboard",
									"aria-label": "Back to dashboard",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs font-bold text-primary",
									children: course.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-extrabold text-navy",
									children: lesson.title
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden min-w-52 items-center gap-3 md:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-[11px] font-bold text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Course progress" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [overall, "%"] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
									value: overall,
									className: "mt-1.5 h-1.5"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								variant: "outline",
								className: "shrink-0 gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-3.5" }),
									" ",
									Math.max(0, daysRemaining(course.accessCloseAt)),
									" days"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "icon",
								className: "lg:hidden",
								"aria-label": "Open curriculum",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
							side: "left",
							className: "w-[92vw] max-w-sm p-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
								className: "border-b p-5 text-left",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Course curriculum" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-[calc(100vh-75px)]",
								children: curriculum
							})]
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto grid max-w-[1500px] lg:grid-cols-[330px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden border-r bg-card lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "sticky top-[173px] h-[calc(100vh-173px)]",
						children: curriculum
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "min-w-0 px-4 py-6 sm:px-7 lg:px-9 lg:py-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-5xl",
						children: [
							previewMode && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-5 flex flex-col gap-3 rounded-xl border border-primary/20 bg-accent/65 p-4 sm:flex-row sm:items-center sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-extrabold text-accent-foreground",
									children: "You are watching a free preview"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-accent-foreground/72",
									children: "Slides and quiz results are included after enrollment."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/checkout/$courseId",
										params: { courseId: course.id },
										children: "Enroll in course"
									})
								})]
							}),
							saved && saved.lastPositionSec > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex items-center gap-2 text-sm font-semibold text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-4 text-primary" }),
									"Resuming from ",
									formatClock(saved.lastPositionSec)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YouTubePlayer, {
								videoId: lesson.youtubeId,
								startAt: saved?.lastPositionSec ?? 0,
								onProgress: handleProgress
							}, lesson.id),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												variant: "outline",
												children: section?.title ?? course.subject
											}),
											saved?.completed && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												className: "gap-1 bg-success text-success-foreground",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), " Completed"]
											}),
											previewMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												className: "bg-accent text-accent-foreground",
												children: "Free preview"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "mt-3 text-2xl font-extrabold tracking-[-0.03em] text-navy sm:text-3xl",
										children: lesson.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4 text-primary" }),
											" ",
											lesson.durationMin,
											" minutes"
										]
									})
								] }), user?.role === "student" && activeAccess && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: bookmarked ? "default" : "outline",
									onClick: () => toggleBookmark(course.id, lesson.id),
									className: "shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: bookmarked ? "fill-current" : "" }), bookmarked ? "Saved for revision" : "Bookmark lesson"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
								defaultValue: "overview",
								className: "mt-7",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-full overflow-x-auto rounded-xl bg-card shadow-card",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
											className: "h-auto min-w-max justify-start gap-1 rounded-xl bg-card p-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
													value: "overview",
													className: "gap-2 py-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-4" }), " Overview"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
													value: "slides",
													className: "gap-2 py-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }), " Slides"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
													value: "quiz",
													className: "gap-2 py-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), " Quiz"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
													value: "support",
													className: "gap-2 py-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-4" }), " Support"]
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
										value: "overview",
										className: "mt-5 rounded-2xl border bg-card p-6 shadow-card",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "text-xl font-extrabold text-navy",
												children: "About this lesson"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 leading-7 text-muted-foreground",
												children: lesson.description
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-6 grid gap-3 sm:grid-cols-3",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-xl bg-muted/65 p-4",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4 text-primary" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-2 text-xs font-bold text-muted-foreground",
																children: "Duration"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
																className: "mt-1 font-extrabold text-navy",
																children: [lesson.durationMin, " minutes"]
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-xl bg-muted/65 p-4",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-primary" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-2 text-xs font-bold text-muted-foreground",
																children: "Materials"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-1 font-extrabold text-navy",
																children: lesson.pdfUrl ? "Slides included" : "Video only"
															})
														]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "rounded-xl bg-muted/65 p-4",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 text-primary" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-2 text-xs font-bold text-muted-foreground",
																children: "Completion"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
																className: "mt-1 font-extrabold text-navy",
																children: "Pass the quiz"
															})
														]
													})
												]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "slides",
										className: "mt-5",
										children: !canUseMaterials ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockedMaterial, { text: "Enroll in the course to view the lesson slides." }) : lesson.pdfUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "overflow-hidden rounded-2xl border bg-card shadow-card",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between gap-4 border-b p-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "min-w-0",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "truncate font-extrabold text-navy",
														children: lesson.pdfName ?? "Lesson slides"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-xs text-muted-foreground",
														children: "View inside the platform"
													})]
												}), lesson.allowDownload && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													variant: "outline",
													size: "sm",
													asChild: true,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: lesson.pdfUrl,
														download: lesson.pdfName ?? true,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), " Download"]
													})
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
												src: lesson.pdfUrl,
												title: `${lesson.title} slides`,
												className: "h-[68vh] min-h-[520px] w-full bg-muted"
											})]
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-2xl border border-dashed bg-card p-10 text-center",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "mx-auto size-8 text-muted-foreground" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "mt-3 font-extrabold text-navy",
													children: "No slides for this lesson"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-sm text-muted-foreground",
													children: "Everything you need is covered in the video."
												})
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "quiz",
										className: "mt-5 rounded-2xl border bg-card p-5 shadow-card sm:p-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonQuiz, {
											courseId: course.id,
											lesson,
											enabled: canUseMaterials && user?.role === "student"
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
										value: "support",
										className: "mt-5 rounded-2xl border bg-card p-6 shadow-card",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "grid size-11 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "size-5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
													className: "text-xl font-extrabold text-navy",
													children: "Stuck on this topic?"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 max-w-2xl leading-7 text-muted-foreground",
													children: "Send the lesson title and your question to the course support team. This demo opens your email app with the topic already included."
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													asChild: true,
													className: "mt-5",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
														href: `mailto:support@dentalstudyhub.example?subject=Question about ${encodeURIComponent(lesson.title)}`,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {}), " Ask about this lesson"]
													})
												})
											] })]
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between",
								children: [previous ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									asChild: true,
									className: "w-full sm:w-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/learn/$courseId/$lessonId",
										params: {
											courseId: course.id,
											lessonId: previous.id
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {}),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden sm:inline",
												children: "Previous:"
											}),
											" ",
											previous.title
										]
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden sm:block" }), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "w-full sm:w-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/learn/$courseId/$lessonId",
										params: {
											courseId: course.id,
											lessonId: next.id
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "hidden sm:inline",
												children: "Next:"
											}),
											" ",
											next.title,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
										]
									})
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "w-full sm:w-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/dashboard",
										children: ["Finish course view ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
									})
								})]
							})
						]
					})
				})]
			})
		]
	});
}
function LockedMaterial({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-dashed bg-card p-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "mx-auto size-8 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-extrabold text-navy",
				children: "Enrollment required"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: text
			})
		]
	});
}
function Curriculum({ course, currentLessonId, userId, state, query, onQueryChange, locked }) {
	const lowered = query.trim().toLowerCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex items-center gap-2 text-sm font-extrabold text-navy",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListVideo, { className: "size-4 text-primary" }), " Course content"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "relative mt-3 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (event) => onQueryChange(event.target.value),
						placeholder: "Find a lesson",
						className: "h-9 bg-muted/55 pl-9"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea, {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3",
					children: course.sections.map((section, sectionIndex) => {
						const lessons = section.lessons.filter((lesson) => lesson.published && (!lowered || lesson.title.toLowerCase().includes(lowered)));
						if (!lessons.length) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "px-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-muted-foreground",
								children: [
									sectionIndex + 1,
									". ",
									section.title
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 grid gap-1",
								children: lessons.map((lesson) => {
									const progress = userId ? getProgress(state, userId, lesson.id) : void 0;
									const current = lesson.id === currentLessonId;
									const unavailable = locked && !lesson.isPreview;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/learn/$courseId/$lessonId",
										params: {
											courseId: course.id,
											lessonId: lesson.id
										},
										className: cn("flex items-start gap-3 rounded-xl p-3 transition", current ? "bg-accent text-accent-foreground" : "hover:bg-muted/65"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border", progress?.completed ? "border-success bg-success text-white" : current ? "border-primary bg-primary text-white" : "border-border text-muted-foreground"),
											children: progress?.completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : unavailable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "size-3" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePlay, { className: "size-3.5" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 flex-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "block text-sm font-bold leading-5",
													children: lesson.title
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "mt-1 block text-[11px] text-muted-foreground",
													children: [
														lesson.durationMin,
														" min ",
														lesson.isPreview ? "· Free preview" : ""
													]
												}),
												progress && !progress.completed && progress.percent > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "mt-2 block h-1 overflow-hidden rounded-full bg-border",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "block h-full rounded-full bg-primary",
														style: { width: `${progress.percent}%` }
													})
												})
											]
										})]
									}, lesson.id);
								})
							})]
						}, section.id);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t p-4 text-xs text-muted-foreground",
				children: [
					courseStats(course).lessons,
					" lessons · Access ends ",
					formatDate(course.accessCloseAt)
				]
			})
		]
	});
}
//#endregion
export { LessonPage as component };
