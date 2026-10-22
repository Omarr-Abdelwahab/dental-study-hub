import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const frontendRoot = path.join(root, "frontend");

const server = await createServer({
  root: frontendRoot,
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
  resolve: { alias: { "@": path.join(frontendRoot, "src") } },
});

try {
  const { starterCourses } = await server.ssrLoadModule("/src/lib/seed.ts");
  const { parseFullCourse } = await server.ssrLoadModule("/src/lib/validation.ts");
  const { toPublicCourse, toStudentCourse } = await server.ssrLoadModule(
    "/src/lib/course-payload.ts",
  );
  const { courseStatus } = await server.ssrLoadModule("/src/lib/format.ts");

  assert.equal(starterCourses.length, 2, "exactly two implemented courses must ship");

  const lessonIds = new Set();
  const questionIds = new Set();
  let paidLessonCount = 0;
  let questionCount = 0;

  for (const sourceCourse of starterCourses) {
    const course = parseFullCourse(sourceCourse);
    assert.equal(course.publishState, "published", `${course.id} must be published`);
    assert.ok(course.price > 0, `${course.id} must have a positive price`);
    assert.equal(
      courseStatus(course, new Date("2026-10-22T12:00:00.000Z")),
      "open",
      `${course.id} must be open on the launch QA date`,
    );

    await access(path.join(frontendRoot, "public", course.thumbnail.replace(/^\//, "")));

    for (const section of course.sections) {
      for (const lesson of section.lessons) {
        assert.ok(!lessonIds.has(lesson.id), `duplicate lesson id: ${lesson.id}`);
        lessonIds.add(lesson.id);
        if (lesson.isPreview) continue;

        paidLessonCount += 1;
        assert.equal(lesson.quiz.length, 4, `${lesson.title} must have four quiz questions`);
        if (lesson.pdfUrl) {
          const pdfPath = path.join(frontendRoot, "public", lesson.pdfUrl.replace(/^\//, ""));
          await access(pdfPath);
          const signature = await readFile(pdfPath).then((buffer) => buffer.subarray(0, 5).toString());
          assert.equal(signature, "%PDF-", `${lesson.pdfUrl} must be a valid PDF`);
        }

        for (const question of lesson.quiz) {
          assert.ok(!questionIds.has(question.id), `duplicate question id: ${question.id}`);
          questionIds.add(question.id);
          assert.ok(
            Number.isInteger(question.correctIndex) &&
              question.correctIndex >= 0 &&
              question.correctIndex < question.choices.length,
            `${question.id} must have a valid answer`,
          );
          assert.ok(question.explanation?.trim(), `${question.id} must explain its answer`);
          questionCount += 1;
        }
      }
    }

    const studentCourse = toStudentCourse(course);
    for (const question of studentCourse.sections.flatMap((section) =>
      section.lessons.flatMap((lesson) => lesson.quiz),
    )) {
      assert.ok(!("correctIndex" in question), `${question.id} leaked correctIndex`);
      assert.ok(!("explanation" in question), `${question.id} leaked an explanation`);
    }

    const publicCourse = toPublicCourse(course);
    for (const lesson of publicCourse.sections.flatMap((section) => section.lessons)) {
      assert.equal(lesson.quiz.length, 0, `${lesson.id} exposed a quiz publicly`);
      assert.equal(lesson.pdfUrl, null, `${lesson.id} exposed a paid PDF publicly`);
      if (!lesson.isPreview) assert.equal(lesson.youtubeId, "", `${lesson.id} exposed paid media`);
    }
  }

  assert.equal(paidLessonCount, 7, "the catalog must contain seven paid lessons");
  assert.equal(questionCount, 28, "the catalog must contain 28 quiz questions");

  const migration = await readFile(
    path.join(root, "supabase/migrations/202610220001_instapay_review_hardening.sql"),
    "utf8",
  );
  assert.match(migration, /for update/i, "payment approval must lock the request row");
  assert.match(migration, /status <> 'pending'/i, "payment approval must be idempotent");
  assert.match(migration, /is_admin\(\)/i, "payment review must require an administrator");

  console.log(
    `Content validation passed: ${starterCourses.length} courses, ${paidLessonCount} paid lessons, ${questionCount} quiz questions.`,
  );
} finally {
  await server.close();
}
