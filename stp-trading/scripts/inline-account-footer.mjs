/**
 * One-off helper: bake partials/footer.html into account-types/index.html (no fetch).
 * Run from repo root: node scripts/inline-account-footer.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const pagePath = path.join(root, "account-types", "index.html");
const footerPath = path.join(root, "partials", "footer.html");

let page = fs.readFileSync(pagePath, "utf8");
const foot = fs.readFileSync(footerPath, "utf8");
const m = foot.indexOf("<footer");
if (m < 0) throw new Error("partials/footer.html has no <footer>");
const block = foot.slice(m).trimEnd() + "\n";

const re = /\r?\n\s*<!-- Footer outside shell:[\s\S]*?<div data-include="\/partials\/footer\.html"><\/div>\s*/;
if (!re.test(page)) throw new Error("placeholder block not found in account-types/index.html");

page = page.replace(re, "\n\n  " + block + "\n  ");
fs.writeFileSync(pagePath, page);
console.log("Inlined footer into account-types/index.html (" + block.length + " chars)");
