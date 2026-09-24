import type { Course, QuizQuestion } from "./types";

function studentQuestion(question: QuizQuestion): QuizQuestion {
  const { correctIndex: _correctIndex, explanation: _explanation, ...safe } = question;
  return safe;
}

/** Remove answer keys while preserving material available to an enrolled student. */
export function toStudentCourse(course: Course): Course {
  return {
    ...course,
    sections: course.sections.map((section) => ({
      ...section,
      lessons: section.lessons.map((lesson) => ({
        ...lesson,
        quiz: lesson.quiz.map(studentQuestion),
      })),
    })),
  };
}

/** Remove every paid resource and all quiz data from the public catalog. */
export function toPublicCourse(course: Course): Course {
  const safe = toStudentCourse(course);
  return {
    ...safe,
    sections: safe.sections.map((section) => ({
      ...section,
      lessons: section.lessons.map((lesson) => ({
        ...lesson,
        youtubeId: lesson.isPreview ? lesson.youtubeId : "",
        pdfUrl: null,
        pdfName: null,
        allowDownload: false,
        quiz: [],
      })),
    })),
  };
}
