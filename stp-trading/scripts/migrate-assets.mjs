/**
 * One-time asset tree cleanup: move files + rewrite /assets/... paths in HTML/CSS/JS/partials.
 * Run: node scripts/migrate-assets.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const assets = path.join(root, "assets");

/** @type {{ from: string, to: string }[]} */
const FILE_MOVES = [
  ["img-hero-box1.png", "images/home/promo-card-1.png"],
  ["img-hero-box2.png", "images/home/promo-card-2.png"],
  ["img-hero-box3.png", "images/home/promo-card-3.png"],
  ["img-hero-box4.png", "images/home/promo-card-4.png"],
  ["img-hero-box5.png", "images/home/promo-card-5.png"],
  ["img-hero-box6.png", "images/home/promo-card-6.png"],
  ["img-hero-box1--row.png", "images/home/promo-row-1.png"],
  ["img-hero-box2--row.png", "images/home/promo-row-2.png"],
  ["img-hero-box3--row.png", "images/home/promo-row-3.png"],
  ["img-anti-marginal.png", "images/special-services/anti-margin-call.png"],
  ["img-negative-hedge.png", "images/special-services/negative-margin-hedge-example.png"],
  ["img-pc.png", "images/account-types/platform-pc.png"],
  ["img-social1.png", "images/platforms/social-trading/section-visual.png"],
  ["img-stp-portal1.png", "images/platforms/stp-portal/dashboard-visual.png"],
  ["images/hero-trust-badges.png", "images/home/hero-trust-badges.png"],
  ["images/award-badge.png", "images/shared/award-badge.png"],
  ["images/education-section-banner.png", "images/education/section-banner.png"],
  ["images/education-lesson-video.png", "images/education/lesson-video.png"],
  ["images/mt5-features-globe.png", "images/platforms/mt5/features-globe.png"],
  ["images/mt5-dl-microsoft.svg", "icons/platforms/mt5-dl-microsoft.svg"],
  ["images/mt5-dl-apple.svg", "icons/platforms/mt5-dl-apple.svg"],
  ["images/mt5-dl-android.svg", "icons/platforms/mt5-dl-android.svg"],
  ["images/mt5-dl-appstore.svg", "icons/platforms/mt5-dl-appstore.svg"],
  ["footer-bank-transfer.svg", "icons/payment/footer-bank-transfer.svg"],
  ["bg/icon-check-circle-teal.png", "icons/ui/check-circle-teal.png"],
  ["bg/bg-account-zero-prime.png", "bg/cards/bg-account-zero-prime.png"],
  ["bg/bg-account-zero.png", "bg/cards/bg-account-zero.png"],
  ["bg/bg-account-standard.png", "bg/cards/bg-account-standard.png"],
  ["bg/bg-account-islamic.png", "bg/cards/bg-account-islamic.png"],
  ["images/home/pill-bitcoin.svg", "icons/payment/pill-bitcoin.svg"],
  ["images/home/pill-teether.svg", "icons/payment/pill-teether.svg"],
  ["images/home/pill-visa.svg", "icons/payment/pill-visa.svg"],
  ["images/home/pill-mastercard.svg", "icons/payment/pill-mastercard.svg"],
  ["images/home/pill-ethrium.svg", "icons/payment/pill-ethrium.svg"],
  ["images/home/pill-banktransfer.svg", "icons/payment/pill-banktransfer.svg"],
];

/** Figma export dirs at assets root → images/... */
const DIR_MOVES = [
  ["home", "images/home"],
  ["announcements", "images/announcements"],
  ["license", "images/license"],
  ["awards", "images/awards"],
  ["mt5", "images/platforms/mt5"],
  ["stp-portal", "images/platforms/stp-portal"],
  ["social-trading", "images/platforms/social-trading"],
  ["account-types-more", "images/account-types"],
  ["special-service-7", "images/special-services/priority"],
];

/** @type {[string, string][]} */
const URL_REPLACEMENTS = [
  ["/assets/img-hero-box1.png", "/assets/images/home/promo-card-1.png"],
  ["/assets/img-hero-box2.png", "/assets/images/home/promo-card-2.png"],
  ["/assets/img-hero-box3.png", "/assets/images/home/promo-card-3.png"],
  ["/assets/img-hero-box4.png", "/assets/images/home/promo-card-4.png"],
  ["/assets/img-hero-box5.png", "/assets/images/home/promo-card-5.png"],
  ["/assets/img-hero-box6.png", "/assets/images/home/promo-card-6.png"],
  ["/assets/img-hero-box1--row.png", "/assets/images/home/promo-row-1.png"],
  ["/assets/img-hero-box2--row.png", "/assets/images/home/promo-row-2.png"],
  ["/assets/img-hero-box3--row.png", "/assets/images/home/promo-row-3.png"],
  ["/assets/img-anti-marginal.png", "/assets/images/special-services/anti-margin-call.png"],
  ["/assets/img-negative-hedge.png", "/assets/images/special-services/negative-margin-hedge-example.png"],
  ["/assets/img-pc.png", "/assets/images/account-types/platform-pc.png"],
  ["/assets/img-social1.png", "/assets/images/platforms/social-trading/section-visual.png"],
  ["/assets/img-stp-portal1.png", "/assets/images/platforms/stp-portal/dashboard-visual.png"],
  ["/assets/images/hero-trust-badges.png", "/assets/images/home/hero-trust-badges.png"],
  ["/assets/images/award-badge.png", "/assets/images/shared/award-badge.png"],
  ["/assets/images/education-section-banner.png", "/assets/images/education/section-banner.png"],
  ["/assets/images/education-lesson-video.png", "/assets/images/education/lesson-video.png"],
  ["/assets/images/mt5-features-globe.png", "/assets/images/platforms/mt5/features-globe.png"],
  ["/assets/images/mt5-dl-microsoft.svg", "/assets/icons/platforms/mt5-dl-microsoft.svg"],
  ["/assets/images/mt5-dl-apple.svg", "/assets/icons/platforms/mt5-dl-apple.svg"],
  ["/assets/images/mt5-dl-android.svg", "/assets/icons/platforms/mt5-dl-android.svg"],
  ["/assets/images/mt5-dl-appstore.svg", "/assets/icons/platforms/mt5-dl-appstore.svg"],
  ["/assets/bg/bg-account-zero-prime.png", "/assets/bg/cards/bg-account-zero-prime.png"],
  ["/assets/bg/bg-account-zero.png", "/assets/bg/cards/bg-account-zero.png"],
  ["/assets/bg/bg-account-standard.png", "/assets/bg/cards/bg-account-standard.png"],
  ["/assets/bg/bg-account-islamic.png", "/assets/bg/cards/bg-account-islamic.png"],
  ["/assets/images/home/pill-bitcoin.svg", "/assets/icons/payment/pill-bitcoin.svg"],
  ["/assets/images/home/pill-teether.svg", "/assets/icons/payment/pill-teether.svg"],
  ["/assets/images/home/pill-visa.svg", "/assets/icons/payment/pill-visa.svg"],
  ["/assets/images/home/pill-mastercard.svg", "/assets/icons/payment/pill-mastercard.svg"],
  ["/assets/images/home/pill-ethrium.svg", "/assets/icons/payment/pill-ethrium.svg"],
  ["/assets/images/home/pill-banktransfer.svg", "/assets/icons/payment/pill-banktransfer.svg"],
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function moveFile(fromRel, toRel) {
  const from = path.join(assets, fromRel);
  const to = path.join(assets, toRel);
  if (!fs.existsSync(from)) return false;
  if (fs.existsSync(to)) {
    console.warn("skip (dest exists):", toRel);
    return false;
  }
  ensureDir(path.dirname(to));
  fs.renameSync(from, to);
  console.log("move", fromRel, "->", toRel);
  return true;
}

function mergeDir(fromRel, toRel) {
  const from = path.join(assets, fromRel);
  const to = path.join(assets, toRel);
  if (!fs.existsSync(from)) return;
  ensureDir(to);
  for (const name of fs.readdirSync(from)) {
    if (name === ".gitkeep") continue;
    const src = path.join(from, name);
    const dest = path.join(to, name);
    if (!fs.statSync(src).isFile()) continue;
    if (fs.existsSync(dest)) {
      console.warn("skip merge duplicate:", path.join(toRel, name));
      continue;
    }
    fs.renameSync(src, dest);
    console.log("merge", path.join(fromRel, name), "->", path.join(toRel, name));
  }
  try {
    fs.rmdirSync(from);
  } catch {
    /* not empty */
  }
}

function removeIfExists(rel) {
  const p = path.join(assets, rel);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log("removed duplicate", rel);
  }
}

const SCAN_EXT = new Set([".html", ".css", ".js", ".mjs"]);
const SKIP_DIRS = new Set(["node_modules", ".git"]);

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      walk(path.join(dir, ent.name), out);
    } else if (SCAN_EXT.has(path.extname(ent.name))) {
      out.push(path.join(dir, ent.name));
    }
  }
  return out;
}

function patchSources() {
  const files = walk(root).filter((f) => !f.includes(`${path.sep}scripts${path.sep}migrate-assets`));
  let touched = 0;
  for (const file of files) {
    let text = fs.readFileSync(file, "utf8");
    let changed = false;
    for (const [oldUrl, newUrl] of URL_REPLACEMENTS) {
      if (text.includes(oldUrl)) {
        text = text.split(oldUrl).join(newUrl);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(file, text, "utf8");
      touched++;
      console.log("patched", path.relative(root, file));
    }
  }
  console.log("Patched", touched, "files");
}

console.log("=== File moves ===");
for (const [from, to] of FILE_MOVES) moveFile(from, to);

console.log("=== Directory merges ===");
for (const [from, to] of DIR_MOVES) mergeDir(from, to);

console.log("=== Remove root duplicates ===");
for (const name of [
  "pill-bitcoin.svg",
  "pill-teether.svg",
  "pill-visa.svg",
  "pill-mastercard.svg",
  "pill-ethrium.svg",
  "pill-banktransfer.svg",
  "bg-account-zero-prime.png",
  "bg-account-zero.png",
  "bg-account-standard.png",
  "bg-account-islamic.png",
]) {
  removeIfExists(name);
}

console.log("=== Patch HTML/CSS/JS ===");
patchSources();

console.log("Done.");
