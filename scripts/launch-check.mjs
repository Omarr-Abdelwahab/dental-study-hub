import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function readEnvironment() {
  const read = async (filename) => {
    try {
      return await readFile(path.join(root, filename), "utf8");
    } catch {
      return "";
    }
  };
  const parse = (source) =>
    Object.fromEntries(
      source
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line && !line.startsWith("#") && line.includes("="))
        .map((line) => {
          const separator = line.indexOf("=");
          return [line.slice(0, separator), line.slice(separator + 1).replace(/^['"]|['"]$/g, "")];
        }),
    );
  const defaults = parse(await read(".env"));
  const local = parse(await read(".env.local"));
  return { ...defaults, ...local, ...process.env };
}

const environment = await readEnvironment();
const blockers = [];
const warnings = [];

function requireValue(name, description) {
  const value = String(environment[name] || "").trim();
  if (!value || /YOUR_|yourdomain|100 000 0000/i.test(value)) {
    blockers.push(`${name}: ${description}`);
  }
  return value;
}

const supabaseUrl = requireValue("VITE_SUPABASE_URL", "add the production Supabase project URL");
requireValue("VITE_SUPABASE_PUBLISHABLE_KEY", "add the browser-safe Supabase publishable key");
const siteUrl = requireValue("VITE_SITE_URL", "add the final HTTPS website origin");
requireValue("VITE_INSTAPAY_ADDRESS", "add the real InstaPay number or payment address");
requireValue("VITE_SUPPORT_EMAIL", "add a monitored support email address");
requireValue("VITE_SUPPORT_PHONE", "add the real support phone number");

if (supabaseUrl && !/^https:\/\/[^/]+\.supabase\.co\/?$/i.test(supabaseUrl)) {
  blockers.push("VITE_SUPABASE_URL must be a valid HTTPS Supabase project URL");
}
if (siteUrl && !/^https:\/\//i.test(siteUrl)) {
  blockers.push("VITE_SITE_URL must use HTTPS");
}

const requiredFiles = [
  "supabase/migrations/202609240001_production_schema.sql",
  "supabase/migrations/202610220001_instapay_review_hardening.sql",
  "supabase/migrations/202610220002_open_test_enrollment.sql",
  "frontend/public/og.png",
  "frontend/public/denta-help-logo.png",
  "frontend/public/site.webmanifest",
  "frontend/public/_headers",
];
for (const relativePath of requiredFiles) {
  try {
    await access(path.join(root, relativePath));
  } catch {
    blockers.push(`Missing required launch file: ${relativePath}`);
  }
}

try {
  await access(path.join(root, "frontend/public/sitemap.xml"));
} catch {
  warnings.push("sitemap.xml will be generated during the first build after VITE_SITE_URL is set");
}

console.log("Denta Help launch readiness\n");
if (blockers.length) {
  console.log("Blockers:");
  blockers.forEach((item) => console.log(`- ${item}`));
}
if (warnings.length) {
  console.log("\nWarnings:");
  warnings.forEach((item) => console.log(`- ${item}`));
}
if (!blockers.length) console.log("No code or configuration blockers detected.");

process.exitCode = blockers.length ? 1 : 0;
