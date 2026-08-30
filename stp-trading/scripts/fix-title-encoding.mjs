/**
 * Fix mojibake (â€") and normalize em dashes in <title> to ASCII " - ".
 * Run: node scripts/fix-title-encoding.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const MOJIBAKE = /\u00e2\u20ac\u201d/g; // â€" (UTF-8 em dash misread)

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".git") continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (ent.name.endsWith(".html")) out.push(p);
  }
  return out;
}

function normalizeTitleContent(inner) {
  return inner.replace(MOJIBAKE, " - ").replace(/\u2014/g, " - ").replace(/\s+-\s+/g, " - ").trim();
}

let touched = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, "utf8");
  const before = html;
  html = html.replace(MOJIBAKE, " - ");
  html = html.replace(/<title>([^<]*)<\/title>/gi, (_, inner) => {
    const next = normalizeTitleContent(inner);
    return `<title>${next}</title>`;
  });
  if (html !== before) {
    fs.writeFileSync(file, html, "utf8");
    const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
    console.log(path.relative(root, file), "→", title);
    touched++;
  }
}
console.log("Fixed", touched, "files.");
