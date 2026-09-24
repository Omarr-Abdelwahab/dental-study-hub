// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Lovable uses Cloudflare for its own previews. Pin only Vercel CI builds so
  // production emits Vercel's Build Output API layout without changing the
  // local/Lovable preview target.
  ...(process.env["VERCEL"]
    ? {
        nitro: {
          preset: "vercel",
          // Vercel's Build Output API must be emitted at the repository root.
          // Nitro's root is this workspace, so move the output up one level.
          output: { dir: "../.vercel/output" },
        },
      }
    : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
