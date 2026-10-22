import crownPrepImg from "@/assets/course-full-veneer-crown-prep.jpg";
import { freeSnippets } from "@/content/free-snippets";
import type { AppState, Course, Lesson, Section } from "./types";

const ORAL_PATHOLOGY_PREVIEW_ID = "18LzMsmxRMLavUvezyMRfyJNRFPspmHFV";
const DENTAL_ANATOMY_PREVIEW_ID = "1DsnnNtvcVYqch0AG7s0lJNm5oLmipbMz";
const PHARMACOLOGY_PREVIEW_ID = "1iwn_3-lJ5c8aRhYJdI1-y7ZbvXgWl0Jw";
const RADIOLOGY_PREVIEW_ID = "1L7BPD0R5u5JEXrpKA-5kjC7CxnIVscYN";

function previewLesson(id: string, title: string, description: string, videoId: string): Lesson {
  return {
    id,
    title,
    description,
    durationMin: 12,
    youtubeId: videoId,
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

function freeSnippetLessons(courseId: string): Lesson[] {
  return freeSnippets
    .filter((snippet) => snippet.courseId === courseId)
    .map((snippet) => ({
      id: `free-snippet-${snippet.id}`,
      title: snippet.title,
      description: snippet.description,
      durationMin: 5,
      youtubeId: snippet.driveFileId,
      pdfUrl: null,
      pdfName: null,
      allowDownload: false,
      isPreview: true,
      published: true,
      quiz: [],
    }));
}

function slideLesson({
  id,
  title,
  description,
  pdfUrl,
  pages,
  durationMin,
}: {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  pages: number;
  durationMin?: number;
}): Lesson {
  return {
    id,
    title,
    description,
    durationMin: durationMin ?? Math.max(20, pages * 2),
    youtubeId: "",
    pdfUrl,
    pdfName: `${title}.pdf`,
    allowDownload: false,
    isPreview: false,
    published: true,
    quiz: [],
  };
}

/** Safe placeholders used before live Supabase catalog records exist. */
const catalogCourses: Course[] = [
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
    thumbnail: "/denta-help-logo.png",
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
          ORAL_PATHOLOGY_PREVIEW_ID,
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
    thumbnail: "/denta-help-logo.png",
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
          DENTAL_ANATOMY_PREVIEW_ID,
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
    thumbnail: "/denta-help-logo.png",
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
          PHARMACOLOGY_PREVIEW_ID,
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
    thumbnail: "/denta-help-logo.png",
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
          RADIOLOGY_PREVIEW_ID,
        ),
      ),
    ],
  },
  {
    id: "course-fixed-prosthodontics",
    slug: "fixed-prosthodontics",
    title: "Fixed Prosthodontics",
    subject: "Fixed Prosthodontics",
    level: "Clinical dental students",
    summary:
      "Three focused crown-preparation guides organized into one practical fixed prosthodontics course.",
    description:
      "Build a repeatable crown-preparation workflow across full veneer, veneered, and all-ceramic restorations. Each lesson combines a concise visual guide with practical reduction, margin, clearance, and evaluation checks.",
    outcomes: [
      "Sequence common crown preparations confidently",
      "Relate reduction and finish-line design to restorative materials",
      "Evaluate clearance, retention, resistance, and ceramic-supporting form",
    ],
    price: 0,
    thumbnail: crownPrepImg,
    salesOpenAt: "2026-11-01T00:00:00.000Z",
    salesCloseAt: "2027-06-15T23:59:59.000Z",
    accessOpenAt: "2026-11-01T00:00:00.000Z",
    accessCloseAt: "2027-06-30T23:59:59.000Z",
    publishState: "published",
    sections: [
      {
        id: "section-fixed-prosthodontics-free-snippets",
        title: "Free Snippets",
        lessons: freeSnippetLessons("course-fixed-prosthodontics"),
      },
      {
        id: "section-fixed-prosthodontics-crown-preparation",
        title: "Crown Preparation",
        lessons: [
          slideLesson({
            id: "lesson-full-veneer-crown-prep",
            title: "Full Veneer Crown Prep",
            description:
              "Work through the complete 31-slide visual guide, then use the preparation checks as a practical revision framework.",
            pdfUrl: "/slides/full-veneer-crown-prep.pdf",
            pages: 31,
            durationMin: 35,
          }),
          slideLesson({
            id: "lesson-veneered-crown-prep",
            title: "Veneered Crown Prep",
            description:
              "Build a repeatable veneered-crown preparation workflow from depth orientation through axial reduction, finish-line refinement, and final quality checks.",
            pdfUrl: "/slides/veneered-crown-preparation.pdf",
            pages: 24,
          }),
          slideLesson({
            id: "lesson-all-ceramic-crown-prep",
            title: "All Ceramic Crown Prep",
            description:
              "Review material-aware reduction, rounded internal form, margin design, clearance, and the preparation features that support ceramic strength.",
            pdfUrl: "/slides/all-ceramic-crowns.pdf",
            pages: 19,
          }),
        ],
      },
    ],
  },
  {
    id: "course-operative",
    slug: "operative",
    title: "Operative",
    subject: "Operative Dentistry",
    level: "Clinical dental students",
    summary:
      "Four practical guides covering posterior, anterior, and cervical cavity preparation and restoration.",
    description:
      "Study the main operative cavity classes in a single structured course. Move from Class I and II preparation and restoration through Class III, IV, and V workflows with consistent clinical evaluation checks.",
    outcomes: [
      "Differentiate the preparation goals of Classes I through V",
      "Sequence posterior and anterior restorative procedures",
      "Evaluate cavity form, contacts, contour, finish, and function",
    ],
    price: 0,
    thumbnail: "/snippets/class-one-cavity.jpg",
    salesOpenAt: "2026-11-01T00:00:00.000Z",
    salesCloseAt: "2027-06-15T23:59:59.000Z",
    accessOpenAt: "2026-11-01T00:00:00.000Z",
    accessCloseAt: "2027-06-30T23:59:59.000Z",
    publishState: "published",
    sections: [
      {
        id: "section-operative-free-snippets",
        title: "Free Snippets",
        lessons: freeSnippetLessons("course-operative"),
      },
      {
        id: "section-operative-cavity-workflows",
        title: "Cavity Preparation and Restoration",
        lessons: [
          slideLesson({
            id: "lesson-class-i-ii-cavities",
            title: "Class I and II Cavities",
            description:
              "Review posterior cavity classification, outline form, caries access, resistance and retention concepts, proximal-box design, and final preparation checks.",
            pdfUrl: "/slides/class-i-ii-cavities.pdf",
            pages: 19,
          }),
          slideLesson({
            id: "lesson-class-i-ii-restoration",
            title: "Class I and II Restoration",
            description:
              "Organize the restorative phase from preparation review and isolation through material placement, proximal form, occlusal anatomy, finishing, and evaluation.",
            pdfUrl: "/slides/class-i-ii-restorations.pdf",
            pages: 21,
          }),
          slideLesson({
            id: "lesson-class-iii-v",
            title: "Class III and V",
            description:
              "Study conservative anterior and cervical access, outline, margin, and tissue-conscious preparation principles for Class III and V lesions.",
            pdfUrl: "/slides/class-iii-v-cavities.pdf",
            pages: 25,
          }),
          slideLesson({
            id: "lesson-class-iv",
            title: "Class IV",
            description:
              "Follow Class IV assessment, cavity design, restorative sequencing, contour, finishing, and final evaluation in a clear clinical workflow.",
            pdfUrl: "/slides/class-iv-cavity-restoration.pdf",
            pages: 21,
          }),
        ],
      },
    ],
  },
];

const implementedCourseIds = new Set(["course-fixed-prosthodontics", "course-operative"]);

export const retiredCourseIds = new Set([
  "course-full-veneer-crown-prep",
  "course-veneered-crown-prep",
  "course-all-ceramic-crowns",
  "course-class-iv-cavity-restoration",
  "course-class-i-ii-restorations",
  "course-class-i-ii-cavities",
  "course-class-iii-v-cavities",
]);

export const placeholderCourseIds = new Set([
  "course-oral-pathology",
  "course-dental-anatomy",
  "course-pharmacology",
  "course-radiology",
]);

/** The real PDF-backed catalogue. Placeholder/demo courses are intentionally excluded. */
export const starterCourses = catalogCourses.filter((course) =>
  implementedCourseIds.has(course.id),
);

/** Courses shipped with the application that remain visible until saved through the admin. */
export const bundledCatalogCourses = starterCourses;

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
