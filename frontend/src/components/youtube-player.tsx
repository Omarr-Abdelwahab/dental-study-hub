import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { getVideoEmbedUrl, getVideoSourceUrl, isGoogleDriveSource } from "@/lib/video-source";
import { loadYouTubeApi, type YouTubePlayerHandle } from "@/lib/youtube-api";

export function YouTubePlayer({
  videoId,
  startAt = 0,
  onProgress,
}: {
  videoId: string;
  startAt?: number;
  onProgress?: (positionSec: number, percent: number, watchedDeltaSec: number) => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayerHandle | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const playingSinceRef = useRef<number | null>(null);
  const progressCallbackRef = useRef(onProgress);
  const startAtRef = useRef(startAt);
  const [ready, setReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  progressCallbackRef.current = onProgress;
  startAtRef.current = startAt;

  const isDriveVideo = isGoogleDriveSource(videoId);

  useEffect(() => {
    if (isDriveVideo) {
      setReady(true);
      return;
    }

    if (!mountRef.current) return;
    let cancelled = false;
    setReady(false);
    setLoadFailed(false);

    const clearTracking = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    const report = () => {
      const player = playerRef.current;
      if (!player || !progressCallbackRef.current) return;
      const position = player.getCurrentTime() || 0;
      const duration = player.getDuration() || 0;
      const now = performance.now();
      const watchedDeltaSec =
        playingSinceRef.current !== null ? Math.max(0, (now - playingSinceRef.current) / 1000) : 0;
      if (playingSinceRef.current !== null) playingSinceRef.current = now;
      progressCallbackRef.current(
        position,
        duration ? (position / duration) * 100 : 0,
        watchedDeltaSec,
      );
    };
    const startTracking = () => {
      clearTracking();
      playingSinceRef.current = performance.now();
      intervalRef.current = setInterval(report, 10_000);
    };
    void loadYouTubeApi()
      .then((youtube) => {
        if (cancelled || !mountRef.current) return;
        playerRef.current = new youtube.Player(mountRef.current, {
          videoId,
          playerVars: {
            rel: 0,
            modestbranding: 1,
            playsinline: 1,
            start: Math.max(0, Math.floor(startAtRef.current)),
          },
          events: {
            onReady: ({ target }) => {
              if (startAtRef.current > 0) target.seekTo(startAtRef.current, true);
              setReady(true);
            },
            onStateChange: ({ data }) => {
              if (data === youtube.PlayerState.PLAYING) startTracking();
              else {
                report();
                playingSinceRef.current = null;
                clearTracking();
              }
            },
          },
        });
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true);
      });

    return () => {
      cancelled = true;
      report();
      playingSinceRef.current = null;
      clearTracking();
      try {
        playerRef.current?.destroy();
      } catch {
        // The YouTube iframe may already be gone during route transitions.
      }
      playerRef.current = null;
    };
  }, [isDriveVideo, videoId]);

  if (isDriveVideo) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
        <video
          controls
          preload="metadata"
          className="h-full w-full bg-black object-contain"
          src={getVideoSourceUrl(videoId)}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
      {!ready && (
        <div className="absolute inset-0 z-0 grid place-items-center bg-navy text-white">
          <div className="text-center">
            {loadFailed ? null : (
              <LoaderCircle className="mx-auto size-6 animate-spin text-primary" />
            )}
            <p className="mt-3 text-xs font-semibold text-white/60">
              {loadFailed ? "Video player could not be loaded" : "Loading video player"}
            </p>
          </div>
        </div>
      )}
      <div
        ref={mountRef}
        className="relative z-10 h-full w-full [&>iframe]:h-full [&>iframe]:w-full"
      />
    </div>
  );
}
