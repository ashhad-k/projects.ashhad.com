/**
 * Remove /platforms/trading-tools/ page and all nav/footer links to it.
 * Run: node scripts/remove-trading-tools.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const TRADING_TOOLS_LI =
  /<li><a(?: class="[^"]*")? href="\/platforms\/trading-tools\/[^"]*">[^<]*<\/a><\/li>/g;

const HUB_LI = /<li><a href="\/platforms\/trading-tools\/">[^<]*<\/a><\/li>/g;

function patchHtml(html) {
  let next = html.replace(TRADING_TOOLS_LI, "");
  next = next.replace(HUB_LI, "");
  return next;
}

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules" || name === ".git") continue;
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (name.endsWith(".html") || name.endsWith(".mjs")) out.push(p);
  }
  return out;
}

let touched = 0;
for (const file of walk(root)) {
  if (file.includes("remove-trading-tools.mjs")) continue;
  const before = fs.readFileSync(file, "utf8");
  if (!before.includes("/platforms/trading-tools")) continue;
  const after = patchHtml(before);
  if (after !== before) {
    fs.writeFileSync(file, after, "utf8");
    console.log("patched", path.relative(root, file));
    touched++;
  }
}

const tradingToolsPage = path.join(root, "platforms", "trading-tools", "index.html");
if (fs.existsSync(tradingToolsPage)) {
  fs.unlinkSync(tradingToolsPage);
  console.log("deleted", path.relative(root, tradingToolsPage));
  try {
    fs.rmdirSync(path.dirname(tradingToolsPage));
  } catch {
    /* not empty */
  }
}

console.log("Done.", touched, "files patched.");
