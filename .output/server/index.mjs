globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-09-12T01:03:18.836Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/accordion-BbM5ap67.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b7c-Ki8AIEw0M8goPc5AHL4o0zARxPU\"",
		"mtime": "2026-09-12T01:13:02.703Z",
		"size": 7036,
		"path": "../public/assets/accordion-BbM5ap67.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-12T01:03:18.841Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/arrow-left-BHi5TT0j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-7Tzjp5JY69m6+hLjMqNhBC5VL/k\"",
		"mtime": "2026-09-12T01:13:02.704Z",
		"size": 159,
		"path": "../public/assets/arrow-left-BHi5TT0j.js"
	},
	"/assets/alert-DJBy4kjy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e2-DlBcGXlDHTRz7NHdGzL+kB4oUsU\"",
		"mtime": "2026-09-12T01:13:02.704Z",
		"size": 994,
		"path": "../public/assets/alert-DJBy4kjy.js"
	},
	"/assets/arrow-right-Dy7s-Wob.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-18NdFCJA+61l4Gjpg6K2KxFwpEc\"",
		"mtime": "2026-09-12T01:13:02.705Z",
		"size": 159,
		"path": "../public/assets/arrow-right-Dy7s-Wob.js"
	},
	"/assets/badge-CTtqmfD9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"308-e4yaIlivsZ8Y2YGVc+c8ljd4bTE\"",
		"mtime": "2026-09-12T01:13:02.705Z",
		"size": 776,
		"path": "../public/assets/badge-CTtqmfD9.js"
	},
	"/assets/auth-DMDEHK-7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ba2-xZaswGBlX32b57AfPXQckn4tyr0\"",
		"mtime": "2026-09-12T01:13:02.705Z",
		"size": 7074,
		"path": "../public/assets/auth-DMDEHK-7.js"
	},
	"/assets/admin-NpSdd47R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea82-wo7m6LhOjnfmOEDRUQuoak5Asn0\"",
		"mtime": "2026-09-12T01:13:02.704Z",
		"size": 60034,
		"path": "../public/assets/admin-NpSdd47R.js"
	},
	"/assets/circle-check-Bzr3oF2j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-7yz94hibXAHiHAgSB/Vuu3b/8Ts\"",
		"mtime": "2026-09-12T01:13:02.705Z",
		"size": 172,
		"path": "../public/assets/circle-check-Bzr3oF2j.js"
	},
	"/assets/clock-3-D0lGta-e.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a3-SSMQRGi5vLvjtWOPOdxYLzSuues\"",
		"mtime": "2026-09-12T01:13:02.706Z",
		"size": 163,
		"path": "../public/assets/clock-3-D0lGta-e.js"
	},
	"/assets/course-card-qWe7bEUY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c55-1WIe/X7OF6Kc5O2LIX3vnp4t2nY\"",
		"mtime": "2026-09-12T01:13:02.706Z",
		"size": 3157,
		"path": "../public/assets/course-card-qWe7bEUY.js"
	},
	"/assets/course-oral-pathology-BODJlxkb.jpg": {
		"type": "image/jpeg",
		"etag": "\"9799-+eNdCpm8wHPfMU/KAijl1UOF8bQ\"",
		"mtime": "2026-09-12T01:13:02.713Z",
		"size": 38809,
		"path": "../public/assets/course-oral-pathology-BODJlxkb.jpg"
	},
	"/assets/courses-DcZBrx2t.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c66-o4xbJsg99fnrq268r/IEwuk6wx0\"",
		"mtime": "2026-09-12T01:13:02.707Z",
		"size": 3174,
		"path": "../public/assets/courses-DcZBrx2t.js"
	},
	"/assets/circle-play-B9qX94yu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-VD9f/sl/mIpn67Cw6OPM5lxCUr0\"",
		"mtime": "2026-09-12T01:13:02.705Z",
		"size": 250,
		"path": "../public/assets/circle-play-B9qX94yu.js"
	},
	"/assets/course-dental-anatomy-BBjPoj_i.jpg": {
		"type": "image/jpeg",
		"etag": "\"afce-fYnJ2dnR2AvKW5flUPObUjYQjYk\"",
		"mtime": "2026-09-12T01:13:02.712Z",
		"size": 45006,
		"path": "../public/assets/course-dental-anatomy-BBjPoj_i.jpg"
	},
	"/assets/app-shell-CS11dQv5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"218d5-SytBXDvUq7EcMhXit00LNNRfqRk\"",
		"mtime": "2026-09-12T01:13:02.704Z",
		"size": 137429,
		"path": "../public/assets/app-shell-CS11dQv5.js"
	},
	"/assets/course-radiology-J3mf7MUt.jpg": {
		"type": "image/jpeg",
		"etag": "\"ae77-3RFjyTidtf9+rEzj50/nC9xLSrw\"",
		"mtime": "2026-09-12T01:13:02.713Z",
		"size": 44663,
		"path": "../public/assets/course-radiology-J3mf7MUt.jpg"
	},
	"/assets/credit-card-BUfyaj8s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c9-OypP2SqYhmP6Uh5IzLoetus6Sc4\"",
		"mtime": "2026-09-12T01:13:02.707Z",
		"size": 201,
		"path": "../public/assets/credit-card-BUfyaj8s.js"
	},
	"/assets/dashboard-Z95MUxar.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35da-npjotHbjjZtkfx68VQijOISHs3M\"",
		"mtime": "2026-09-12T01:13:02.707Z",
		"size": 13786,
		"path": "../public/assets/dashboard-Z95MUxar.js"
	},
	"/assets/dist-BU8i3HB8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82e9-c4JsMW3QFR2FfjgrbJbVAXizzIE\"",
		"mtime": "2026-09-12T01:13:02.707Z",
		"size": 33513,
		"path": "../public/assets/dist-BU8i3HB8.js"
	},
	"/assets/file-question-mark-CGgouqe-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"149-PZ9HKQonsgqDHvhyKswziYvjd6o\"",
		"mtime": "2026-09-12T01:13:02.708Z",
		"size": 329,
		"path": "../public/assets/file-question-mark-CGgouqe-.js"
	},
	"/assets/course-pharmacology-CREqv1fL.jpg": {
		"type": "image/jpeg",
		"etag": "\"eddd-E1oRD0ml39RpD69eyY/msPpx094\"",
		"mtime": "2026-09-12T01:13:02.713Z",
		"size": 60893,
		"path": "../public/assets/course-pharmacology-CREqv1fL.jpg"
	},
	"/assets/file-text-Cohw99XM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17b-n4+CqOSKeR8YhT2MfUON6f8HDfs\"",
		"mtime": "2026-09-12T01:13:02.708Z",
		"size": 379,
		"path": "../public/assets/file-text-Cohw99XM.js"
	},
	"/assets/dist-D8Wfxh48.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-jFZvDM3G/vRQzi+d6tOFFCbMspo\"",
		"mtime": "2026-09-12T01:13:02.707Z",
		"size": 156,
		"path": "../public/assets/dist-D8Wfxh48.js"
	},
	"/assets/flame-BpE2qcAd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c1-3AX18CGZesTauO+09CQ/046cruY\"",
		"mtime": "2026-09-12T01:13:02.708Z",
		"size": 193,
		"path": "../public/assets/flame-BpE2qcAd.js"
	},
	"/assets/graduation-cap-EEaBgAMg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"146-m7ZbBUh6RZoAyPz5cEkaTV+27gE\"",
		"mtime": "2026-09-12T01:13:02.708Z",
		"size": 326,
		"path": "../public/assets/graduation-cap-EEaBgAMg.js"
	},
	"/assets/hero-study-Dd741idb.jpg": {
		"type": "image/jpeg",
		"etag": "\"25376-34UBKEZAfWqFbmf3bChvQajTl0E\"",
		"mtime": "2026-09-12T01:13:02.713Z",
		"size": 152438,
		"path": "../public/assets/hero-study-Dd741idb.jpg"
	},
	"/assets/input-DqxRR8j_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26d-oItpFG648Jrd/PWS4Qr7HV2SB+g\"",
		"mtime": "2026-09-12T01:13:02.709Z",
		"size": 621,
		"path": "../public/assets/input-DqxRR8j_.js"
	},
	"/assets/lock-keyhole-BMqzwiY2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f9-QsdX454O4aACU6+PkyRYY3DKZhg\"",
		"mtime": "2026-09-12T01:13:02.709Z",
		"size": 249,
		"path": "../public/assets/lock-keyhole-BMqzwiY2.js"
	},
	"/assets/label-CrzwYUyH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28d-s8t/lXXiHjP74HiZjldkTSrMBuo\"",
		"mtime": "2026-09-12T01:13:02.709Z",
		"size": 653,
		"path": "../public/assets/label-CrzwYUyH.js"
	},
	"/assets/play-DxhfvDHt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8-qxewC3W+v5mxX6xv7Y0SAdullJE\"",
		"mtime": "2026-09-12T01:13:02.709Z",
		"size": 184,
		"path": "../public/assets/play-DxhfvDHt.js"
	},
	"/assets/preload-helper-OJk99-8h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17de-jZmkaMz+5KavHZwnGWEA/FNPX60\"",
		"mtime": "2026-09-12T01:13:02.710Z",
		"size": 6110,
		"path": "../public/assets/preload-helper-OJk99-8h.js"
	},
	"/assets/progress-C9TbBp8j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b0-ivy7xCHCFcop8oISs4k2JmdlA4k\"",
		"mtime": "2026-09-12T01:13:02.710Z",
		"size": 2224,
		"path": "../public/assets/progress-C9TbBp8j.js"
	},
	"/assets/profile-wlKJQPAi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1739-dm0EHgILMGRx6Vv8BoeEyAHVen4\"",
		"mtime": "2026-09-12T01:13:02.710Z",
		"size": 5945,
		"path": "../public/assets/profile-wlKJQPAi.js"
	},
	"/assets/radio-group-97y1WjRj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17cd-N6bRBnvdjvWv8pSnM2GNpEd6bO4\"",
		"mtime": "2026-09-12T01:13:02.710Z",
		"size": 6093,
		"path": "../public/assets/radio-group-97y1WjRj.js"
	},
	"/assets/selectors-IfLV9WnQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab6-tzW+In9d4bTBad7J8R3k9hmkFck\"",
		"mtime": "2026-09-12T01:13:02.711Z",
		"size": 2742,
		"path": "../public/assets/selectors-IfLV9WnQ.js"
	},
	"/assets/search-_PbmvkyO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-tT4BnDPQoO49Y6fExqk9I28EDL4\"",
		"mtime": "2026-09-12T01:13:02.711Z",
		"size": 168,
		"path": "../public/assets/search-_PbmvkyO.js"
	},
	"/assets/routes-DIZp9nC4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c62-jrmW3EBXEt9ARHAFKzBQ6FatBUw\"",
		"mtime": "2026-09-12T01:13:02.711Z",
		"size": 11362,
		"path": "../public/assets/routes-DIZp9nC4.js"
	},
	"/assets/tabs-D66pjBjm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d80-77UxPECK+lLQuSFUJOFKzFRJhsg\"",
		"mtime": "2026-09-12T01:13:02.712Z",
		"size": 3456,
		"path": "../public/assets/tabs-D66pjBjm.js"
	},
	"/assets/store-Cqi_bj80.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e700-rosX9oUE5/+O9isrfUr5LnQFdDQ\"",
		"mtime": "2026-09-12T01:13:02.711Z",
		"size": 59136,
		"path": "../public/assets/store-Cqi_bj80.js"
	},
	"/assets/trophy-BzOPeesq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"287-54pRIytk0wX7HEBsGAZvkVdabDc\"",
		"mtime": "2026-09-12T01:13:02.712Z",
		"size": 647,
		"path": "../public/assets/trophy-BzOPeesq.js"
	},
	"/assets/index-BL6f4lYm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"52c1a-nUZfCmY5nkYiIVVKHOEseHY3nz8\"",
		"mtime": "2026-09-12T01:13:02.702Z",
		"size": 338970,
		"path": "../public/assets/index-BL6f4lYm.js"
	},
	"/assets/user-round-check-BHURYmZV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e4-2+MyOtD1Tcryxg8v1hPmReYzV5I\"",
		"mtime": "2026-09-12T01:13:02.712Z",
		"size": 228,
		"path": "../public/assets/user-round-check-BHURYmZV.js"
	},
	"/assets/_courseId-C_hOaQQN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ad6-rXDu9VbFFMnnUbi6RnQAxJtoiM4\"",
		"mtime": "2026-09-12T01:13:02.702Z",
		"size": 15062,
		"path": "../public/assets/_courseId-C_hOaQQN.js"
	},
	"/assets/_courseId-r-Sm5C9O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e6-waEDgiiQprY/dCYH5Z6OQgyoSsg\"",
		"mtime": "2026-09-12T01:13:02.702Z",
		"size": 742,
		"path": "../public/assets/_courseId-r-Sm5C9O.js"
	},
	"/assets/styles-CXCYUGP7.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1990e-y9UH4UmC/eDhCf3dxEJGq2z0GfM\"",
		"mtime": "2026-09-12T01:13:02.714Z",
		"size": 104718,
		"path": "../public/assets/styles-CXCYUGP7.css"
	},
	"/assets/_lessonId-CDKhnncv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8e82-d0ZeAbLQZ9+aNBjq2IR3V3m81UE\"",
		"mtime": "2026-09-12T01:13:02.702Z",
		"size": 36482,
		"path": "../public/assets/_lessonId-CDKhnncv.js"
	},
	"/assets/_slug-D68RV57k.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22c5-LsRjI5g4DFUNfgePc6DWaZG3yvw\"",
		"mtime": "2026-09-12T01:13:02.703Z",
		"size": 8901,
		"path": "../public/assets/_slug-D68RV57k.js"
	},
	"/assets/_lessonId-s50wqLx9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ea-n+TyYyn+E49bCngtf+0L3bVj3Ik\"",
		"mtime": "2026-09-12T01:13:02.703Z",
		"size": 1002,
		"path": "../public/assets/_lessonId-s50wqLx9.js"
	},
	"/slides/lesson-slides.pdf": {
		"type": "application/pdf",
		"etag": "\"6a2-kXQvZZtwFU173jQHFHRmpl3cyaw\"",
		"mtime": "2026-09-12T01:03:18.846Z",
		"size": 1698,
		"path": "../public/slides/lesson-slides.pdf"
	},
	"/assets/_slug-DbN9hLvD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e2-je20k9/n4dQeA8D9Zk84S8qD9v4\"",
		"mtime": "2026-09-12T01:13:02.703Z",
		"size": 738,
		"path": "../public/assets/_slug-DbN9hLvD.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy__Xazj4 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy__Xazj4
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
