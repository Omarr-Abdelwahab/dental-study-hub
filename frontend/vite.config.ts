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
      rolldownOptions: {
        output: {
          codeSplitting: {
            maxSize: 250_000,
            groups: [
              { name: "supabase", test: /node_modules[\\/]@supabase[\\/]/, priority: 4 },
              { name: "tanstack", test: /node_modules[\\/]@tanstack[\\/]/, priority: 3 },
              { name: "radix", test: /node_modules[\\/]@radix-ui[\\/]/, priority: 2 },
              {
                name: "react",
                test: /node_modules[\\/](?:react|react-dom)[\\/]/,
                priority: 2,
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
  ...(process.env["VERCEL"] ? { nitro: { preset: "vercel" } } : {}),
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
