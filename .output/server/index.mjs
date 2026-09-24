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
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"233-0YlWsusCgB0s0y+avTaCvmTRrwc\"",
		"mtime": "2026-09-13T13:35:04.809Z",
		"size": 563,
		"path": "../public/favicon.svg"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"a0-CKGXSIe7TSsqDTmGm/nY1t/o5d0\"",
		"mtime": "2026-09-12T01:03:18.841Z",
		"size": 160,
		"path": "../public/robots.txt"
	},
	"/assets/accordion-CuolWr1j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b82-GJwGithaB2PJXYqcdARvOWlAtWI\"",
		"mtime": "2026-09-13T13:57:26.547Z",
		"size": 7042,
		"path": "../public/assets/accordion-CuolWr1j.js"
	},
	"/assets/alert-DkiOaop0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e8-MQA8jCJqEAOFB8a3Wr3mUCPQDZw\"",
		"mtime": "2026-09-13T13:57:26.548Z",
		"size": 1e3,
		"path": "../public/assets/alert-DkiOaop0.js"
	},
	"/assets/arrow-left-4qPv4Wzd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-TQ00Vp7xAJUXVPlFWMZ3Fy+lw/U\"",
		"mtime": "2026-09-13T13:57:26.548Z",
		"size": 159,
		"path": "../public/assets/arrow-left-4qPv4Wzd.js"
	},
	"/assets/badge-CydW_pof.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30f-X9Un7f1UiVec5xk6DpvoU+lvLFE\"",
		"mtime": "2026-09-13T13:57:26.549Z",
		"size": 783,
		"path": "../public/assets/badge-CydW_pof.js"
	},
	"/assets/arrow-right-CF_XKCIt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9f-+jUn/nCam0B1Cmmh7nKT6riPWM8\"",
		"mtime": "2026-09-13T13:57:26.549Z",
		"size": 159,
		"path": "../public/assets/arrow-right-CF_XKCIt.js"
	},
	"/assets/circle-check-BEzcQzjX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac-tMb/sHgrNPmv46t0YpefHr7DCAU\"",
		"mtime": "2026-09-13T13:57:26.549Z",
		"size": 172,
		"path": "../public/assets/circle-check-BEzcQzjX.js"
	},
	"/assets/auth-BsX4Ivxo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ba8-YZqoKs8HGhn4dzRTV6Ro/0CfcHs\"",
		"mtime": "2026-09-13T13:57:26.549Z",
		"size": 7080,
		"path": "../public/assets/auth-BsX4Ivxo.js"
	},
	"/assets/admin-A5R9cQMm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ec1f-ChP8olhMFK8fpsY7C7wHvsGlLjI\"",
		"mtime": "2026-09-13T13:57:26.548Z",
		"size": 60447,
		"path": "../public/assets/admin-A5R9cQMm.js"
	},
	"/assets/circle-play-X1lajjN9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-qb+HWilVJlHZC1QHOQsb4eZFwLU\"",
		"mtime": "2026-09-13T13:57:26.549Z",
		"size": 250,
		"path": "../public/assets/circle-play-X1lajjN9.js"
	},
	"/assets/course-card-BUDCU5ZN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7f-iUBP5O31hjGLoDtDcD9LB/JmhCc\"",
		"mtime": "2026-09-13T13:57:26.550Z",
		"size": 3199,
		"path": "../public/assets/course-card-BUDCU5ZN.js"
	},
	"/assets/clock-3-C8r5PGf-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a3-CpcqTz15KVDduUaBxmn7YJinSHk\"",
		"mtime": "2026-09-13T13:57:26.550Z",
		"size": 163,
		"path": "../public/assets/clock-3-C8r5PGf-.js"
	},
	"/assets/course-dental-anatomy-BBjPoj_i.jpg": {
		"type": "image/jpeg",
		"etag": "\"afce-fYnJ2dnR2AvKW5flUPObUjYQjYk\"",
		"mtime": "2026-09-13T13:57:26.556Z",
		"size": 45006,
		"path": "../public/assets/course-dental-anatomy-BBjPoj_i.jpg"
	},
	"/assets/course-oral-pathology-BODJlxkb.jpg": {
		"type": "image/jpeg",
		"etag": "\"9799-+eNdCpm8wHPfMU/KAijl1UOF8bQ\"",
		"mtime": "2026-09-13T13:57:26.557Z",
		"size": 38809,
		"path": "../public/assets/course-oral-pathology-BODJlxkb.jpg"
	},
	"/assets/course-pharmacology-CREqv1fL.jpg": {
		"type": "image/jpeg",
		"etag": "\"eddd-E1oRD0ml39RpD69eyY/msPpx094\"",
		"mtime": "2026-09-13T13:57:26.557Z",
		"size": 60893,
		"path": "../public/assets/course-pharmacology-CREqv1fL.jpg"
	},
	"/assets/course-radiology-J3mf7MUt.jpg": {
		"type": "image/jpeg",
		"etag": "\"ae77-3RFjyTidtf9+rEzj50/nC9xLSrw\"",
		"mtime": "2026-09-13T13:57:26.557Z",
		"size": 44663,
		"path": "../public/assets/course-radiology-J3mf7MUt.jpg"
	},
	"/assets/courses-DqPT117G.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c8e-5D8s9W+U3zx0w0SfVdswZMyuGIc\"",
		"mtime": "2026-09-13T13:57:26.550Z",
		"size": 3214,
		"path": "../public/assets/courses-DqPT117G.js"
	},
	"/assets/credit-card-BbSXeKgw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c9-WJL5sTEUgHI4+baMbyj8SL262sc\"",
		"mtime": "2026-09-13T13:57:26.550Z",
		"size": 201,
		"path": "../public/assets/credit-card-BbSXeKgw.js"
	},
	"/assets/dist-D8Wfxh48.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c-jFZvDM3G/vRQzi+d6tOFFCbMspo\"",
		"mtime": "2026-09-13T13:57:26.551Z",
		"size": 156,
		"path": "../public/assets/dist-D8Wfxh48.js"
	},
	"/assets/dashboard-sUSRD1ry.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37a7-LYK85jBnicf07jlBwdtFmZ7ojZY\"",
		"mtime": "2026-09-13T13:57:26.551Z",
		"size": 14247,
		"path": "../public/assets/dashboard-sUSRD1ry.js"
	},
	"/assets/app-shell-DVa4UM-6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21961-2aGl71OlTPRoJ9CBYEINz2aX5gg\"",
		"mtime": "2026-09-13T13:57:26.548Z",
		"size": 137569,
		"path": "../public/assets/app-shell-DVa4UM-6.js"
	},
	"/assets/file-question-mark-2fSM4-ZY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"149-Ea3plxY+F6LAPBCsTgnA5aFHRFY\"",
		"mtime": "2026-09-13T13:57:26.551Z",
		"size": 329,
		"path": "../public/assets/file-question-mark-2fSM4-ZY.js"
	},
	"/assets/dist-DE39n6ZH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82ee-cjB9CtewzPQx+JNexiAgI33NFSw\"",
		"mtime": "2026-09-13T13:57:26.551Z",
		"size": 33518,
		"path": "../public/assets/dist-DE39n6ZH.js"
	},
	"/assets/file-text-B2rbVmj4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17b-tkVXi2Kp/LaeH4iF/T7Y8NWXlkA\"",
		"mtime": "2026-09-13T13:57:26.552Z",
		"size": 379,
		"path": "../public/assets/file-text-B2rbVmj4.js"
	},
	"/assets/format-iyKHqrZt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d3-pMEY1eLN/T3M36lr0+3dhnTvv6w\"",
		"mtime": "2026-09-13T13:57:26.552Z",
		"size": 1491,
		"path": "../public/assets/format-iyKHqrZt.js"
	},
	"/assets/flame-D-lbe1Hb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c1-Rbc91wErCc+/2a3G0EoCH/MDAU0\"",
		"mtime": "2026-09-13T13:57:26.552Z",
		"size": 193,
		"path": "../public/assets/flame-D-lbe1Hb.js"
	},
	"/assets/graduation-cap-BpyKIKou.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"146-xDfcLBlDuQCabKQXNwRG3qnXMbY\"",
		"mtime": "2026-09-13T13:57:26.552Z",
		"size": 326,
		"path": "../public/assets/graduation-cap-BpyKIKou.js"
	},
	"/assets/id-BBfD2VWq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"41-bXtnh6hG9uuBtZBElZnPPVNpbtU\"",
		"mtime": "2026-09-13T13:57:26.552Z",
		"size": 65,
		"path": "../public/assets/id-BBfD2VWq.js"
	},
	"/assets/input-DRYZAQco.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"273-ZLq18tPD36k9JtS/OS4v78168H4\"",
		"mtime": "2026-09-13T13:57:26.553Z",
		"size": 627,
		"path": "../public/assets/input-DRYZAQco.js"
	},
	"/assets/hero-study-Dd741idb.jpg": {
		"type": "image/jpeg",
		"etag": "\"25376-34UBKEZAfWqFbmf3bChvQajTl0E\"",
		"mtime": "2026-09-13T13:57:26.557Z",
		"size": 152438,
		"path": "../public/assets/hero-study-Dd741idb.jpg"
	},
	"/assets/label-Dx0VC861.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"293-00Yv7+VfyvdIsf0MrY7vo9VKfT4\"",
		"mtime": "2026-09-13T13:57:26.553Z",
		"size": 659,
		"path": "../public/assets/label-Dx0VC861.js"
	},
	"/assets/play-CzAa4STA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b8-RK16nRrpsN84RyIOcLoXPyC3qv0\"",
		"mtime": "2026-09-13T13:57:26.553Z",
		"size": 184,
		"path": "../public/assets/play-CzAa4STA.js"
	},
	"/assets/lock-keyhole-4MgAo6Lo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f9-SWoBVk4B+bbNYhut4Wt2xa3UBXY\"",
		"mtime": "2026-09-13T13:57:26.553Z",
		"size": 249,
		"path": "../public/assets/lock-keyhole-4MgAo6Lo.js"
	},
	"/assets/preload-helper-M_FZVafr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17dd-wQ6NfNJLRhVguFC82n1dskJ69Mk\"",
		"mtime": "2026-09-13T13:57:26.554Z",
		"size": 6109,
		"path": "../public/assets/preload-helper-M_FZVafr.js"
	},
	"/assets/index-BVnR2-_o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57fd5-c4VZBNRsk1V2U43KtfK/61qWW4Y\"",
		"mtime": "2026-09-13T13:57:26.544Z",
		"size": 360405,
		"path": "../public/assets/index-BVnR2-_o.js"
	},
	"/assets/profile-FVWrvSdJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1761-1wrYXeEt/L8WyBYOuHpAaKIHN0g\"",
		"mtime": "2026-09-13T13:57:26.554Z",
		"size": 5985,
		"path": "../public/assets/profile-FVWrvSdJ.js"
	},
	"/assets/progress-BgHcI1yj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8b6-mlFLCS9v20CQbsN/JPJQxgmURjg\"",
		"mtime": "2026-09-13T13:57:26.554Z",
		"size": 2230,
		"path": "../public/assets/progress-BgHcI1yj.js"
	},
	"/assets/routes-DsB6pWbS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c6a-Ia47is/vZABPr22HfoRg+xgBlLM\"",
		"mtime": "2026-09-13T13:57:26.555Z",
		"size": 11370,
		"path": "../public/assets/routes-DsB6pWbS.js"
	},
	"/assets/search-Bcsom0gy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a8-Gv/C3SaB/2olp3fZxaNZgx5Lyy4\"",
		"mtime": "2026-09-13T13:57:26.555Z",
		"size": 168,
		"path": "../public/assets/search-Bcsom0gy.js"
	},
	"/assets/selectors-BzxUx8XG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a22-FPq5O1eQwZmeGHftb6jZvyHumTo\"",
		"mtime": "2026-09-13T13:57:26.555Z",
		"size": 2594,
		"path": "../public/assets/selectors-BzxUx8XG.js"
	},
	"/assets/radio-group-BtrwDSFp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17d4-QrH1CKaQhcXcO+A1bH4EpskoMB8\"",
		"mtime": "2026-09-13T13:57:26.554Z",
		"size": 6100,
		"path": "../public/assets/radio-group-BtrwDSFp.js"
	},
	"/assets/tabs-DnJJrMBz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d86-lo4DUyoQhggPLBLf7Zy/n4B6r80\"",
		"mtime": "2026-09-13T13:57:26.556Z",
		"size": 3462,
		"path": "../public/assets/tabs-DnJJrMBz.js"
	},
	"/assets/trophy-BrINyFma.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"287-rWTgKZVaLxVBhf33dPyLP8QJHGo\"",
		"mtime": "2026-09-13T13:57:26.556Z",
		"size": 647,
		"path": "../public/assets/trophy-BrINyFma.js"
	},
	"/assets/user-round-check-BVU9WOCk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e4-oVtauDvQgKRLdPRshBtfRmuMbrs\"",
		"mtime": "2026-09-13T13:57:26.556Z",
		"size": 228,
		"path": "../public/assets/user-round-check-BVU9WOCk.js"
	},
	"/assets/styles-BO_UZjCz.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1990e-f+x8H786ZqJ4bTT/9p8Dq/YwAU4\"",
		"mtime": "2026-09-13T13:57:26.558Z",
		"size": 104718,
		"path": "../public/assets/styles-BO_UZjCz.css"
	},
	"/assets/_courseId-BqwRy-9H.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3afa-BTYOcVJF4BkYMh+SWgkW6zJe6cM\"",
		"mtime": "2026-09-13T13:57:26.545Z",
		"size": 15098,
		"path": "../public/assets/_courseId-BqwRy-9H.js"
	},
	"/assets/_courseId-BY16n6bH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"328-Jp+mz1gzTdY5VrpnWB1vH5LDZk4\"",
		"mtime": "2026-09-13T13:57:26.544Z",
		"size": 808,
		"path": "../public/assets/_courseId-BY16n6bH.js"
	},
	"/assets/store-context-Bb-ayev4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d93-5z0TX+hOWMxG9B6nFeUcU6BkgGg\"",
		"mtime": "2026-09-13T13:57:26.555Z",
		"size": 36243,
		"path": "../public/assets/store-context-Bb-ayev4.js"
	},
	"/assets/_lessonId-Caf0YZsm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90a3-hCjzwI9S2OMJh+v8WAc1oBb48wY\"",
		"mtime": "2026-09-13T13:57:26.545Z",
		"size": 37027,
		"path": "../public/assets/_lessonId-Caf0YZsm.js"
	},
	"/assets/_lessonId-f0TsoPWQ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"411-QKtDQeyT+pheMmdEjKe71PA90y8\"",
		"mtime": "2026-09-13T13:57:26.547Z",
		"size": 1041,
		"path": "../public/assets/_lessonId-f0TsoPWQ.js"
	},
	"/assets/_slug-CICunKOd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22f4-/ZAOYlltXbJ7/8Ghjm+z5/L+kTs\"",
		"mtime": "2026-09-13T13:57:26.547Z",
		"size": 8948,
		"path": "../public/assets/_slug-CICunKOd.js"
	},
	"/assets/_slug-CtJv4DJw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"309-2/FcG9uW6e1Wom+07oG5n8Ah4W4\"",
		"mtime": "2026-09-13T13:57:26.547Z",
		"size": 777,
		"path": "../public/assets/_slug-CtJv4DJw.js"
	},
	"/slides/lesson-slides.pdf": {
		"type": "application/pdf",
		"etag": "\"6a2-kXQvZZtwFU173jQHFHRmpl3cyaw\"",
		"mtime": "2026-09-12T01:03:18.846Z",
		"size": 1698,
		"path": "../public/slides/lesson-slides.pdf"
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
var _lazy_7kLPSl = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_7kLPSl
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
