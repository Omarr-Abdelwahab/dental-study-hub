import oralPathologyImg from "@/assets/course-oral-pathology.jpg";
import anatomyImg from "@/assets/course-dental-anatomy.jpg";
import pharmacologyImg from "@/assets/course-pharmacology.jpg";
import radiologyImg from "@/assets/course-radiology.jpg";
import type { AppState, Course, Lesson, QuizQuestion, Section, User } from "./types";
import { toDateKey } from "./format";

const PDF = "/slides/lesson-slides.pdf";
const YT = ["M7lc1UVf-VE", "aqz-KE-bpKQ", "ScMzIvxBSi4", "5qap5aO4i9A"] as const;

function q(
  id: string,
  text: string,
  choices: string[],
  correctIndex: number,
  explanation: string,
): QuizQuestion {
  return { id, text, choices, correctIndex, explanation };
}

function lesson(partial: Partial<Lesson> & { id: string; title: string }): Lesson {
  return {
    description: "",
    durationMin: 18,
    youtubeId: YT[0],
    pdfUrl: PDF,
    pdfName: "lesson-slides.pdf",
    allowDownload: false,
    isPreview: false,
    published: true,
    quiz: [],
    ...partial,
  };
}

function genericQuiz(prefix: string, topic: string): QuizQuestion[] {
  return [
    q(
      `${prefix}-q1`,
      `Which statement best describes the core idea of ${topic}?`,
      [
        "It is a purely theoretical concept with no clinical use",
        `It explains the mechanism clinicians use when reasoning about ${topic}`,
        "It only applies to laboratory animals",
        "It was disproven by recent literature",
      ],
      1,
      `${topic} is taught because it directly supports clinical reasoning at the chair side.`,
    ),
    q(
      `${prefix}-q2`,
      `In an exam question about ${topic}, which detail is usually the deciding clue?`,
      [
        "The patient's favourite toothpaste",
        "The clinical presentation combined with the site of the lesion",
        "The colour of the dental chair",
        "The time of day of the appointment",
      ],
      1,
      "Site plus presentation is the classic pairing examiners use to separate similar answers.",
    ),
    q(
      `${prefix}-q3`,
      `What is the best revision strategy for ${topic}?`,
      [
        "Memorise slide titles only",
        "Skip the quiz and re-watch the video twice",
        "Work through cases and explain the reasoning out loud",
        "Read the textbook index",
      ],
      2,
      "Active recall through cases retains far better than passive re-watching.",
    ),
  ];
}

const oralPathologySections: Section[] = [
  {
    id: "sec-op-1",
    title: "Foundations",
    lessons: [
      lesson({
        id: "les-op-1",
        title: "Cell Injury and Adaptation",
        description:
          "How cells respond to stress: reversible injury, irreversible injury, and the four adaptive patterns you are expected to recognise in oral tissues.",
        durationMin: 22,
        youtubeId: YT[0],
        isPreview: true,
        allowDownload: true,
        quiz: [
          q(
            "les-op-1-q1",
            "Which change is a reversible response to cell injury?",
            ["Karyorrhexis", "Cellular swelling", "Karyolysis", "Coagulative necrosis"],
            1,
            "Cellular (hydropic) swelling follows failure of the sodium pump and reverses once the insult is removed.",
          ),
          q(
            "les-op-1-q2",
            "Replacement of one differentiated cell type by another is called:",
            ["Hyperplasia", "Hypertrophy", "Metaplasia", "Atrophy"],
            2,
            "Metaplasia is an adaptive substitution of one mature cell type for another, often in response to chronic irritation.",
          ),
          q(
            "les-op-1-q3",
            "Apoptosis differs from necrosis mainly because it is:",
            [
              "Always pathological",
              "Energy-dependent and does not provoke inflammation",
              "Accompanied by massive neutrophil influx",
              "Limited to epithelial cells",
            ],
            1,
            "Apoptosis is an ATP-dependent, programmed process; membranes stay intact so inflammation is not triggered.",
          ),
        ],
      }),
      lesson({
        id: "les-op-2",
        title: "Inflammation and Repair",
        description:
          "Acute and chronic inflammation in the oral cavity, the cells involved, and how healing by primary versus secondary intention affects clinical outcomes.",
        durationMin: 26,
        youtubeId: YT[1],
        quiz: [
          q(
            "les-op-2-q1",
            "The predominant cell in the first 24 hours of acute inflammation is the:",
            ["Lymphocyte", "Neutrophil", "Plasma cell", "Fibroblast"],
            1,
            "Neutrophils arrive first, peaking within the first day before macrophages take over.",
          ),
          q(
            "les-op-2-q2",
            "Granulation tissue is characterised by:",
            [
              "Granulomas with giant cells",
              "New capillaries and fibroblasts",
              "Dense mature collagen only",
              "Keratin pearls",
            ],
            1,
            "Granulation tissue is angiogenesis plus fibroblast proliferation — do not confuse it with granulomatous inflammation.",
          ),
          q(
            "les-op-2-q3",
            "A chronic inflammatory infiltrate typically contains:",
            [
              "Neutrophils and eosinophils only",
              "Lymphocytes, plasma cells and macrophages",
              "Erythrocytes only",
              "Osteoclasts only",
            ],
            1,
            "Mononuclear cells define chronicity in histopathology reports.",
          ),
        ],
      }),
    ],
  },
  {
    id: "sec-op-2",
    title: "Oral Lesions",
    lessons: [
      lesson({
        id: "les-op-3",
        title: "White Oral Lesions",
        description:
          "Leukoplakia, lichen planus, frictional keratosis and candidiasis — how to separate them clinically and which ones need a biopsy.",
        durationMin: 24,
        youtubeId: YT[2],
        allowDownload: true,
        quiz: [
          q(
            "les-op-3-q1",
            "A white patch that wipes off with gauze most likely represents:",
            ["Leukoplakia", "Pseudomembranous candidiasis", "Lichen planus", "Leukoedema"],
            1,
            "Only the pseudomembranous form of candidiasis rubs away, leaving an erythematous base.",
          ),
          q(
            "les-op-3-q2",
            "Leukoplakia is best defined as:",
            [
              "Any white patch in the mouth",
              "A white patch that cannot be attributed to another condition",
              "A white patch caused by trauma",
              "A fungal white patch",
            ],
            1,
            "It is a clinical diagnosis of exclusion and carries malignant potential.",
          ),
          q(
            "les-op-3-q3",
            "Wickham striae are typical of:",
            ["Oral lichen planus", "Nicotinic stomatitis", "White sponge naevus", "Candidiasis"],
            0,
            "Fine lace-like white lines on the buccal mucosa are the classic sign of lichen planus.",
          ),
        ],
      }),
      lesson({
        id: "les-op-4",
        title: "Red and Pigmented Lesions",
        description:
          "Erythroplakia, vascular lesions, amalgam tattoo and melanotic macules, with the red flags that require urgent referral.",
        durationMin: 21,
        youtubeId: YT[3],
        quiz: [
          q(
            "les-op-4-q1",
            "Compared with leukoplakia, erythroplakia has:",
            [
              "Lower malignant potential",
              "Equal malignant potential",
              "Higher malignant potential",
              "No malignant potential",
            ],
            2,
            "Erythroplakia shows dysplasia or carcinoma far more often than leukoplakia.",
          ),
          q(
            "les-op-4-q2",
            "A blue-grey macule adjacent to a restored tooth is most likely:",
            ["Melanoma", "Amalgam tattoo", "Haemangioma", "Blue naevus"],
            1,
            "Amalgam particles embedded in mucosa give a stable, asymptomatic grey macule, often radiopaque.",
          ),
          q(
            "les-op-4-q3",
            "Which finding most urgently warrants referral?",
            [
              "A symmetrical brown macule present since childhood",
              "A blanching red lesion on the lip",
              "A non-healing red lesion on the floor of the mouth for six weeks",
              "Generalised gingival erythema after poor brushing",
            ],
            2,
            "The floor of the mouth is high-risk; a persistent red lesion there needs biopsy.",
          ),
        ],
      }),
    ],
  },
  {
    id: "sec-op-3",
    title: "Clinical Revision",
    lessons: [
      lesson({
        id: "les-op-5",
        title: "Case-Based Diagnosis",
        description:
          "Six worked cases taken through history, examination, differential diagnosis and investigation, in the same order examiners expect.",
        durationMin: 28,
        youtubeId: YT[0],
        pdfUrl: PDF,
        quiz: genericQuiz("les-op-5", "case-based oral diagnosis"),
      }),
      lesson({
        id: "les-op-6",
        title: "Final Subject Revision",
        description:
          "A rapid pass over the whole subject with high-yield tables and the mistakes that lose marks most often.",
        durationMin: 19,
        youtubeId: YT[1],
        pdfUrl: null,
        pdfName: null,
        quiz: genericQuiz("les-op-6", "oral pathology revision"),
      }),
    ],
  },
];

function simpleSections(prefix: string, titles: [string, string[]][]): Section[] {
  return titles.map(([sectionTitle, lessonTitles], si) => ({
    id: `sec-${prefix}-${si + 1}`,
    title: sectionTitle,
    lessons: lessonTitles.map((title, li) =>
      lesson({
        id: `les-${prefix}-${si + 1}-${li + 1}`,
        title,
        description: `${title} — structured walkthrough with slides and a short mandatory quiz.`,
        durationMin: 16 + li * 5,
        youtubeId: YT[(si + li) % YT.length] ?? YT[0],
        isPreview: si === 0 && li === 0,
        quiz: genericQuiz(`les-${prefix}-${si + 1}-${li + 1}`, title.toLowerCase()),
      }),
    ),
  }));
}

const courses: Course[] = [
  {
    id: "course-oral-pathology",
    slug: "oral-pathology-essentials",
    title: "Oral Pathology Essentials",
    subject: "Oral Pathology",
    level: "3rd & 4th year dental students",
    summary:
      "A structured walk through the oral pathology syllabus with slides, worked cases and a mandatory quiz after every lesson.",
    description:
      "Oral Pathology Essentials follows the way the subject is actually taught and examined at university. Each lesson pairs a focused video with a slide deck and a short mandatory quiz, so you can check that you really understood the mechanism before moving on. The course is supplementary academic support for your college subject — it is not an accredited continuing-education programme and no certificate is issued.",
    outcomes: [
      "Describe reversible and irreversible cell injury and the four adaptive responses",
      "Separate acute from chronic inflammation on histology and clinically",
      "Build a differential diagnosis for white, red and pigmented oral lesions",
      "Decide which lesions need a biopsy and which can be observed",
      "Answer case-based exam questions in a structured order",
    ],
    price: 1499,
    thumbnail: oralPathologyImg,
    salesOpenAt: "2026-07-01T00:00:00.000Z",
    salesCloseAt: "2027-01-15T23:59:59.000Z",
    accessOpenAt: "2026-07-15T00:00:00.000Z",
    accessCloseAt: "2027-01-31T23:59:59.000Z",
    publishState: "published",
    sections: oralPathologySections,
  },
  {
    id: "course-dental-anatomy",
    slug: "dental-anatomy-and-occlusion",
    title: "Dental Anatomy and Occlusion",
    subject: "Dental Anatomy",
    level: "1st & 2nd year dental students",
    summary:
      "Tooth morphology, arch relationships and occlusion, built around the drawings and models used in practical exams.",
    description:
      "A first-year friendly course covering tooth morphology and occlusion in the order practical exams test them. Sales open later this term; the curriculum below is final.",
    outcomes: [
      "Identify every permanent tooth from its morphology",
      "Draw the standard views expected in practical exams",
      "Explain centric relation and centric occlusion",
      "Recognise common occlusal discrepancies",
    ],
    price: 1199,
    thumbnail: anatomyImg,
    salesOpenAt: "2026-11-01T00:00:00.000Z",
    salesCloseAt: "2027-03-15T23:59:59.000Z",
    accessOpenAt: "2026-11-10T00:00:00.000Z",
    accessCloseAt: "2027-06-30T23:59:59.000Z",
    publishState: "published",
    sections: simpleSections("da", [
      ["Tooth Morphology", ["Anterior Teeth", "Posterior Teeth"]],
      ["Occlusion", ["Centric Relation and Occlusion", "Occlusal Discrepancies"]],
    ]),
  },
  {
    id: "course-pharmacology",
    slug: "dental-pharmacology",
    title: "Dental Pharmacology",
    subject: "Pharmacology",
    level: "3rd year dental students",
    summary:
      "Analgesics, antibiotics and local anaesthetics for dentistry, with dosing tables and interaction traps.",
    description:
      "Enrollment for this term has closed. Students who bought the course keep access until the access closing date shown below.",
    outcomes: [
      "Choose analgesics safely for dental pain",
      "Apply antibiotic prescribing principles in dentistry",
      "Compare local anaesthetic agents and their limits",
      "Spot the interactions that matter in dental practice",
    ],
    price: 999,
    thumbnail: pharmacologyImg,
    salesOpenAt: "2026-03-01T00:00:00.000Z",
    salesCloseAt: "2026-08-31T23:59:59.000Z",
    accessOpenAt: "2026-03-10T00:00:00.000Z",
    accessCloseAt: "2027-03-31T23:59:59.000Z",
    publishState: "published",
    sections: simpleSections("ph", [
      ["Pain Control", ["Analgesics in Dentistry", "Local Anaesthetics"]],
      ["Infection", ["Antibiotic Principles", "Prescribing Traps"]],
    ]),
  },
  {
    id: "course-radiology",
    slug: "oral-radiology-basics",
    title: "Oral Radiology Basics",
    subject: "Oral Radiology",
    level: "2nd & 3rd year dental students",
    summary:
      "Radiographic technique, normal anatomy on film, and a systematic reading routine for periapicals and panoramics.",
    description:
      "Access for this course ended. Your progress and quiz results stay visible in your dashboard for revision reference.",
    outcomes: [
      "Apply paralleling and bisecting techniques correctly",
      "Identify normal radiographic anatomy",
      "Read a panoramic radiograph systematically",
    ],
    price: 899,
    thumbnail: radiologyImg,
    salesOpenAt: "2025-10-01T00:00:00.000Z",
    salesCloseAt: "2026-04-30T23:59:59.000Z",
    accessOpenAt: "2025-10-10T00:00:00.000Z",
    accessCloseAt: "2026-06-30T23:59:59.000Z",
    publishState: "published",
    sections: simpleSections("rad", [
      ["Technique", ["Intraoral Techniques", "Panoramic Imaging"]],
      ["Interpretation", ["Normal Radiographic Anatomy", "A Systematic Reading Routine"]],
    ]),
  },
];

const users: User[] = [
  {
    id: "user-student",
    name: "Mariam Adel",
    email: "student@demo.com",
    password: "demo1234",
    phone: "+20 100 123 4567",
    university: "Cairo University",
    academicYear: "3rd year",
    role: "student",
    createdAt: "2026-07-20T09:00:00.000Z",
  },
  {
    id: "user-admin",
    name: "Admin",
    email: "admin@demo.com",
    password: "demo1234",
    phone: "+20 100 765 4321",
    university: "Cairo University",
    academicYear: "Faculty",
    role: "admin",
    createdAt: "2026-06-01T09:00:00.000Z",
  },
  {
    id: "user-2",
    name: "Youssef Kamal",
    email: "youssef@demo.com",
    password: "demo1234",
    phone: "+20 101 222 3344",
    university: "Ain Shams University",
    academicYear: "4th year",
    role: "student",
    createdAt: "2026-07-28T09:00:00.000Z",
  },
  {
    id: "user-3",
    name: "Nour Ibrahim",
    email: "nour@demo.com",
    password: "demo1234",
    phone: "+20 102 555 8899",
    university: "Alexandria University",
    academicYear: "3rd year",
    role: "student",
    createdAt: "2026-08-02T09:00:00.000Z",
  },
  {
    id: "user-4",
    name: "Hana Mostafa",
    email: "hana@demo.com",
    password: "demo1234",
    phone: "+20 103 444 1122",
    university: "Mansoura University",
    academicYear: "2nd year",
    role: "student",
    createdAt: "2026-08-11T09:00:00.000Z",
  },
];

function daysAgoIso(days: number, hour = 18) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

export function buildSeedState(): AppState {
  const streakDays = Array.from({ length: 6 }, (_, i) =>
    toDateKey(new Date(Date.now() - i * 86_400_000)),
  );

  return {
    users,
    courses,
    enrollments: [
      {
        id: "enr-1",
        userId: "user-student",
        courseId: "course-oral-pathology",
        enrolledAt: "2026-08-05T10:12:00.000Z",
        source: "purchase",
      },
      {
        id: "enr-2",
        userId: "user-student",
        courseId: "course-radiology",
        enrolledAt: "2025-11-14T10:12:00.000Z",
        source: "purchase",
      },
      {
        id: "enr-3",
        userId: "user-2",
        courseId: "course-oral-pathology",
        enrolledAt: "2026-08-08T14:22:00.000Z",
        source: "purchase",
      },
      {
        id: "enr-4",
        userId: "user-3",
        courseId: "course-oral-pathology",
        enrolledAt: "2026-08-19T08:31:00.000Z",
        source: "purchase",
      },
      {
        id: "enr-5",
        userId: "user-4",
        courseId: "course-pharmacology",
        enrolledAt: "2026-08-21T19:05:00.000Z",
        source: "purchase",
      },
    ],
    progress: [
      {
        userId: "user-student",
        courseId: "course-oral-pathology",
        lessonId: "les-op-1",
        lastPositionSec: 1320,
        watchedSec: 1320,
        percent: 100,
        completed: true,
        updatedAt: daysAgoIso(5),
      },
      {
        userId: "user-student",
        courseId: "course-oral-pathology",
        lessonId: "les-op-2",
        lastPositionSec: 1560,
        watchedSec: 1560,
        percent: 100,
        completed: true,
        updatedAt: daysAgoIso(3),
      },
      {
        userId: "user-student",
        courseId: "course-oral-pathology",
        lessonId: "les-op-3",
        lastPositionSec: 768,
        watchedSec: 768,
        percent: 60,
        completed: false,
        updatedAt: daysAgoIso(0, 9),
      },
      {
        userId: "user-student",
        courseId: "course-radiology",
        lessonId: "les-rad-1-1",
        lastPositionSec: 960,
        watchedSec: 960,
        percent: 100,
        completed: true,
        updatedAt: "2026-05-20T17:00:00.000Z",
      },
      {
        userId: "user-student",
        courseId: "course-radiology",
        lessonId: "les-rad-1-2",
        lastPositionSec: 540,
        watchedSec: 540,
        percent: 45,
        completed: false,
        updatedAt: "2026-06-02T17:00:00.000Z",
      },
      {
        userId: "user-2",
        courseId: "course-oral-pathology",
        lessonId: "les-op-1",
        lastPositionSec: 1320,
        watchedSec: 1320,
        percent: 100,
        completed: true,
        updatedAt: daysAgoIso(2),
      },
      {
        userId: "user-3",
        courseId: "course-oral-pathology",
        lessonId: "les-op-1",
        lastPositionSec: 400,
        watchedSec: 400,
        percent: 32,
        completed: false,
        updatedAt: daysAgoIso(1),
      },
    ],
    attempts: [
      {
        id: "att-1",
        userId: "user-student",
        courseId: "course-oral-pathology",
        lessonId: "les-op-1",
        score: 100,
        passed: true,
        answers: [1, 2, 1],
        takenAt: daysAgoIso(5, 19),
      },
      {
        id: "att-2",
        userId: "user-student",
        courseId: "course-oral-pathology",
        lessonId: "les-op-2",
        score: 67,
        passed: false,
        answers: [1, 0, 1],
        takenAt: daysAgoIso(3, 18),
      },
      {
        id: "att-3",
        userId: "user-student",
        courseId: "course-oral-pathology",
        lessonId: "les-op-2",
        score: 100,
        passed: true,
        answers: [1, 1, 1],
        takenAt: daysAgoIso(3, 19),
      },
      {
        id: "att-4",
        userId: "user-student",
        courseId: "course-radiology",
        lessonId: "les-rad-1-1",
        score: 100,
        passed: true,
        answers: [1, 1, 2],
        takenAt: "2026-05-20T18:00:00.000Z",
      },
      {
        id: "att-5",
        userId: "user-2",
        courseId: "course-oral-pathology",
        lessonId: "les-op-1",
        score: 67,
        passed: false,
        answers: [1, 2, 0],
        takenAt: daysAgoIso(2, 20),
      },
    ],
    bookmarks: [
      {
        userId: "user-student",
        courseId: "course-oral-pathology",
        lessonId: "les-op-3",
        createdAt: daysAgoIso(1, 20),
      },
      {
        userId: "user-student",
        courseId: "course-oral-pathology",
        lessonId: "les-op-5",
        createdAt: daysAgoIso(2, 21),
      },
    ],
    payments: [
      {
        id: "pay-1",
        txnId: "DEMO-8F31A2",
        userId: "user-student",
        courseId: "course-oral-pathology",
        amount: 1499,
        method: "Demo Card",
        status: "success",
        createdAt: "2026-08-05T10:12:00.000Z",
      },
      {
        id: "pay-2",
        txnId: "DEMO-2B77C4",
        userId: "user-student",
        courseId: "course-radiology",
        amount: 899,
        method: "Demo Card",
        status: "success",
        createdAt: "2025-11-14T10:12:00.000Z",
      },
      {
        id: "pay-3",
        txnId: "DEMO-9C10D5",
        userId: "user-2",
        courseId: "course-oral-pathology",
        amount: 1499,
        method: "Demo Wallet",
        status: "success",
        createdAt: "2026-08-08T14:22:00.000Z",
      },
      {
        id: "pay-4",
        txnId: "DEMO-4A55E1",
        userId: "user-3",
        courseId: "course-oral-pathology",
        amount: 1499,
        method: "Demo Card",
        status: "success",
        createdAt: "2026-08-19T08:31:00.000Z",
      },
      {
        id: "pay-5",
        txnId: "DEMO-77B0F9",
        userId: "user-4",
        courseId: "course-pharmacology",
        amount: 999,
        method: "Demo Wallet",
        status: "success",
        createdAt: "2026-08-21T19:05:00.000Z",
      },
      {
        id: "pay-6",
        txnId: "DEMO-31EE02",
        userId: "user-4",
        courseId: "course-oral-pathology",
        amount: 1499,
        method: "Demo Card",
        status: "pending",
        createdAt: daysAgoIso(1, 12),
      },
      {
        id: "pay-7",
        txnId: "DEMO-55AB13",
        userId: "user-3",
        courseId: "course-pharmacology",
        amount: 999,
        method: "Demo Card",
        status: "failed",
        createdAt: daysAgoIso(4, 15),
      },
    ],
    announcements: [
      {
        id: "ann-1",
        courseId: "course-oral-pathology",
        title: "Clinical Revision section is now live",
        body: "Both case-based lessons are published with slides and quizzes. Work through the cases before the practical exam.",
        createdAt: daysAgoIso(2, 11),
      },
      {
        id: "ann-2",
        courseId: null,
        title: "Access dates are fixed per course",
        body: "Every course closes for all students on the same date, whenever you bought it. Check the closing date on your dashboard.",
        createdAt: daysAgoIso(6, 10),
      },
    ],
    activity: {
      "user-student": streakDays,
      "user-2": [toDateKey(new Date(Date.now() - 2 * 86_400_000))],
      "user-3": [toDateKey(new Date(Date.now() - 86_400_000))],
      "user-4": [],
    },
    readAnnouncements: {},
    sessionUserId: null,
  };
}
