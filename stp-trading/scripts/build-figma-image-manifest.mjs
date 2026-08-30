/**
 * Reads scripts/figma-page-metadata.xml (from get_metadata Page 1)
 * and writes scripts/figma-image-export-manifest.json listing every
 * rounded-rectangle whose name starts with "image " (Figma image fills).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const xmlPath = path.join(__dirname, "figma-page-metadata.xml");
const outPath = path.join(__dirname, "figma-image-export-manifest.json");
const FILE_KEY = "odbqunya6ae6IAOFjnTPNR";

const OPEN_RE =
  /^(\s*)<(?<tag>canvas|frame|section)\s+[^>]*\bid="(?<id>[^"]+)"[^>]*\bname="(?<name>[^"]*)"/;
const CLOSE_RE = /^(\s*)<\/(canvas|frame|section)>/;
const RR_RE =
  /^(\s*)<rounded-rectangle\s+[^>]*\bid="(?<id>[^"]+)"[^>]*\bname="(?<name>[^"]*)"/;

function isScreenRoot(name) {
  return /^\d+_stp_/i.test(name);
}

/** Map 12_stp_champions_faq -> champions-faq; disambiguate duplicate logical pages */
function frameToFolder(frameName) {
  const m = frameName.match(/^(\d+)_stp_(.+)$/i);
  if (!m) return "misc";
  const num = m[1];
  let slug = m[2].toLowerCase().replace(/_/g, "-");
  if (slug === "specialservice") return `special-service-${num}`;
  if (slug === "accounttypes") return num === "2" ? "account-types" : "account-types-more";
  if (slug === "homepage") return "home";
  if (slug === "annourcements") return "announcements";
  if (slug === "stpportal") return "stp-portal";
  if (slug === "socialtrading") return "social-trading";
  return slug;
}

const xml = fs.readFileSync(xmlPath, "utf8");
const lines = xml.split(/\r?\n/);

const stack = [];
const items = [];

for (const line of lines) {
  const close = line.match(CLOSE_RE);
  if (close) {
    stack.pop();
    continue;
  }

  const open = line.match(OPEN_RE);
  if (open && !line.trim().endsWith("/>")) {
    const { tag, id, name } = open.groups;
    stack.push({ tag, id, name });
    continue;
  }

  const rr = line.match(RR_RE);
  if (!rr || !line.includes("/>")) continue;
  const { id, name } = rr.groups;
  if (!/^image\s/i.test(name)) continue;

  let screen = null;
  for (let i = stack.length - 1; i >= 0; i--) {
    if (stack[i].tag === "frame" && isScreenRoot(stack[i].name)) {
      screen = stack[i];
      break;
    }
  }
  if (!screen) continue;

  const folder = frameToFolder(screen.name);
  items.push({
    nodeId: id,
    folder,
    screen: screen.name,
    figmaImageName: name,
  });
}

items.sort((a, b) => a.nodeId.localeCompare(b.nodeId, undefined, { numeric: true }));

const byFolder = {};
const counters = {};
for (const it of items) {
  byFolder[it.folder] = (byFolder[it.folder] || 0) + 1;
  const n = (counters[it.folder] = (counters[it.folder] || 0) + 1);
  it.file = `feature-${String(n).padStart(2, "0")}.png`;
}

const manifest = {
  fileKey: FILE_KEY,
  generatedAt: new Date().toISOString(),
  sourceXml: "scripts/figma-page-metadata.xml",
  countsByFolder: byFolder,
  items,
};

fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2), "utf8");
console.log("Wrote", outPath, "items:", items.length);
for (const [k, v] of Object.entries(byFolder).sort()) console.log(`  ${k}: ${v}`);
