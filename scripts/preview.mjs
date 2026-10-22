import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const frontendRoot = path.join(root, "frontend");
const wranglerCli = path.join(root, "node_modules", "wrangler", "wrangler-dist", "cli.js");

const child = spawn(
  process.execPath,
  [wranglerCli, "--cwd", ".", "dev", ...process.argv.slice(2)],
  {
    cwd: frontendRoot,
    env: {
      ...process.env,
      WRANGLER_LOG_PATH: path.join(root, ".wrangler", "preview.log"),
    },
    stdio: "inherit",
  },
);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.once(signal, () => child.kill(signal));
}

child.once("error", (error) => {
  console.error("Could not start the production preview:", error);
  process.exitCode = 1;
});
child.once("exit", (code) => {
  process.exitCode = code ?? 1;
});
