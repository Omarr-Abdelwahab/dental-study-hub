export interface YouTubePlayerHandle {
  destroy: () => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
}

export interface YouTubeApi {
  Player: new (
    element: HTMLElement,
    options: {
      videoId: string;
      playerVars?: Record<string, string | number>;
      events?: {
        onReady?: (event: { target: YouTubePlayerHandle }) => void;
        onStateChange?: (event: { data: number; target: YouTubePlayerHandle }) => void;
      };
    },
  ) => YouTubePlayerHandle;
  PlayerState: { PLAYING: number };
}

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YouTubeApi> | null = null;

/** Load the shared IFrame API once, even if players mount concurrently. */
export function loadYouTubeApi(): Promise<YouTubeApi> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YouTubeApi>((resolve, reject) => {
    const previousReadyHandler = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousReadyHandler?.();
      if (window.YT?.Player) resolve(window.YT);
      else reject(new Error("YouTube IFrame API loaded without a Player implementation."));
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.youtube.com/iframe_api"]',
    );
    if (existingScript) {
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Unable to load the YouTube IFrame API.")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.addEventListener(
      "error",
      () => reject(new Error("Unable to load the YouTube IFrame API.")),
      { once: true },
    );
    document.head.appendChild(script);
  }).catch((error: unknown) => {
    apiPromise = null;
    throw error;
  });

  return apiPromise;
}
