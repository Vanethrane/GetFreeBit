/**
 * Copy Next `output: "export"` build from `out/` into the repo root
 * so GitHub Pages can serve index.html from /.
 */
import { cpSync, existsSync, rmSync, readdirSync, statSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const OUT = join(ROOT, "out");

if (!existsSync(OUT)) {
  console.error("Missing out/ — run npm run build first.");
  process.exit(1);
}

const skip = new Set([
  ".git",
  ".github",
  "node_modules",
  "out",
  ".next",
  ".cache",
  "src",
  "scripts",
  "data",
  "public",
]);

for (const name of readdirSync(OUT)) {
  const from = join(OUT, name);
  const to = join(ROOT, name);
  if (skip.has(name)) continue;
  if (existsSync(to)) {
    const st = statSync(to);
    if (st.isDirectory()) rmSync(to, { recursive: true, force: true });
    else rmSync(to, { force: true });
  }
  cpSync(from, to, { recursive: true });
  console.log(`published ${name}`);
}

console.log("Static site copied to repo root.");
