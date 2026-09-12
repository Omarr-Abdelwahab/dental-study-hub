import { n as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { a as courseStatus, c as formatDate, d as formatPrice, g as useStore, o as daysRemaining } from "./_ssr/store-By_ZMgNx.mjs";
import { h as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./_courseId-BKSXieun.mjs";
import { A as GraduationCap, E as LoaderCircle, H as CircleCheck, I as CreditCard, L as Clock3, T as LockKeyhole, Y as CalendarClock, o as TriangleAlert, q as Check, tt as ArrowLeft, u as ShieldCheck } from "./_libs/lucide-react.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "./_libs/@radix-ui/react-checkbox+[...].mjs";
import { d as cn, n as BrandMark, r as Button, t as AppHeader } from "./_ssr/app-shell-CAxw0SYi.mjs";
import { t as Label } from "./_ssr/label-jUwV-k0U.mjs";
import { c as getCourse } from "./_ssr/selectors-Z06sDMBN.mjs";
import { n as AlertDescription, r as AlertTitle, t as Alert } from "./_ssr/alert-Dwi-EAB9.mjs";
import { n as RadioGroupItem, t as RadioGroup } from "./_ssr/radio-group-BiB-XrLs.mjs";
import { n as toast } from "./_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_courseId-CuIGjdOz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var messages = {
	success: "Demo payment approved. Enrollment activated.",
	pending: "Demo payment is pending review. Access starts once it clears.",
	failed: "Demo payment was declined. No money was moved — this is a demo."
};
async function createPayment(intent) {
	await new Promise((resolve) => setTimeout(resolve, 1600));
	const status = intent.simulate ?? "success";
	return {
		txnId: `DEMO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
		status,
		method: "Demo Card",
		message: messages[status]
	};
}
function CheckoutPage() {
	const { courseId } = Route.useParams();
	const { state, user, enterDemo, recordPayment } = useStore();
	const course = getCourse(state, courseId);
	const [agreed, setAgreed] = (0, import_react.useState)(false);
	const [simulation, setSimulation] = (0, import_react.useState)("success");
	const [processing, setProcessing] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	if (!course) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
		})]
	});
	if (courseStatus(course) !== "open") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page max-w-2xl py-24 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mx-auto size-10 text-warning" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 text-3xl font-extrabold text-navy",
					children: "Enrollment is not available"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted-foreground",
					children: "Sales for this course are not currently open."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/courses/$slug",
						params: { slug: course.slug },
						children: "Return to course"
					})
				})
			]
		})]
	});
	const pay = async () => {
		if (!user || user.role !== "student" || !agreed) return;
		setProcessing(true);
		setResult(null);
		try {
			const payment = await createPayment({
				courseId: course.id,
				userId: user.id,
				amount: course.price,
				currency: "EGP",
				simulate: simulation
			});
			recordPayment({
				courseId: course.id,
				amount: course.price,
				txnId: payment.txnId,
				status: payment.status,
				method: payment.method
			});
			setResult(payment);
			if (payment.status === "success") toast.success("Demo payment approved. Course access is active.");
			else if (payment.status === "pending") toast.warning("Demo payment is pending.");
			else toast.error("Demo payment failed. Try the success scenario.");
		} finally {
			setProcessing(false);
		}
	};
	if (!user || user.role !== "student") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-secondary/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page grid min-h-[calc(100vh-108px)] place-items-center py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-lg rounded-3xl border bg-card p-7 text-center shadow-lift sm:p-9",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-auto grid size-14 place-items-center rounded-2xl bg-accent text-accent-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, { className: "size-6" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-5 text-2xl font-extrabold text-navy",
						children: "Sign in before checkout"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 leading-6 text-muted-foreground",
						children: "Your purchase needs a student account so the course can appear in My Learning."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => enterDemo("student"),
							className: "h-11",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {}), " Use student demo"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							asChild: true,
							className: "h-11",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/auth",
								children: "Sign in normally"
							})
						})]
					})
				]
			})
		})]
	});
	if (result?.status === "success") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-secondary/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page grid min-h-[calc(100vh-108px)] place-items-center py-12",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-xl rounded-3xl border bg-card p-7 text-center shadow-lift sm:p-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mx-auto grid size-16 place-items-center rounded-full bg-success/12 text-success",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-8" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-xs font-extrabold uppercase tracking-[0.18em] text-success",
						children: "Enrollment activated"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mt-2 text-3xl font-extrabold text-navy",
						children: [
							"You are in, ",
							user.name.split(" ")[0],
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 leading-7 text-muted-foreground",
						children: [
							course.title,
							" is now in your dashboard. Access remains available until",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								className: "text-navy",
								children: formatDate(course.accessCloseAt)
							}),
							"."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-xl bg-muted p-4 text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Demo transaction"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-navy",
								children: result.txnId
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Amount"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-navy",
								children: formatPrice(course.price)
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						asChild: true,
						className: "mt-7 h-12 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							children: "Open My Learning"
						})
					})
				]
			})
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-secondary/40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-b bg-background",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page flex h-17 items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-2 text-xs font-bold text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-4 text-success" }), " Demo checkout"]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "container-page py-8 sm:py-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "ghost",
				size: "sm",
				asChild: true,
				className: "-ml-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/courses/$slug",
					params: { slug: course.slug },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), " Back to course"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-7 lg:grid-cols-[1fr_390px]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border bg-card p-6 shadow-card sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold uppercase tracking-[0.18em] text-primary",
							children: "Step 1 of 1"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 text-3xl font-extrabold text-navy",
							children: "Confirm your enrollment"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-6 text-muted-foreground",
							children: "This payment screen is simulated. It will not ask for or charge a real card."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7 rounded-xl border bg-secondary/35 p-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
									children: "Student"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-extrabold text-navy",
									children: user.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-sm text-muted-foreground",
									children: user.email
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-base font-extrabold text-navy",
								children: "Choose demo outcome"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup, {
								value: simulation,
								onValueChange: (value) => {
									setSimulation(value);
									setResult(null);
								},
								className: "mt-3 grid gap-3 sm:grid-cols-3",
								children: [
									["success", "Approved"],
									["pending", "Pending"],
									["failed", "Declined"]
								].map(([value, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: `payment-${value}`,
									className: "flex cursor-pointer items-center gap-3 rounded-xl border bg-card p-4 hover:bg-muted/40",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
										id: `payment-${value}`,
										value
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-bold",
										children: label
									})]
								}, value))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "access-agreement",
							className: "mt-7 flex cursor-pointer items-start gap-3 rounded-xl border border-primary/20 bg-accent/55 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
								id: "access-agreement",
								checked: agreed,
								onCheckedChange: (checked) => setAgreed(checked === true),
								className: "mt-0.5"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm font-medium leading-6 text-accent-foreground",
								children: [
									"I understand that access closes for every student on",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatDate(course.accessCloseAt) }),
									", regardless of purchase date."
								]
							})]
						}),
						result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert, {
							variant: result.status === "failed" ? "destructive" : "default",
							className: "mt-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertTitle, { children: result.status === "pending" ? "Payment pending" : "Payment declined" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: result.message })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => void pay(),
							disabled: !agreed || processing,
							size: "lg",
							className: "mt-7 h-12 w-full text-base",
							children: processing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), " Processing demo payment…"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {}),
								" Pay ",
								formatPrice(course.price)
							] })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "h-fit rounded-2xl border bg-card p-6 shadow-card lg:sticky lg:top-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold uppercase tracking-wide text-muted-foreground",
							children: "Order summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: course.thumbnail,
								alt: "",
								className: "size-20 rounded-xl object-cover"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-extrabold leading-5 text-navy",
								children: course.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: course.level
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-3 border-y py-5 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-navy",
										children: "Access closes"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: formatDate(course.accessCloseAt)
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-navy",
										children: "Time remaining"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground",
										children: [Math.max(0, daysRemaining(course.accessCloseAt)), " days"]
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-success" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-bold text-navy",
										children: "Payment type"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: "One time · no renewal"
									})] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-bold text-muted-foreground",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-2xl font-extrabold text-navy",
								children: formatPrice(course.price)
							})]
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
export { CheckoutPage as component };
