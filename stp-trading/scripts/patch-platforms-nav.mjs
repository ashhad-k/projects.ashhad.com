/**
 * One-off: replace legacy "Trading Platforms" mega-item with HonorPro-style
 * "Platforms & Tools" (Platforms + Tools sections). Run from repo root:
 *   node scripts/patch-platforms-nav.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const TOOLS_TAIL = `<li><hr class="dropdown-divider" /></li><li><h6 class="dropdown-header">Tools</h6></li><li><a class="dropdown-item" href="/platforms/trading-indicators/">STP Trading Indicators</a></li>`;

const NEW_TAIL = `Platforms &amp; Tools</a><ul class="dropdown-menu"><li><h6 class="dropdown-header">Platforms</h6></li><li><a class="dropdown-item" href="/platforms/mt5/">MetaTrader 5</a></li><li><a class="dropdown-item" href="/platforms/stp-portal/">STP Portal</a></li><li><a class="dropdown-item" href="/platforms/social-trading/">Social Trading</a></li>${TOOLS_TAIL}</ul></li>`;

const replacements = [
  {
    from: `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle active" href="/platforms/" data-bs-toggle="dropdown">Trading Platforms</a><ul class="dropdown-menu"><li><a class="dropdown-item active" href="/platforms/mt5/">MetaTrader 5</a></li><li><a class="dropdown-item" href="/platforms/stp-portal/">STP Portal</a></li><li><a class="dropdown-item" href="/platforms/social-trading/">Social Trading</a></li></ul></li>`,
    to: `<li class="nav-item dropdown"><a class="nav-link dropdown-toggle active" href="/platforms/" data-bs-toggle="dropdown">Platforms &amp; Tools</a><ul class="dropdown-menu"><li><h6 class="dropdown-header">Platforms</h6></li><li><a class="dropdown-item active" href="/platforms/mt5/">MetaTrader 5</a></li><li><a class="dropdown-item" href="/platforms/stp-portal/">STP Portal</a></li><li><a class="dropdown-item" href="/platforms/social-trading/">Social Trading</a></li>${TOOLS_TAIL}</ul></li>`,
  },
];
replacements.push({
  from: `Trading Platforms</a><ul class="dropdown-menu"><li><a class="dropdown-item" href="/platforms/mt5/">MetaTrader 5</a></li><li><a class="dropdown-item active" href="/platforms/stp-portal/">STP Portal</a></li><li><a class="dropdown-item" href="/platforms/social-trading/">Social Trading</a></li></ul></li>`,
  to: `Platforms &amp; Tools</a><ul class="dropdown-menu"><li><h6 class="dropdown-header">Platforms</h6></li><li><a class="dropdown-item" href="/platforms/mt5/">MetaTrader 5</a></li><li><a class="dropdown-item active" href="/platforms/stp-portal/">STP Portal</a></li><li><a class="dropdown-item" href="/platforms/social-trading/">Social Trading</a></li>${TOOLS_TAIL}</ul></li>`,
});

replacements.push({
  from: `Trading Platforms</a><ul class="dropdown-menu"><li><a class="dropdown-item" href="/platforms/mt5/">MetaTrader 5</a></li><li><a class="dropdown-item" href="/platforms/stp-portal/">STP Portal</a></li><li><a class="dropdown-item active" href="/platforms/social-trading/">Social Trading</a></li></ul></li>`,
  to: `Platforms &amp; Tools</a><ul class="dropdown-menu"><li><h6 class="dropdown-header">Platforms</h6></li><li><a class="dropdown-item" href="/platforms/mt5/">MetaTrader 5</a></li><li><a class="dropdown-item" href="/platforms/stp-portal/">STP Portal</a></li><li><a class="dropdown-item active" href="/platforms/social-trading/">Social Trading</a></li>${TOOLS_TAIL}</ul></li>`,
});

replacements.push({
  from: `Trading Platforms</a><ul class="dropdown-menu"><li><a class="dropdown-item" href="/platforms/mt5/">MetaTrader 5</a></li><li><a class="dropdown-item" href="/platforms/stp-portal/">STP Portal</a></li><li><a class="dropdown-item" href="/platforms/social-trading/">Social Trading</a></li></ul></li>`,
  to: NEW_TAIL,
});

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (name.endsWith(".html")) out.push(p);
  }
  return out;
}

let total = 0;
for (const file of walk(root)) {
  let html = fs.readFileSync(file, "utf8");
  if (!html.includes("Trading Platforms")) continue;
  let next = html;
  for (const { from, to } of replacements) {
    if (next.includes(from)) {
      next = next.split(from).join(to);
    }
  }
  if (next !== html) {
    fs.writeFileSync(file, next, "utf8");
    console.log("OK", path.relative(root, file));
    total++;
  } else if (html.includes("Trading Platforms")) {
    console.warn("SKIP (unmatched pattern)", path.relative(root, file));
  }
}
console.log("Done,", total, "files.");
