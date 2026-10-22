export interface FreeSnippet {
  id: string;
  title: string;
  description: string;
  driveFileId: string;
  thumbnail: string;
  courseId: "course-fixed-prosthodontics" | "course-operative";
  courseTitle: "Fixed Prosthodontics" | "Operative";
  courseSlug: "fixed-prosthodontics" | "operative";
}

export const freeSnippets: readonly FreeSnippet[] = [
  {
    id: "full-ceramic-check",
    title: "Check your work: full ceramic",
    description: "A practical check of the finished full-ceramic preparation.",
    driveFileId: "1L7BPD0R5u5JEXrpKA-5kjC7CxnIVscYN",
    thumbnail: "/snippets/full-ceramic.jpg",
    courseId: "course-fixed-prosthodontics",
    courseTitle: "Fixed Prosthodontics",
    courseSlug: "fixed-prosthodontics",
  },
  {
    id: "class-one-cavity-introduction",
    title: "Class I cavity introduction",
    description: "A short introduction to the Class I cavity preparation workflow.",
    driveFileId: "18LzMsmxRMLavUvezyMRfyJNRFPspmHFV",
    thumbnail: "/snippets/class-one-cavity.jpg",
    courseId: "course-operative",
    courseTitle: "Operative",
    courseSlug: "operative",
  },
  {
    id: "molar-occlusal-pre-reduction",
    title: "Molar occlusal explanation: pre-reduction",
    description: "Review the occlusal surface before beginning reduction.",
    driveFileId: "1iwn_3-lJ5c8aRhYJdI1-y7ZbvXgWl0Jw",
    thumbnail: "/snippets/molar-pre-reduction.jpg",
    courseId: "course-fixed-prosthodontics",
    courseTitle: "Fixed Prosthodontics",
    courseSlug: "fixed-prosthodontics",
  },
  {
    id: "premolar-index-final",
    title: "Premolar index: final result",
    description: "A concise look at the completed premolar index.",
    driveFileId: "1DsnnNtvcVYqch0AG7s0lJNm5oLmipbMz",
    thumbnail: "/snippets/premolar-index.jpg",
    courseId: "course-fixed-prosthodontics",
    courseTitle: "Fixed Prosthodontics",
    courseSlug: "fixed-prosthodontics",
  },
] as const;

export function drivePreviewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}
