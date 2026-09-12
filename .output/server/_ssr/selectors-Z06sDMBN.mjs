import { m as toDateKey, r as courseLessons } from "./store-By_ZMgNx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/selectors-Z06sDMBN.js
function getCourse(state, idOrSlug) {
	return state.courses.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
}
function findLesson(course, lessonId) {
	return courseLessons(course).find((l) => l.id === lessonId);
}
function lessonSection(course, lessonId) {
	return course.sections.find((s) => s.lessons.some((l) => l.id === lessonId));
}
function isEnrolled(state, userId, courseId) {
	if (!userId) return false;
	return state.enrollments.some((e) => e.userId === userId && e.courseId === courseId && !e.revoked);
}
function getProgress(state, userId, lessonId) {
	return state.progress.find((p) => p.userId === userId && p.lessonId === lessonId);
}
function courseProgressPercent(state, userId, course) {
	const lessons = courseLessons(course).filter((l) => l.published);
	if (!lessons.length) return 0;
	const total = lessons.reduce((sum, l) => {
		const p = getProgress(state, userId, l.id);
		return sum + (p?.completed ? 100 : p?.percent ?? 0);
	}, 0);
	return Math.round(total / lessons.length);
}
function completedLessons(state, userId, course) {
	return courseLessons(course).filter((l) => getProgress(state, userId, l.id)?.completed).length;
}
function lastActivityInCourse(state, userId, course) {
	const ids = new Set(courseLessons(course).map((l) => l.id));
	return state.progress.filter((p) => p.userId === userId && ids.has(p.lessonId)).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0];
}
function lastWatched(state, userId) {
	return [...state.progress].filter((p) => p.userId === userId).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}
function attemptsFor(state, userId, lessonId) {
	return state.attempts.filter((a) => a.userId === userId && a.lessonId === lessonId).sort((a, b) => b.takenAt.localeCompare(a.takenAt));
}
function bestScore(state, userId, lessonId) {
	const list = attemptsFor(state, userId, lessonId);
	return list.length ? Math.max(...list.map((a) => a.score)) : null;
}
function isBookmarked(state, userId, lessonId) {
	if (!userId) return false;
	return state.bookmarks.some((b) => b.userId === userId && b.lessonId === lessonId);
}
function streakInfo(state, userId) {
	const days = [...new Set(state.activity[userId] ?? [])].sort();
	const set = new Set(days);
	const today = toDateKey(/* @__PURE__ */ new Date());
	const yesterday = toDateKey(/* @__PURE__ */ new Date(Date.now() - 864e5));
	let current = 0;
	let cursor = set.has(today) ? /* @__PURE__ */ new Date() : set.has(yesterday) ? /* @__PURE__ */ new Date(Date.now() - 864e5) : null;
	while (cursor && set.has(toDateKey(cursor))) {
		current += 1;
		cursor = /* @__PURE__ */ new Date(cursor.getTime() - 864e5);
	}
	let longest = 0;
	let run = 0;
	let prev = null;
	for (const d of days) {
		if (prev && new Date(d).getTime() - new Date(prev).getTime() === 864e5) run += 1;
		else run = 1;
		longest = Math.max(longest, run);
		prev = d;
	}
	const week = Array.from({ length: 7 }, (_, i) => {
		const date = /* @__PURE__ */ new Date(Date.now() - (6 - i) * 864e5);
		return {
			key: toDateKey(date),
			date,
			active: set.has(toDateKey(date))
		};
	});
	return {
		current,
		longest: Math.max(longest, current),
		week,
		days
	};
}
function studentAnnouncements(state, userId) {
	const courseIds = new Set(state.enrollments.filter((e) => e.userId === userId && !e.revoked).map((e) => e.courseId));
	return state.announcements.filter((a) => a.courseId === null || courseIds.has(a.courseId)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
function courseRevenue(state, courseId) {
	return state.payments.filter((p) => p.courseId === courseId && p.status === "success").reduce((sum, p) => sum + p.amount, 0);
}
function courseEnrollmentCount(state, courseId) {
	return state.enrollments.filter((e) => e.courseId === courseId && !e.revoked).length;
}
function visibleCourses(state) {
	return state.courses.filter((c) => c.publishState === "published");
}
//#endregion
export { visibleCourses as _, courseProgressPercent as a, getCourse as c, isEnrolled as d, lastActivityInCourse as f, studentAnnouncements as g, streakInfo as h, courseEnrollmentCount as i, getProgress as l, lessonSection as m, bestScore as n, courseRevenue as o, lastWatched as p, completedLessons as r, findLesson as s, attemptsFor as t, isBookmarked as u };
