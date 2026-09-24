export function isYouTubeSource(value: string): boolean {
  const source = value.trim();
  if (!source) return false;
  if (/youtube\.com|youtu\.be|youtube-nocookie\.com/i.test(source)) return true;
  return /^[A-Za-z0-9_-]{11}$/.test(source);
}

export function isGoogleDriveSource(value: string): boolean {
  const source = value.trim();
  if (!source) return false;
  if (/drive\.google\.com/i.test(source)) return true;
  if (isYouTubeSource(source)) return false;
  return /^[A-Za-z0-9_-]{10,}$/.test(source);
}

export function getGoogleDriveFileId(value: string): string | null {
  const source = value.trim();
  if (!source) return null;

  const directMatch = source.match(/(?:\/d\/|[?&]id=)([A-Za-z0-9_-]+)/i)?.[1];
  if (directMatch) return directMatch;

  if (isGoogleDriveSource(source) && !/drive\.google\.com/i.test(source)) {
    return source;
  }

  return null;
}

export function getVideoEmbedUrl(value: string): string {
  const source = value.trim();
  if (!source) return "";

  if (isYouTubeSource(source)) {
    const videoId = source.match(/(?:v=|\/)([A-Za-z0-9_-]{11})(?:[?&]|$)/i)?.[1] ?? source;
    return `https://www.youtube.com/embed/${videoId}?rel=0`;
  }

  const driveId = getGoogleDriveFileId(source);
  if (driveId) return `https://drive.google.com/file/d/${driveId}/preview`;

  return source;
}

export function getVideoSourceUrl(value: string): string {
  const source = value.trim();
  if (!source) return "";

  const driveId = getGoogleDriveFileId(source);
  if (driveId) return `https://drive.google.com/uc?export=view&id=${driveId}`;

  return getVideoEmbedUrl(source);
}
