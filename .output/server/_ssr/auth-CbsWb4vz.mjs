import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as useStore } from "./store-By_ZMgNx.mjs";
import { g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as GraduationCap, T as LockKeyhole, Z as BookOpen, i as UserRoundCheck, tt as ArrowLeft, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { n as BrandMark, r as Button } from "./app-shell-CAxw0SYi.mjs";
import { t as Label } from "./label-jUwV-k0U.mjs";
import { n as AlertDescription, t as Alert } from "./alert-Dwi-EAB9.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Input } from "./input-D2aMc97k.mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-C3fJXHGI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-CbsWb4vz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthPage() {
	const { signIn, signUp, enterDemo } = useStore();
	const navigate = useNavigate();
	const [error, setError] = (0, import_react.useState)("");
	const goDemo = (role) => {
		enterDemo(role);
		navigate({ to: role === "admin" ? "/admin" : "/dashboard" });
	};
	const submitSignIn = (event) => {
		event.preventDefault();
		setError("");
		const data = new FormData(event.currentTarget);
		const result = signIn(String(data.get("email")), String(data.get("password")));
		if (!result.ok) {
			setError(result.error ?? "Could not sign in.");
			return;
		}
		navigate({ to: "/dashboard" });
	};
	const submitSignUp = (event) => {
		event.preventDefault();
		setError("");
		const data = new FormData(event.currentTarget);
		const result = signUp({
			name: String(data.get("name")),
			email: String(data.get("email")),
			password: String(data.get("password")),
			phone: String(data.get("phone")),
			university: String(data.get("university")),
			academicYear: String(data.get("academicYear"))
		});
		if (!result.ok) {
			setError(result.error ?? "Could not create the account.");
			return;
		}
		toast.success("Your demo account is ready.");
		navigate({ to: "/dashboard" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-screen bg-background lg:grid-cols-[.92fr_1.08fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative hidden overflow-hidden bg-navy p-12 text-white lg:flex lg:flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-32 bottom-10 size-96 rounded-full bg-primary/14 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, { light: true }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative my-auto max-w-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-extrabold uppercase tracking-[0.18em] text-primary",
							children: "Your learning stays organized"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-4 text-5xl font-extrabold leading-[1.08] tracking-[-0.045em]",
							children: "Pick up exactly where you stopped."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-lg leading-8 text-white/68",
							children: "Your courses, watched lessons, quiz attempts, bookmarks and streak are saved in one focused dashboard."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-4",
							children: [
								[BookOpen, "Resume videos from your last saved position"],
								[UserRoundCheck, "Track completion through mandatory quizzes"],
								[ShieldCheck, "See every course closing date before paying"]
							].map(([Icon, text]) => {
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3 text-sm font-semibold text-white/82",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid size-9 place-items-center rounded-lg bg-white/8 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
									}), String(text)]
								}, String(text));
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "relative text-xs text-white/38",
					children: "Interactive prototype · No real payment"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex items-center justify-center px-4 py-10 sm:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 flex items-center justify-between lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), " Home"]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-7 hidden lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							asChild: true,
							className: "-ml-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), " Back to home"]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-extrabold tracking-[-0.035em] text-navy",
						children: "Welcome back"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-6 text-muted-foreground",
						children: "Sign in normally or jump straight into either side of the demo."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "h-11",
							onClick: () => goDemo("student"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {}), " Student demo"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "h-11",
							onClick: () => goDemo("admin"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), " Admin demo"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-6 flex items-center gap-3 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" }),
							" or use an account",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-border" })
						]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert, {
						variant: "destructive",
						className: "mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDescription, { children: error })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						defaultValue: "signin",
						onValueChange: () => setError(""),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "grid h-11 w-full grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signin",
									children: "Sign in"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signup",
									children: "Create account"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "signin",
								className: "mt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: submitSignIn,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "signin-email",
												children: "Email address"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "signin-email",
												name: "email",
												type: "email",
												defaultValue: "student@demo.com",
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "signin-password",
													children: "Password"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: () => toast.info("For the demo, use demo1234."),
													className: "text-xs font-bold text-primary hover:underline",
													children: "Forgot password?"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "signin-password",
												name: "password",
												type: "password",
												defaultValue: "demo1234",
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "submit",
											className: "h-11 w-full",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockKeyhole, {}), " Sign in"]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "signup",
								className: "mt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									onSubmit: submitSignUp,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "signup-name",
												children: "Full name"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "signup-name",
												name: "name",
												placeholder: "Your full name",
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "signup-email",
												children: "Email address"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "signup-email",
												name: "email",
												type: "email",
												placeholder: "you@example.com",
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-4 sm:grid-cols-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "signup-phone",
													children: "Phone"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "signup-phone",
													name: "phone",
													placeholder: "+20...",
													required: true
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "signup-year",
													children: "Academic year"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: "signup-year",
													name: "academicYear",
													placeholder: "3rd year",
													required: true
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "signup-university",
												children: "University"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "signup-university",
												name: "university",
												placeholder: "Your university",
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "signup-password",
												children: "Password"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "signup-password",
												name: "password",
												type: "password",
												minLength: 6,
												required: true
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "submit",
											className: "h-11 w-full",
											children: "Create student account"
										})
									]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-center text-xs leading-5 text-muted-foreground",
						children: "This prototype stores demo data only in this browser."
					})
				]
			})
		})]
	});
}
//#endregion
export { AuthPage as component };
