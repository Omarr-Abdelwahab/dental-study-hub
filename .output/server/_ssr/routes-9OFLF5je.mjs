import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as useStore } from "./store-By_ZMgNx.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { L as Clock3, M as FileText, Q as BookCheck, _ as Play, c as Sparkles, et as ArrowRight, j as Flame, q as Check, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { a as SectionHeading, i as PublicPage, r as Button } from "./app-shell-CAxw0SYi.mjs";
import { _ as visibleCourses } from "./selectors-Z06sDMBN.mjs";
import { t as Badge } from "./badge-DDEClDpn.mjs";
import { t as CourseCard } from "./course-card-DCLks9GM.mjs";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-02PSgIsQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-9OFLF5je.js
var import_jsx_runtime = require_jsx_runtime();
var hero_study_default = "/assets/hero-study-Dd741idb.jpg";
function HomePage() {
	const { state } = useStore();
	const courses = visibleCourses(state);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PublicPage, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden bg-navy text-white",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-28 top-16 size-72 rounded-full bg-primary/12 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -right-20 bottom-0 size-80 rounded-full bg-primary/16 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "container-page relative grid min-h-[620px] items-center gap-12 py-16 lg:grid-cols-[1.02fr_.98fr] lg:py-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								className: "border border-white/12 bg-white/8 px-3 py-1.5 text-white shadow-none",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1.5 size-3.5 text-primary" }), " Built around your dental syllabus"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "mt-6 text-4xl font-extrabold leading-[1.08] tracking-[-0.05em] sm:text-5xl lg:text-6xl",
								children: [
									"Understand the subject.",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: "Walk into the exam ready."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-xl text-base leading-7 text-white/70 sm:text-lg",
								children: "Focused video lessons, clear slide decks and a mandatory quiz after every topic—organized in the same order you study at university."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-col gap-3 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									asChild: true,
									className: "h-12 px-6 text-base",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/courses",
										children: ["Explore courses ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									variant: "outline",
									asChild: true,
									className: "h-12 border-white/20 bg-white/5 px-6 text-base text-white hover:bg-white/10 hover:text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/courses/$slug",
										params: { slug: "oral-pathology-essentials" },
										hash: "preview",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {}), " Watch free preview"]
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-10 grid max-w-xl grid-cols-3 divide-x divide-white/12 border-y border-white/12 py-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pr-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-extrabold",
											children: "Pay once"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-white/55",
											children: "Per course"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "px-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-extrabold",
											children: "Learn clearly"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-white/55",
											children: "Video + slides"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "pl-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-lg font-extrabold",
											children: "Check progress"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-xs text-white/55",
											children: "Quiz every lesson"
										})]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto w-full max-w-xl lg:ml-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-5 rounded-[2.2rem] border border-white/8 bg-white/4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: hero_study_default,
								alt: "Dental students studying together",
								className: "relative aspect-[4/3] w-full rounded-[1.8rem] object-cover shadow-2xl"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -bottom-5 left-4 rounded-2xl border border-white/10 bg-white p-4 text-navy shadow-xl sm:-left-8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-10 place-items-center rounded-xl bg-orange-50 text-orange-600",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
										children: "Current streak"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-lg font-extrabold",
										children: "6 learning days"
									})] })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute -right-2 top-5 rounded-2xl border border-white/10 bg-navy/92 p-4 text-white shadow-xl backdrop-blur sm:-right-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-white/55",
										children: "Oral Pathology"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-extrabold",
										children: "43% complete"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-2 h-1.5 w-32 overflow-hidden rounded-full bg-white/15",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-[43%] rounded-full bg-primary" })
									})
								]
							})
						]
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-20 sm:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "Courses",
						title: "Study one subject properly",
						description: "Every course tells you exactly what is included, what it costs and when access ends—before you pay."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						asChild: true,
						className: "self-start sm:self-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/courses",
							children: ["View all courses ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3",
					children: courses.slice(0, 3).map((course) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CourseCard, { course }, course.id))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			id: "how-it-works",
			className: "border-y bg-secondary/45 py-20 sm:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					align: "center",
					eyebrow: "How it works",
					title: "From syllabus to real understanding",
					description: "No bundles, confusing memberships or hidden renewal. Pick the subject you need and follow a clear learning path."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-5 md:grid-cols-3",
					children: [
						{
							n: "01",
							icon: BookCheck,
							title: "Choose your subject",
							body: "Preview the curriculum, lesson format and access dates before committing."
						},
						{
							n: "02",
							icon: Play,
							title: "Learn at your pace",
							body: "Resume each video exactly where you stopped and keep the slides beside you."
						},
						{
							n: "03",
							icon: Check,
							title: "Prove you understood",
							body: "Pass the short quiz attached to every lesson and see your progress update."
						}
					].map(({ n, icon: Icon, title, body }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-2xl border bg-card p-7 shadow-card",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute right-5 top-3 text-5xl font-black text-navy/[0.055]",
								children: n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-6 text-xl font-extrabold text-navy",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-6 text-muted-foreground",
								children: body
							})
						]
					}, n))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-20 sm:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid items-center gap-12 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Built for revision",
					title: "Everything useful stays in one place",
					description: "The platform remembers the small details so you can spend your energy on the subject."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-4 sm:grid-cols-2",
					children: [
						{
							icon: Clock3,
							title: "Continue watching",
							text: "Return to the exact lesson and timestamp."
						},
						{
							icon: FileText,
							title: "Slides beside each lesson",
							text: "Open the matching PDF without searching chats."
						},
						{
							icon: BookCheck,
							title: "Mandatory checks",
							text: "A 70% pass mark confirms lesson completion."
						},
						{
							icon: Flame,
							title: "A streak that means something",
							text: "Only real learning activity keeps it alive."
						}
					].map(({ icon: Icon, title, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-3 rounded-xl border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-navy",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm leading-5 text-muted-foreground",
							children: text
						})] })]
					}, title))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-navy p-6 text-white shadow-lift sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold uppercase tracking-[0.17em] text-primary",
							children: "One clear rule"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-3 text-3xl font-extrabold",
							children: "Every course has a fixed closing date."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 leading-7 text-white/68",
							children: "Everyone gets access until the date shown on the course page, regardless of when they bought it. You see the date again at checkout and throughout your dashboard."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-7 rounded-2xl border border-white/10 bg-white/6 p-5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-5 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-bold",
									children: "No recurring charges"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-white/60",
									children: "One transparent payment for one course."
								})] })]
							})
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "py-20 sm:py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid gap-10 lg:grid-cols-[.75fr_1.25fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Questions",
					title: "Know what you are buying",
					description: "The rules are intentionally straightforward."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					className: "w-full",
					children: [
						["Is this a recurring subscription?", "No. You make one payment for each course you choose."],
						["How long can I access a course?", "Until the fixed closing date displayed on the course page and confirmed again at checkout."],
						["Do I receive a certificate?", "No. These courses support your university subjects and are not accredited programmes."],
						["Do quizzes lock later lessons?", "No. Every published lesson remains accessible, but you must pass its quiz to mark that lesson complete."],
						["Can I download the slides?", "Download availability is shown per lesson. You can always view included slides inside the course."]
					].map(([question, answer], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: `faq-${index}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-left font-bold text-navy",
							children: question
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "leading-6 text-muted-foreground",
							children: answer
						})]
					}, question))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "pb-20 sm:pb-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "container-page",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground shadow-lift sm:px-12",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-extrabold sm:text-4xl",
							children: "Start with a free lesson."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-xl text-primary-foreground/78",
							children: "See the teaching style, curriculum and course dates before deciding."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							variant: "secondary",
							asChild: true,
							className: "mt-7",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/courses",
								children: ["Browse all courses ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						})
					]
				})
			})
		})
	] });
}
//#endregion
export { HomePage as component };
