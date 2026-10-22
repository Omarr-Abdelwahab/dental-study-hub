import { freeSnippets } from "@/content/free-snippets";
import type { AppState, Course, Lesson, QuizQuestion, Section } from "./types";

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
  quiz = [],
}: {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  pages: number;
  durationMin?: number;
  quiz?: QuizQuestion[];
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
    quiz,
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
    price: 1,
    thumbnail: "/course-thumbnails/fixed-prosthodontics.jpeg",
    salesOpenAt: "2026-10-01T00:00:00.000Z",
    salesCloseAt: "2027-06-15T23:59:59.000Z",
    accessOpenAt: "2026-10-01T00:00:00.000Z",
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
            quiz: [
              {
                id: "quiz-full-veneer-1",
                text: "What is the correct amount of reduction on the occlusal surface for lower 6?",
                choices: [
                  "3 mm buccal and 2 mm lingual",
                  "2 mm buccal and 1 mm lingual",
                  "1 mm buccal and 2 mm lingual",
                ],
                correctIndex: 1,
                explanation:
                  "The correct reduction is 2 mm on the buccal functional cusp and 1 mm on the lingual cusp.",
              },
              {
                id: "quiz-full-veneer-2",
                text: "Which cusps are the functional cusps of the upper first molar?",
                choices: ["Buccal cusps", "Palatal cusps"],
                correctIndex: 1,
                explanation: "The palatal cusps are the functional cusps of maxillary molars.",
              },
              {
                id: "quiz-full-veneer-3",
                text: "How should the contra-angle be moved during axial preparation?",
                choices: ["At 45 degrees", "Parallel to the long axis of the tooth"],
                correctIndex: 1,
                explanation:
                  "Keeping the contra-angle parallel to the tooth's long axis guides the axial preparation.",
              },
              {
                id: "quiz-full-veneer-4",
                text: "Where is the secondary plane located?",
                choices: [
                  "Middle third of the buccal surface",
                  "Occlusal third of the lingual surface",
                  "Occlusal third of the buccal surface",
                ],
                correctIndex: 2,
                explanation:
                  "The secondary plane is located on the occlusal third of the buccal surface.",
              },
            ],
          }),
          slideLesson({
            id: "lesson-veneered-crown-prep",
            title: "Veneered Crown Prep",
            description:
              "Build a repeatable veneered-crown preparation workflow from depth orientation through axial reduction, finish-line refinement, and final quality checks.",
            pdfUrl: "/slides/veneered-crown-preparation.pdf",
            pages: 24,
            quiz: [
              {
                id: "quiz-veneered-crown-1",
                text: "Where is the extra layer of porcelain placed?",
                choices: ["Buccal surface", "Palatal surface"],
                correctIndex: 0,
                explanation:
                  "The extra porcelain layer is placed on the buccal surface for the veneered restoration.",
              },
              {
                id: "quiz-veneered-crown-2",
                text: "Which stone is used to open the contact?",
                choices: ["Tapered with a round end", "Football or flame", "Needle"],
                correctIndex: 2,
                explanation: "A needle stone is used to open the proximal contact.",
              },
              {
                id: "quiz-veneered-crown-3",
                text: "What is the correct amount of reduction on the buccal surface?",
                choices: ["1.5 mm", "0.5 mm", "3 mm"],
                correctIndex: 0,
                explanation: "The keyed buccal reduction is 1.5 mm.",
              },
              {
                id: "quiz-veneered-crown-4",
                text: "What is the correct amount of reduction on the palatal surface?",
                choices: ["1.5 mm", "0.5 mm", "3 mm"],
                correctIndex: 1,
                explanation: "The keyed palatal reduction is 0.5 mm.",
              },
            ],
          }),
          slideLesson({
            id: "lesson-all-ceramic-crown-prep",
            title: "All Ceramic Crown Prep",
            description:
              "Review material-aware reduction, rounded internal form, margin design, clearance, and the preparation features that support ceramic strength.",
            pdfUrl: "/slides/all-ceramic-crowns.pdf",
            pages: 19,
            quiz: [
              {
                id: "quiz-all-ceramic-1",
                text: "What is the correct amount of reduction on the incisal edge?",
                choices: ["1 mm", "2 mm", "3 mm"],
                correctIndex: 1,
                explanation: "The keyed incisal-edge reduction is 2 mm.",
              },
              {
                id: "quiz-all-ceramic-2",
                text: "What is the correct amount of reduction on the palatal fossa?",
                choices: ["1 mm", "2 mm", "3 mm"],
                correctIndex: 0,
                explanation: "The keyed palatal-fossa reduction is 1 mm.",
              },
              {
                id: "quiz-all-ceramic-3",
                text: "Where is the secondary plane prepared?",
                choices: ["Cervical third", "Middle third", "Incisal third"],
                correctIndex: 2,
                explanation: "The secondary plane is prepared on the incisal third.",
              },
              {
                id: "quiz-all-ceramic-4",
                text: "Which stone is used to reduce the lingual fossa?",
                choices: ["Tapered with a round end", "Football or flame", "Wheel"],
                correctIndex: 1,
                explanation: "A football or flame stone follows the contour of the lingual fossa.",
              },
            ],
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
    price: 1,
    thumbnail: "/course-thumbnails/operative.jpeg",
    salesOpenAt: "2026-10-01T00:00:00.000Z",
    salesCloseAt: "2027-06-15T23:59:59.000Z",
    accessOpenAt: "2026-10-01T00:00:00.000Z",
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
            quiz: [
              {
                id: "quiz-class-i-ii-cavities-1",
                text: "What is the correct measurement of the gingival seat width?",
                choices: ["1.5–2 mm", "2.5–3 mm", "1–1.5 mm"],
                correctIndex: 0,
                explanation: "The keyed gingival-seat width is 1.5–2 mm.",
              },
              {
                id: "quiz-class-i-ii-cavities-2",
                text: "What is the correct depth of the proximal box in a Class II cavity?",
                choices: ["2 mm", "1.5 mm", "3 mm"],
                correctIndex: 2,
                explanation: "The keyed proximal-box depth is 3 mm.",
              },
              {
                id: "quiz-class-i-ii-cavities-3",
                text: "What is the correct depth of a Class I cavity?",
                choices: ["0.5 mm", "1 mm", "1.5 mm"],
                correctIndex: 2,
                explanation: "The keyed Class I cavity depth is 1.5 mm.",
              },
              {
                id: "quiz-class-i-ii-cavities-4",
                text: "Which instrument is used to check whether the contact has been opened?",
                choices: ["Ball burnisher", "Sharp explorer", "Double flat"],
                correctIndex: 1,
                explanation: "A sharp explorer is used to check that the contact has been opened.",
              },
            ],
          }),
          slideLesson({
            id: "lesson-class-i-ii-restoration",
            title: "Class I and II Restoration",
            description:
              "Organize the restorative phase from preparation review and isolation through material placement, proximal form, occlusal anatomy, finishing, and evaluation.",
            pdfUrl: "/slides/class-i-ii-restorations.pdf",
            pages: 21,
            quiz: [
              {
                id: "quiz-class-i-ii-restoration-1",
                text: "Which instrument is used to condense composite into the base of the cavity?",
                choices: ["Sharp explorer", "Periodontal probe", "Ball burnisher"],
                correctIndex: 2,
                explanation: "A ball burnisher is used to adapt and condense the composite.",
              },
              {
                id: "quiz-class-i-ii-restoration-2",
                text: "How is composite cured?",
                choices: ["High temperature", "Light curing", "Exposure to air"],
                correctIndex: 1,
                explanation: "Dental composite is polymerized using a curing light.",
              },
              {
                id: "quiz-class-i-ii-restoration-3",
                text: "Why should the marginal ridge be properly restored?",
                choices: [
                  "To improve esthetics and increase occlusal clearance",
                  "To achieve proper proximal contact and prevent food impaction",
                  "To reduce tooth sensitivity and improve retention",
                ],
                correctIndex: 1,
                explanation:
                  "A properly restored marginal ridge supports proximal contact and helps prevent food impaction.",
              },
              {
                id: "quiz-class-i-ii-restoration-4",
                text: "Why should composite be placed in increments in Class I and Class II restorations?",
                choices: [
                  "To reduce polymerization shrinkage stress",
                  "To increase cavity depth",
                  "To improve bonding to enamel only",
                ],
                correctIndex: 0,
                explanation: "Incremental placement helps reduce polymerization shrinkage stress.",
              },
            ],
          }),
          slideLesson({
            id: "lesson-class-iii-v",
            title: "Class III and V",
            description:
              "Study conservative anterior and cervical access, outline, margin, and tissue-conscious preparation principles for Class III and V lesions.",
            pdfUrl: "/slides/class-iii-v-cavities.pdf",
            pages: 25,
            quiz: [
              {
                id: "quiz-class-iii-v-1",
                text: "Where is the correct position of a Class V cavity?",
                choices: ["Occlusal or incisal third", "Middle third", "Cervical third"],
                correctIndex: 2,
                explanation: "Class V cavities are located in the cervical third of the tooth.",
              },
              {
                id: "quiz-class-iii-v-2",
                text: "What is the correct location of a Class III cavity?",
                choices: ["Proximal and buccal", "Proximal and palatal", "Incisal"],
                correctIndex: 1,
                explanation:
                  "The keyed answer is the proximal and palatal location, without involving the incisal angle.",
              },
              {
                id: "quiz-class-iii-v-3",
                text: "Class III and Class V cavities are usually found in patients with:",
                choices: ["Bad oral hygiene", "Low caries index", "Good oral hygiene"],
                correctIndex: 0,
                explanation:
                  "Poor oral hygiene increases plaque retention and the risk of these carious lesions.",
              },
              {
                id: "quiz-class-iii-v-4",
                text: "What is the correct depth of Class III and Class V cavities?",
                choices: ["1 mm", "1.5 mm", "3 mm"],
                correctIndex: 1,
                explanation: "The keyed preparation depth is 1.5 mm.",
              },
            ],
          }),
          slideLesson({
            id: "lesson-class-iv",
            title: "Class IV",
            description:
              "Follow Class IV assessment, cavity design, restorative sequencing, contour, finishing, and final evaluation in a clear clinical workflow.",
            pdfUrl: "/slides/class-iv-cavity-restoration.pdf",
            pages: 21,
            quiz: [
              {
                id: "quiz-class-iv-1",
                text: "What is the purpose of the index?",
                choices: [
                  "Build the buccal shell",
                  "Build the proximal wall",
                  "Build the palatal shell",
                ],
                correctIndex: 2,
                explanation: "The index is used to establish the palatal shell first.",
              },
              {
                id: "quiz-class-iv-2",
                text: "Finishing and polishing should be done with:",
                choices: ["Water", "Air", "A dry cotton roll"],
                correctIndex: 0,
                explanation: "Finishing and polishing should be performed with water cooling.",
              },
              {
                id: "quiz-class-iv-3",
                text: "The dentin shade of composite is:",
                choices: ["Transparent", "Translucent", "Opaque"],
                correctIndex: 2,
                explanation:
                  "Dentin composite is comparatively opaque to reproduce natural dentin.",
              },
              {
                id: "quiz-class-iv-4",
                text: "The enamel shade of composite is:",
                choices: ["Transparent", "Translucent", "Opaque"],
                correctIndex: 1,
                explanation: "Enamel composite is translucent to reproduce natural enamel.",
              },
            ],
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
