import { LoaderCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface PlayerLike {
  destroy: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
}

interface YoutubeNamespace {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: { target: PlayerLike }) => void;
        onStateChange?: (event: { data: number; target: PlayerLike }) => void;
      };
    },
  ) => PlayerLike;
  PlayerState: { PLAYING: number };
}

declare global {
  interface Window {
    YT?: YoutubeNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function YouTubePlayer({
  videoId,
  startAt = 0,
  onProgress,
}: {
  videoId: string;
  startAt?: number;
  onProgress?: (positionSec: number, percent: number) => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerLike | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressCallbackRef = useRef(onProgress);
  const startAtRef = useRef(startAt);
  const [ready, setReady] = useState(false);

  progressCallbackRef.current = onProgress;
  startAtRef.current = startAt;

  useEffect(() => {
    if (!mountRef.current) return;
    let cancelled = false;

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
      progressCallbackRef.current(position, duration ? (position / duration) * 100 : 0);
    };
    const startTracking = () => {
      clearTracking();
      intervalRef.current = setInterval(report, 10_000);
    };
    const create = () => {
      if (cancelled || !mountRef.current || !window.YT?.Player) return;
      playerRef.current = new window.YT.Player(mountRef.current, {
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
            if (data === window.YT?.PlayerState.PLAYING) startTracking();
            else {
              report();
              clearTracking();
            }
          },
        },
      });
    };

    if (window.YT?.Player) {
      create();
    } else {
      const previous = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        previous?.();
        create();
      };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.head.appendChild(script);
      }
    }

    return () => {
      cancelled = true;
      report();
      clearTracking();
      try {
        playerRef.current?.destroy();
      } catch {
        // The YouTube iframe may already be gone during route transitions.
      }
      playerRef.current = null;
    };
  }, [videoId]);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
      {!ready && (
        <div className="absolute inset-0 z-0 grid place-items-center bg-navy text-white">
          <div className="text-center">
            <LoaderCircle className="mx-auto size-6 animate-spin text-primary" />
            <p className="mt-3 text-xs font-semibold text-white/60">Loading video player</p>
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
