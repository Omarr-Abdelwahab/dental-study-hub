import { createFileRoute } from "@tanstack/react-router";
import { Play, ShieldCheck } from "lucide-react";
import { useState } from "react";

import { PublicPage, SectionHeading } from "@/components/app-shell";
import { Badge } from "@/components/ui/badge";
import { drivePreviewUrl, freeSnippets } from "@/content/free-snippets";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/free-snippets")({ component: FreeSnippetsPage });

function FreeSnippetsPage() {
  const firstSnippet = freeSnippets[0]!;
  const [selectedId, setSelectedId] = useState(firstSnippet.id);
  const selected = freeSnippets.find((snippet) => snippet.id === selectedId) ?? firstSnippet;

  return (
    <PublicPage>
      <section className="border-b bg-secondary/45 py-14 sm:py-18">
        <div className="container-page">
          <Badge className="gap-1.5 border border-primary/20 bg-accent text-accent-foreground shadow-none">
            <Play className="size-3.5" /> Free to watch
          </Badge>
          <div className="mt-5">
            <SectionHeading
              title="Try Denta Help before you enroll"
              description="Watch these practical dental snippets without creating an account or purchasing a course. Choose a video below to begin."
            />
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,.65fr)]">
          <div>
            <div className="overflow-hidden rounded-2xl border bg-black shadow-lift">
              <div className="relative aspect-video">
                <iframe
                  key={selected.driveFileId}
                  className="h-full w-full"
                  src={drivePreviewUrl(selected.driveFileId)}
                  title={selected.title}
                  loading="eager"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-auto absolute right-0 top-0 z-10 h-14 w-16 bg-black"
                />
              </div>
            </div>
            <h1 className="mt-5 text-2xl font-extrabold text-navy sm:text-3xl">{selected.title}</h1>
            <p className="mt-2 max-w-3xl leading-7 text-muted-foreground">{selected.description}</p>
          </div>

          <aside aria-label="Free snippet playlist">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.16em] text-primary">
              Free snippet playlist
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {freeSnippets.map((snippet, index) => {
                const active = snippet.id === selected.id;
                return (
                  <button
                    key={snippet.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedId(snippet.id)}
                    className={cn(
                      "group grid w-full grid-cols-[104px_1fr] overflow-hidden rounded-xl border bg-card text-left shadow-card transition hover:border-primary/35 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      active && "border-primary ring-1 ring-primary/25",
                    )}
                  >
                    <span className="relative block min-h-24 overflow-hidden bg-muted">
                      <img
                        src={snippet.thumbnail}
                        alt=""
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      <span className="absolute inset-0 grid place-items-center bg-navy/20">
                        <span className="grid size-8 place-items-center rounded-full bg-white/92 text-navy shadow">
                          <Play className="ml-0.5 size-3.5 fill-current" />
                        </span>
                      </span>
                    </span>
                    <span className="self-center p-3">
                      <span className="block text-[11px] font-bold uppercase tracking-wide text-primary">
                        Snippet {index + 1}
                      </span>
                      <span className="mt-1 block text-sm font-extrabold leading-5 text-navy">
                        {snippet.title}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y bg-secondary/45 py-10">
        <div className="container-page">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <h2 className="font-extrabold text-navy">No sign-in or payment required</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                These samples are intentionally public so you can judge the teaching style first.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PublicPage>
  );
}
