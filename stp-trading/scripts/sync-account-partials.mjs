/**
 * Inlines marketing chrome into account-types pages so footer + utility + nav render
 * without fetch (works when opening HTML over file:// or when /partials requests fail).
 * Source of truth: /partials/*.html — run after editing those files:
 *   node scripts/sync-account-partials.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function readPartial(rel) {
  return fs.readFileSync(path.join(root, "partials", rel), "utf8").trim();
}

/** Remove leading <!-- ... --> so we don't stack duplicate banners */
function stripLeadingHtmlComments(html) {
  let s = html.trim();
  while (s.startsWith("<!--")) {
    const end = s.indexOf("-->");
    if (end === -1) break;
    s = s.slice(end + 3).trim();
  }
  return s.trim();
}

const utility = stripLeadingHtmlComments(readPartial("stp-shell-utility.html"));
const navbar = readPartial("account-marketing-navbar.html");
const footer = stripLeadingHtmlComments(readPartial("footer.html"));
const pageHeaderHeroBelow = readPartial("page-header-hero-below.html");
const strategyMarketplaceMarquee = readPartial("strategy-marketplace-marquee.html");
const homeSpecialServices = readPartial("home-special-services.html");

const pages = [
  "index.html",
  "account-types/index.html",
  "account-types/zero/index.html",
  "account-types/standard/index.html",
  "account-types/islamic/index.html",
  "account-types/zero-prime/index.html",
  "special-services/index.html",
  "special-services/anti-margin-call/index.html",
  "special-services/negative-margin-hedge/index.html",
  "special-services/vps/index.html",
  "special-services/priority/index.html",
  "platforms/trading-indicators/index.html",
  "platforms/mt5/index.html",
  "platforms/social-trading/index.html",
  "platforms/stp-portal/index.html",
  "license/index.html",
  "awards/index.html",
  "contact/index.html",
  "about/index.html",
  "champions/index.html",
  "champions/faq/index.html",
  "champions/rules/index.html",
  "champions/past-winners/index.html",
  "partnership/ib/index.html",
  "partnership/partner-hiring/index.html",
  "education/forex-tutorials/index.html",
  "education/account-management/index.html",
  "education/webinars/index.html",
  "announcements/index.html",
];

function indentBlock(html, spaces) {
  const pad = " ".repeat(spaces);
  return html
    .split("\n")
    .map((line) => (line ? pad + line : line))
    .join("\n");
}

function wrap(kind, slug, inner) {
  return `<!-- BEGIN inlined ${slug} (${kind}) sync: node scripts/sync-account-partials.mjs -->
${inner}
<!-- END inlined ${slug} -->`;
}

const heroLinesBody = wrap("hero-lines", "hero-lines", indentBlock(readPartial("hero-lines.html"), 8));

const pairs = [
  {
    slug: "stp-shell-utility",
    needle:
      /<div data-include="\/partials\/stp-shell-utility\.html"><\/div>|<!-- BEGIN inlined stp-shell-utility.*?<!-- END inlined stp-shell-utility -->/s,
    body: wrap("utility", "stp-shell-utility", utility),
  },
  {
    slug: "account-marketing-navbar",
    needle:
      /<div data-include="\/partials\/account-marketing-navbar\.html"><\/div>|<!-- BEGIN inlined account-marketing-navbar.*?<!-- END inlined account-marketing-navbar -->/s,
    body: wrap("navbar", "account-marketing-navbar", navbar),
  },
  {
    slug: "footer",
    needle:
      /<div data-include="\/partials\/footer\.html"><\/div>|<!-- BEGIN inlined footer.*?<!-- END inlined footer -->/s,
    body: wrap("footer", "footer", footer),
  },
];

const pageHeaderHeroBelowBody = wrap(
  "hero-below",
  "page-header-hero-below",
  indentBlock(pageHeaderHeroBelow, 6)
);

const pageHeaderHeroBelowNeedle =
  /<!-- BEGIN inlined page-header-hero-below.*?<!-- END inlined page-header-hero-below -->|<!-- BEGIN inlined page-header-ticker.*?<!-- END inlined page-header-ticker -->\n?/s;

const strategyMarketplaceMarqueeBody = wrap(
  "spreads-marquee",
  "strategy-marketplace-marquee",
  indentBlock(strategyMarketplaceMarquee, 6)
);

const strategyMarketplaceMarqueeNeedle =
  /<div data-include="\/partials\/strategy-marketplace-marquee\.html"><\/div>|<!-- BEGIN inlined strategy-marketplace-marquee.*?<!-- END inlined strategy-marketplace-marquee -->/s;

const homeSpecialServicesBody = wrap(
  "special-services",
  "home-special-services",
  indentBlock(homeSpecialServices, 4)
);

const homeSpecialServicesNeedle =
  /<!-- BEGIN inlined home-special-services.*?<!-- END inlined home-special-services -->\n?/s;

/** Homepage only — awards strip + ticker under `.stp-page-header-hero`. */
const homepageRel = "index.html";

function removePageHeaderHeroBelow(html) {
  return html.replace(pageHeaderHeroBelowNeedle, "");
}

function syncPageHeaderHeroBelow(html, rel) {
  if (rel !== homepageRel) return removePageHeaderHeroBelow(html);
  if (!html.includes("stp-page-header-hero")) return html;

  if (pageHeaderHeroBelowNeedle.test(html)) {
    return html.replace(pageHeaderHeroBelowNeedle, () => `${pageHeaderHeroBelowBody}\n`);
  }

  if (html.includes("stp-page-header-hero__below")) return html;

  return html.replace(
    /(<div class="stp-page-header-hero[^>]*>[\s\S]*?)(\n      <\/div>\n    <\/div>)/,
    (_, heroInner, close) => `${heroInner}\n${pageHeaderHeroBelowBody}${close}`
  );
}

/** Homepage only — spreads band (intro, tabs, marquee, CTAs); no fetch. */
function syncStrategyMarketplaceMarquee(html, rel) {
  if (rel !== homepageRel) return html;
  return html.replace(strategyMarketplaceMarqueeNeedle, () => `${strategyMarketplaceMarqueeBody}\n`);
}

/** Strip site-wide page intro boot if present (homepage intro is index.html only). */
function removePageIntroBoot(html) {
  return html.replace(
    /\s*<script>[\s\S]*?stp-page-intro-active[\s\S]*?<\/script>\s*<div class="stp-page-intro-loader"[\s\S]*?<!-- END stp-page-intro-boot -->\s*/g,
    "\n"
  );
}

/** All routes — animated flank lines inside `.stp-page-header-hero`. */
function syncHeroLines(html) {
  html = html.replace(/<div class="stp-page-header-hero(?!__)(\s[^"]*)?">/g, (match) => {
    if (match.includes("stp-page-header-hero--lines")) return match;
    return match.replace('">', " stp-page-header-hero--lines\">");
  });

  const heroLinesNeedle =
    /<!-- BEGIN inlined hero-lines.*?<!-- END inlined hero-lines -->\n?/s;

  html = html.replace(heroLinesNeedle, () => `${heroLinesBody}\n`);

  return html.replace(
    /(<div class="stp-page-header-hero(?!__)[^"]*stp-page-header-hero--lines[^"]*">\r?\n)(?![\s\S]{0,400}?stp-hero-lines)/g,
    `$1${heroLinesBody}\n`
  );
}

/** Homepage only — special services promo grid (Figma 156:3632). */
function syncHomeSpecialServices(html, rel) {
  if (rel !== homepageRel) return html;
  if (homeSpecialServicesNeedle.test(html)) {
    return html.replace(homeSpecialServicesNeedle, () => `${homeSpecialServicesBody}\n`);
  }
  return html.replace(
    /<!-- END inlined strategy-marketplace-marquee -->\s*\n\s*<\/section>/,
    `<!-- END inlined strategy-marketplace-marquee -->\n    </section>\n${homeSpecialServicesBody}`
  );
}

for (const rel of pages) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p)) {
    console.warn("skip (missing)", rel);
    continue;
  }
  let html = fs.readFileSync(p, "utf8");
  for (const { needle, body } of pairs) {
    html = html.replace(needle, () => body);
  }
  html = removePageIntroBoot(html);
  html = syncPageHeaderHeroBelow(html, rel);
  html = syncHeroLines(html);
  html = syncStrategyMarketplaceMarquee(html, rel);
  html = syncHomeSpecialServices(html, rel);
  if (!html.includes('data-include="')) {
    html = html.replace(/\r?\n\s*<script src="\/js\/includes\.js"><\/script>\r?\n?/, "\n");
  }
  fs.writeFileSync(p, html, "utf8");
  console.log("OK", rel);
}
