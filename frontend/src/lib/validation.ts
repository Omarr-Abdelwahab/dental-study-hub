import { z } from "zod";

import type { Course } from "./types";

const id = z.string().trim().min(1).max(100);
const safeResource = z
  .string()
  .max(2_000)
  .refine(
    (value) =>
      value === "" ||
      (value.startsWith("/") && !value.startsWith("//") && !value.includes("\\")) ||
      (() => {
        try {
          return new URL(value).protocol === "https:";
        } catch {
          return false;
        }
      })(),
    "Resource URLs must be same-origin paths or HTTPS URLs.",
  );

const quizQuestion = z.object({
  id,
  text: z.string().trim().min(1).max(1_000),
  choices: z.array(z.string().trim().min(1).max(500)).min(2).max(8),
  correctIndex: z.number().int().nonnegative().optional(),
  explanation: z.string().trim().max(2_000).optional(),
});

const lesson = z.object({
  id,
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(5_000),
  durationMin: z.number().int().min(0).max(1_440),
  youtubeId: z
    .string()
    .max(32)
    .regex(/^[A-Za-z0-9_-]*$/),
  pdfUrl: safeResource.nullable().optional(),
  pdfName: z.string().max(255).nullable().optional(),
  allowDownload: z.boolean(),
  isPreview: z.boolean(),
  published: z.boolean(),
  quiz: z.array(quizQuestion).max(100),
});

const section = z.object({
  id,
  title: z.string().trim().min(1).max(200),
  lessons: z.array(lesson).max(500),
});

export const courseSchema = z
  .object({
    id,
    slug: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .max(120),
    title: z.string().trim().min(1).max(200),
    subject: z.string().trim().min(1).max(120),
    level: z.string().trim().min(1).max(120),
    summary: z.string().trim().min(1).max(500),
    description: z.string().trim().min(1).max(10_000),
    outcomes: z.array(z.string().trim().min(1).max(500)).max(50),
    price: z.number().finite().min(0).max(10_000_000),
    thumbnail: safeResource,
    salesOpenAt: z.string().datetime({ offset: true }),
    salesCloseAt: z.string().datetime({ offset: true }),
    accessOpenAt: z.string().datetime({ offset: true }),
    accessCloseAt: z.string().datetime({ offset: true }),
    publishState: z.enum(["draft", "published", "archived"]),
    sections: z.array(section).max(100),
  })
  .superRefine((course, context) => {
    if (Date.parse(course.salesCloseAt) <= Date.parse(course.salesOpenAt)) {
      context.addIssue({
        code: "custom",
        path: ["salesCloseAt"],
        message: "Sales must close after they open.",
      });
    }
    if (Date.parse(course.accessCloseAt) <= Date.parse(course.accessOpenAt)) {
      context.addIssue({
        code: "custom",
        path: ["accessCloseAt"],
        message: "Access must close after it opens.",
      });
    }
  });

export function parseCourse(value: unknown): Course {
  return courseSchema.parse(value) as Course;
}

export function parseFullCourse(value: unknown): Course {
  const course = parseCourse(value);
  for (const sectionValue of course.sections) {
    for (const lessonValue of sectionValue.lessons) {
      for (const [index, question] of lessonValue.quiz.entries()) {
        if (
          question.correctIndex === undefined ||
          question.correctIndex >= question.choices.length ||
          question.explanation === undefined
        ) {
          throw new Error(
            `Quiz question ${index + 1} in “${lessonValue.title}” is missing a valid answer or explanation.`,
          );
        }
      }
    }
  }
  return course;
}

const quizEvaluationSchema = z.object({
  attempt_id: z.string().uuid(),
  score: z.number().int().min(0).max(100),
  passed: z.boolean(),
  correct_indexes: z.array(z.number().int().nonnegative()),
  explanations: z.array(z.string()),
  taken_at: z.string().datetime({ offset: true }),
});

export function parseQuizEvaluation(value: unknown) {
  return quizEvaluationSchema.parse(value);
}

const lessonProgressRowSchema = z.object({
  user_id: z.string().uuid(),
  course_id: id,
  lesson_id: id,
  last_position_sec: z.number().int().nonnegative(),
  watched_sec: z.number().int().nonnegative(),
  percent: z.number().int().min(0).max(100),
  completed: z.boolean(),
  updated_at: z.string().datetime({ offset: true }),
});

export function parseLessonProgressRow(value: unknown) {
  return lessonProgressRowSchema.parse(value);
}

const purchaseRequestRowSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  course_id: id,
  amount: z.union([z.number(), z.string()]),
  transfer_reference: z.string(),
  status: z.enum(["pending", "approved", "rejected"]),
  created_at: z.string().datetime({ offset: true }),
  reviewed_at: z.string().datetime({ offset: true }).nullable(),
  reviewed_by: z.string().uuid().nullable(),
  rejection_reason: z.string().nullable(),
});

export function parsePurchaseRequestRow(value: unknown) {
  return purchaseRequestRowSchema.parse(value);
}
