import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Expand,
  Layers3,
  LoaderCircle,
  Minimize2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CourseSlideViewer({ pdfUrl, title }: { pdfUrl: string; title: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<RenderTask | null>(null);
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let destroyLoadingTask: (() => void) | undefined;

    setDocument(null);
    setPage(1);
    setIsLoading(true);
    setError(false);

    void import("pdfjs-dist")
      .then(async (pdfjs) => {
        pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
        const loadingTask = pdfjs.getDocument(pdfUrl);
        destroyLoadingTask = () => void loadingTask.destroy();
        const loadedDocument = await loadingTask.promise;
        if (cancelled) {
          await loadedDocument.destroy();
          return;
        }
        setDocument(loadedDocument);
        setPageCount(loadedDocument.numPages);
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
      destroyLoadingTask?.();
    };
  }, [pdfUrl]);

  useEffect(() => {
    const container = viewportRef.current;
    const canvas = canvasRef.current;
    if (!document || !container || !canvas) return;

    let cancelled = false;
    let animationFrame = 0;

    const draw = async () => {
      renderTaskRef.current?.cancel();
      const pdfPage = await document.getPage(page);
      if (cancelled) return;

      const original = pdfPage.getViewport({ scale: 1 });
      const fitScale = Math.min(
        container.clientWidth / original.width,
        container.clientHeight / original.height,
      );
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const renderViewport = pdfPage.getViewport({ scale: fitScale * pixelRatio });
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) return;

      canvas.width = Math.floor(renderViewport.width);
      canvas.height = Math.floor(renderViewport.height);
      canvas.style.width = `${Math.floor(original.width * fitScale)}px`;
      canvas.style.height = `${Math.floor(original.height * fitScale)}px`;

      setIsLoading(true);
      const renderTask = pdfPage.render({
        canvas,
        canvasContext: context,
        viewport: renderViewport,
      });
      renderTaskRef.current = renderTask;
      try {
        await renderTask.promise;
        if (!cancelled) setIsLoading(false);
      } catch (renderError) {
        if (renderError instanceof Error && renderError.name !== "RenderingCancelledException") {
          setError(true);
          setIsLoading(false);
        }
      }
    };

    const scheduleDraw = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => void draw());
    };
    const observer = new ResizeObserver(scheduleDraw);
    observer.observe(container);
    scheduleDraw();

    return () => {
      cancelled = true;
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
      renderTaskRef.current?.cancel();
    };
  }, [document, isFullscreen, page]);

  useEffect(() => {
    const handleFullscreen = () =>
      setIsFullscreen(globalThis.document.fullscreenElement === stageRef.current);
    globalThis.document.addEventListener("fullscreenchange", handleFullscreen);
    return () => globalThis.document.removeEventListener("fullscreenchange", handleFullscreen);
  }, []);

  const goTo = (nextPage: number) => {
    setPage(Math.min(pageCount, Math.max(1, nextPage)));
  };

  const toggleFullscreen = async () => {
    if (globalThis.document.fullscreenElement) {
      await globalThis.document.exitFullscreen();
    } else {
      await stageRef.current?.requestFullscreen();
    }
  };

  return (
    <div
      ref={stageRef}
      tabIndex={0}
      aria-label={`${title} slide viewer`}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goTo(page - 1);
        if (event.key === "ArrowRight") goTo(page + 1);
      }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-border/70 bg-card shadow-lift outline-none ring-primary/20 focus-visible:ring-4",
        isFullscreen && "flex h-screen flex-col rounded-none border-0 bg-navy",
      )}
    >
      <div className="h-1 bg-muted">
        <div
          className="h-full bg-primary transition-[width] duration-300"
          style={{ width: `${(page / pageCount) * 100}%` }}
        />
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b bg-card px-3 py-2.5 sm:px-5 sm:py-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-accent text-primary">
            <Layers3 className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-navy">Course slides</p>
            <p className="text-xs font-semibold text-muted-foreground">
              Slide {page} of {pageCount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            aria-label="Previous slide"
            disabled={page === 1}
            onClick={() => goTo(page - 1)}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label="Next slide"
            disabled={page === pageCount}
            onClick={() => goTo(page + 1)}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="icon"
            aria-label={isFullscreen ? "Exit full screen" : "Enter full screen"}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 /> : <Expand />}
          </Button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className={cn(
          "relative grid aspect-video min-h-0 w-full place-items-center overflow-hidden bg-slate-950",
          isFullscreen && "aspect-auto flex-1",
        )}
      >
        <canvas ref={canvasRef} className="block max-h-full max-w-full bg-white shadow-2xl" />
        {isLoading && !error && (
          <div className="absolute inset-0 grid place-items-center bg-slate-950/75 text-white backdrop-blur-sm">
            <div className="text-center">
              <LoaderCircle className="mx-auto size-7 animate-spin text-primary" />
              <p className="mt-3 text-sm font-bold">Preparing slide...</p>
            </div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 grid place-items-center bg-slate-950 px-6 text-center text-white">
            <div>
              <AlertCircle className="mx-auto size-8 text-warning" />
              <p className="mt-3 font-extrabold">This slide could not be displayed</p>
              <p className="mt-1 text-sm text-white/65">Refresh the page and try again.</p>
            </div>
          </div>
        )}
      </div>

      <div className="shrink-0 border-t bg-card px-3 py-3 sm:px-5 sm:py-4">
        <div className="flex items-center gap-3">
          <span className="w-8 text-center text-xs font-extrabold text-navy">{page}</span>
          <input
            type="range"
            min={1}
            max={pageCount}
            value={page}
            onChange={(event) => goTo(Number(event.target.value))}
            aria-label="Choose slide"
            className="h-1.5 min-w-0 flex-1 cursor-pointer accent-primary"
          />
          <span className="w-8 text-center text-xs font-bold text-muted-foreground">
            {pageCount}
          </span>
        </div>
        <p className="mt-2 hidden text-center text-[11px] font-semibold text-muted-foreground sm:block">
          Use the controls or your keyboard arrows to move between slides
        </p>
      </div>
    </div>
  );
}
