import anatomyImg from "@/assets/course-dental-anatomy.jpg";
import oralPathologyImg from "@/assets/course-oral-pathology.jpg";
import pharmacologyImg from "@/assets/course-pharmacology.jpg";
import radiologyImg from "@/assets/course-radiology.jpg";
import type { AppState, Course, Lesson, Section } from "./types";

const PREVIEW_VIDEO_ID = "M7lc1UVf-VE";

function previewLesson(id: string, title: string, description: string): Lesson {
  return {
    id,
    title,
    description,
    durationMin: 12,
    youtubeId: PREVIEW_VIDEO_ID,
    pdfUrl: null,
    pdfName: null,
    allowDownload: false,
    isPreview: true,
    published: true,
    quiz: [],
  };
}

function previewSection(id: string, lesson: Lesson): Section {
  return { id, title: "Course preview", lessons: [lesson] };
}

/** Safe placeholders used before live Supabase catalog records exist. */
export const starterCourses: Course[] = [
  {
    id: "course-oral-pathology",
    slug: "oral-pathology-essentials",
    title: "Oral Pathology Essentials",
    subject: "Oral Pathology",
    level: "3rd & 4th year dental students",
    summary:
      "A structured walk through oral pathology with focused lessons, worked cases, and knowledge checks.",
    description:
      "Supplementary academic support arranged around university teaching and exam reasoning. This is not an accredited continuing-education programme and no certificate is issued.",
    outcomes: [
      "Explain core mechanisms of oral disease",
      "Build structured differential diagnoses",
      "Approach case-based questions confidently",
    ],
    price: 1499,
    thumbnail: oralPathologyImg,
    salesOpenAt: "2026-07-01T00:00:00.000Z",
    salesCloseAt: "2027-01-15T23:59:59.000Z",
    accessOpenAt: "2026-07-15T00:00:00.000Z",
    accessCloseAt: "2027-01-31T23:59:59.000Z",
    publishState: "published",
    sections: [
      previewSection(
        "preview-oral-pathology",
        previewLesson(
          "preview-oral-pathology-lesson",
          "How to approach an oral pathology case",
          "A short preview of the course's structured clinical reasoning method.",
        ),
      ),
    ],
  },
  {
    id: "course-dental-anatomy",
    slug: "dental-anatomy-and-occlusion",
    title: "Dental Anatomy and Occlusion",
    subject: "Dental Anatomy",
    level: "1st & 2nd year dental students",
    summary:
      "Tooth morphology, arch relationships, and occlusion built around practical examination skills.",
    description:
      "A first-year friendly course covering tooth morphology and occlusion in the order practical exams test them.",
    outcomes: [
      "Identify permanent teeth from morphology",
      "Understand arch relationships",
      "Recognize common occlusal discrepancies",
    ],
    price: 1199,
    thumbnail: anatomyImg,
    salesOpenAt: "2026-11-01T00:00:00.000Z",
    salesCloseAt: "2027-03-15T23:59:59.000Z",
    accessOpenAt: "2026-11-10T00:00:00.000Z",
    accessCloseAt: "2027-06-30T23:59:59.000Z",
    publishState: "published",
    sections: [
      previewSection(
        "preview-dental-anatomy",
        previewLesson(
          "preview-dental-anatomy-lesson",
          "Reading tooth morphology",
          "See how the course breaks down practical tooth identification.",
        ),
      ),
    ],
  },
  {
    id: "course-pharmacology",
    slug: "dental-pharmacology",
    title: "Dental Pharmacology",
    subject: "Pharmacology",
    level: "3rd year dental students",
    summary:
      "Analgesics, antibiotics, and local anaesthetics for dentistry with clinically useful safety checks.",
    description:
      "A focused pharmacology course for dental students, linking core mechanisms with prescribing decisions.",
    outcomes: [
      "Choose analgesics safely",
      "Apply antibiotic prescribing principles",
      "Recognize important drug interactions",
    ],
    price: 999,
    thumbnail: pharmacologyImg,
    salesOpenAt: "2026-03-01T00:00:00.000Z",
    salesCloseAt: "2026-08-31T23:59:59.000Z",
    accessOpenAt: "2026-03-10T00:00:00.000Z",
    accessCloseAt: "2027-03-31T23:59:59.000Z",
    publishState: "published",
    sections: [
      previewSection(
        "preview-pharmacology",
        previewLesson(
          "preview-pharmacology-lesson",
          "Safe prescribing in dentistry",
          "A preview of the course's clinical prescribing framework.",
        ),
      ),
    ],
  },
  {
    id: "course-radiology",
    slug: "oral-radiology-basics",
    title: "Oral Radiology Basics",
    subject: "Oral Radiology",
    level: "2nd & 3rd year dental students",
    summary:
      "Radiographic technique, normal anatomy, and a systematic reading routine for dental imaging.",
    description:
      "A practical foundation in dental radiographic technique and systematic image interpretation.",
    outcomes: [
      "Apply intraoral imaging techniques",
      "Identify normal radiographic anatomy",
      "Read dental images systematically",
    ],
    price: 899,
    thumbnail: radiologyImg,
    salesOpenAt: "2025-10-01T00:00:00.000Z",
    salesCloseAt: "2026-04-30T23:59:59.000Z",
    accessOpenAt: "2025-10-10T00:00:00.000Z",
    accessCloseAt: "2026-06-30T23:59:59.000Z",
    publishState: "published",
    sections: [
      previewSection(
        "preview-radiology",
        previewLesson(
          "preview-radiology-lesson",
          "A systematic radiograph reading routine",
          "Preview the repeatable sequence used throughout the course.",
        ),
      ),
    ],
  },
];

export function buildCatalogState(): AppState {
  return {
    users: [],
    courses: structuredClone(starterCourses),
    enrollments: [],
    progress: [],
    attempts: [],
    bookmarks: [],
    payments: [],
    announcements: [],
    activity: {},
    readAnnouncements: {},
    sessionUserId: null,
  };
}
