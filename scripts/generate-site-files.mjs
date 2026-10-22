import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function readLocalEnvironment() {
  try {
    const source = await readFile(path.join(root, ".env.local"), "utf8");
    return Object.fromEntries(
      source
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#") && line.includes("="))
        .map((line) => {
          const separator = line.indexOf("=");
          return [line.slice(0, separator), line.slice(separator + 1).replace(/^['"]|['"]$/g, "")];
        }),
    );
  } catch {
    return {};
  }
}

const localEnvironment = await readLocalEnvironment();
const siteUrl = (process.env.VITE_SITE_URL || localEnvironment.VITE_SITE_URL || "").replace(
  /\/$/,
  "",
);

if (!siteUrl) {
  console.warn("Skipping sitemap generation because VITE_SITE_URL is not configured.");
  process.exit(0);
}

const routes = [
  "/",
  "/courses",
  "/courses/fixed-prosthodontics",
  "/courses/operative",
  "/free-snippets",
  "/privacy",
  "/terms",
];
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

await writeFile(path.join(root, "frontend/public/sitemap.xml"), sitemap, "utf8");
await writeFile(
  path.join(root, "frontend/public/robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
  "utf8",
);

console.log(`Generated sitemap and robots.txt for ${siteUrl}.`);
