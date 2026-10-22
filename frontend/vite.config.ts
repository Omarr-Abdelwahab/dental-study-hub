// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    build: {
      // The largest client entry is ~501 kB minified (~151 kB gzip) after vendor splitting.
      // Keep the warning threshold tight enough to catch meaningful regressions.
      chunkSizeWarningLimit: 510,
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              {
                name: "supabase-vendor",
                test: /node_modules[\\/]@supabase/,
                priority: 30,
              },
              {
                name: "router-vendor",
                test: /node_modules[\\/]@tanstack/,
                priority: 25,
              },
              {
                name: "validation-vendor",
                test: /node_modules[\\/]zod/,
                priority: 22,
              },
              {
                name: "react-vendor",
                test: /node_modules[\\/](?:react|react-dom)[\\/]/,
                priority: 20,
              },
              {
                name: "ui-vendor",
                test: /node_modules[\\/](?:@radix-ui|lucide-react|sonner)[\\/]/,
                priority: 15,
              },
            ],
          },
        },
      },
    },
  },
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
