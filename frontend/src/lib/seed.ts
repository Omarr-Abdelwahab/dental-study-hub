import crownPrepImg from "@/assets/course-full-veneer-crown-prep.jpg";
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

function slideCourse({
  id,
  slug,
  title,
  subject,
  summary,
  description,
  outcomes,
  thumbnail,
  pdfUrl,
  pages,
}: {
  id: string;
  slug: string;
  title: string;
  subject: string;
  summary: string;
  description: string;
  outcomes: string[];
  thumbnail: string;
  pdfUrl: string;
  pages: number;
}): Course {
  return {
    id,
    slug,
    title,
    subject,
    level: "Clinical dental students",
    summary,
    description,
    outcomes,
    price: 0,
    thumbnail,
    salesOpenAt: "2026-11-01T00:00:00.000Z",
    salesCloseAt: "2027-06-15T23:59:59.000Z",
    accessOpenAt: "2026-11-01T00:00:00.000Z",
    accessCloseAt: "2027-06-30T23:59:59.000Z",
    publishState: "published",
    sections: [
      {
        id: `${id}-section`,
        title,
        lessons: [
          {
            id: `${id}-slides`,
            title: `${title}: Clinical Slide Guide`,
            description: `Work through the complete ${pages}-slide guide and use it as a structured practical-revision resource.`,
            durationMin: Math.max(20, pages * 2),
            youtubeId: "",
            pdfUrl,
            pdfName: `${title}.pdf`,
            allowDownload: false,
            isPreview: true,
            published: true,
            quiz: [],
          },
        ],
      },
    ],
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
    id: "course-full-veneer-crown-prep",
    slug: "full-veneer-crown-preparation",
    title: "Full Veneer Crown Preparation",
    subject: "Fixed Prosthodontics",
    level: "Clinical dental students",
    summary:
      "A focused visual guide to planning, performing, and evaluating a full veneer crown preparation.",
    description:
      "A slide-based restorative dentistry course that organizes full veneer crown preparation into a clear clinical workflow. Review reduction, finish-line design, resistance and retention principles, and the checks used to assess a completed preparation.",
    outcomes: [
      "Follow a structured full veneer crown-preparation sequence",
      "Recognize reduction and finish-line requirements",
      "Evaluate clearance, smoothness, retention, and resistance form",
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
        id: "section-full-veneer-crown-prep",
        title: "Full Veneer Crown Preparation",
        lessons: [
          {
            id: "lesson-full-veneer-crown-prep-slides",
            title: "Clinical Crown-Preparation Guide",
            description:
              "Work through the complete 31-slide visual guide, then use the preparation checks as a practical revision framework.",
            durationMin: 35,
            youtubeId: "",
            pdfUrl: "/slides/full-veneer-crown-prep.pdf",
            pdfName: "Full Veneer Crown Preparation.pdf",
            allowDownload: false,
            isPreview: true,
            published: true,
            quiz: [],
          },
        ],
      },
    ],
  },
  slideCourse({
    id: "course-veneered-crown-prep",
    slug: "veneered-crown-preparation",
    title: "Veneered Crown Preparation",
    subject: "Fixed Prosthodontics",
    summary:
      "A visual clinical guide to preparing teeth for veneered crowns with controlled reduction and finish-line design.",
    description:
      "Build a repeatable veneered-crown preparation workflow, from initial planning and depth orientation through axial reduction, finish-line refinement, and final quality checks.",
    outcomes: [
      "Sequence a veneered-crown preparation logically",
      "Relate reduction requirements to restorative materials",
      "Evaluate finish lines, clearance, and preparation form",
    ],
    thumbnail: "/snippets/molar-pre-reduction.jpg",
    pdfUrl: "/slides/veneered-crown-preparation.pdf",
    pages: 24,
  }),
  slideCourse({
    id: "course-all-ceramic-crowns",
    slug: "all-ceramic-crown-preparation",
    title: "All-Ceramic Crown Preparation",
    subject: "Fixed Prosthodontics",
    summary:
      "Preparation principles for predictable all-ceramic crowns, presented as a concise visual clinical workflow.",
    description:
      "Review the preparation features that support an all-ceramic restoration, including material-aware reduction, rounded internal form, margin design, clearance, and final assessment.",
    outcomes: [
      "Plan reduction for an all-ceramic restoration",
      "Select and refine an appropriate margin design",
      "Recognize preparation features that support ceramic strength",
    ],
    thumbnail: "/snippets/full-ceramic.jpg",
    pdfUrl: "/slides/all-ceramic-crowns.pdf",
    pages: 19,
  }),
  slideCourse({
    id: "course-class-iv-cavity-restoration",
    slug: "class-iv-cavity-preparation-restoration",
    title: "Class IV Cavity Preparation and Restoration",
    subject: "Operative Dentistry",
    summary:
      "A step-by-step guide to Class IV cavity preparation, restorative planning, and anterior form recovery.",
    description:
      "Follow a structured approach to Class IV cases, covering assessment, cavity design, restorative sequencing, contour, finishing, and the checks used to evaluate the final result.",
    outcomes: [
      "Plan a conservative Class IV cavity preparation",
      "Sequence the restorative procedure clearly",
      "Evaluate anterior contour, finish, and functional form",
    ],
    thumbnail: "/snippets/class-one-cavity.jpg",
    pdfUrl: "/slides/class-iv-cavity-restoration.pdf",
    pages: 21,
  }),
  slideCourse({
    id: "course-class-i-ii-restorations",
    slug: "class-i-ii-restorations",
    title: "Class I and II Restorations",
    subject: "Operative Dentistry",
    summary:
      "A practical visual guide to restoring posterior Class I and II cavities with controlled anatomy and contacts.",
    description:
      "Organize the restorative phase for Class I and II cases, from preparation review and isolation through material placement, proximal form, occlusal anatomy, finishing, and evaluation.",
    outcomes: [
      "Sequence Class I and II restorative procedures",
      "Re-establish proximal contact and occlusal anatomy",
      "Apply finishing and evaluation checks systematically",
    ],
    thumbnail: "/snippets/class-one-cavity.jpg",
    pdfUrl: "/slides/class-i-ii-restorations.pdf",
    pages: 21,
  }),
  slideCourse({
    id: "course-class-i-ii-cavities",
    slug: "class-i-ii-cavity-preparation",
    title: "Class I and II Cavity Preparation",
    subject: "Operative Dentistry",
    summary:
      "Core principles and practical steps for conservative Class I and II cavity preparation.",
    description:
      "Review posterior cavity classification, outline form, caries access, resistance and retention concepts, proximal-box design, and the final checks for a clean preparation.",
    outcomes: [
      "Differentiate Class I and Class II cavity designs",
      "Apply conservative preparation principles",
      "Assess outline, depth, walls, and proximal clearance",
    ],
    thumbnail: "/snippets/class-one-cavity.jpg",
    pdfUrl: "/slides/class-i-ii-cavities.pdf",
    pages: 19,
  }),
  slideCourse({
    id: "course-class-iii-v-cavities",
    slug: "class-iii-v-cavity-preparation",
    title: "Class III and V Cavity Preparation",
    subject: "Operative Dentistry",
    summary:
      "A visual guide to conservative anterior and cervical cavity preparations for Class III and V lesions.",
    description:
      "Study access, outline, margin, and tissue-conscious preparation principles for Class III and V cavities, with a practical framework for final preparation evaluation.",
    outcomes: [
      "Differentiate Class III and Class V preparation goals",
      "Plan conservative access and margin placement",
      "Evaluate preparation form while preserving tooth structure",
    ],
    thumbnail: "/snippets/premolar-index.jpg",
    pdfUrl: "/slides/class-iii-v-cavities.pdf",
    pages: 25,
  }),
];

const implementedCourseIds = new Set([
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
