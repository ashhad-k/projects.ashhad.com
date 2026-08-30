/**
 * Static inner pages. Run: node scripts/generate-pages.mjs
 *
 * Do NOT list account-types/index.html here — the comparison hub is hand-maintained to match Figma (`2_stp_accounttypes`).
 * Product-detail routes live under /account-types/{slug}/ — see docs/account-types-foundation.md
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function buildHtml({ description, stpActive, h1, lead, bodyHtml }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="stp-active" content="${stpActive}" />
  <title>${h1} — STP Trading</title>
  <meta name="description" content="${description}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:wght@400;500;600&family=Blinker:wght@300;400;600&family=Instrument+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link href="/css/stp-tokens.css" rel="stylesheet" />
  <link href="/css/stp-layout.css" rel="stylesheet" />
  <link href="/css/stp-components.css" rel="stylesheet" />
</head>
<body class="stp-site">
  <a class="visually-hidden-focusable position-absolute top-0 start-0 p-2 bg-white" href="#main">Skip to content</a>
  <div data-include="/partials/header-utility.html"></div>
  <div class="stp-shell bg-white mb-3">
    <div data-include="/partials/header.html"></div>
    <main id="main" class="stp-container stp-page-header stp-content-block pb-5">
      <h1>${h1}</h1>
      <p class="lead">${lead}</p>
      ${bodyHtml}
    </main>
  </div>
  <div data-include="/partials/footer.html"></div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="/js/includes.js"></script>
  <script src="/js/site.js"></script>
</body>
</html>
`;
}

function defaultBody() {
  return `<p class="text-muted">Final copy and imagery will mirror the approved Figma frames for this screen.</p>`;
}

const pages = [
  { rel: "special-services/index.html", stpActive: "/special-services", h1: "Special services", lead: "Tailored solutions including risk-management tools and execution enhancements.", body: defaultBody },
  { rel: "special-services/anti-margin-call/index.html", stpActive: "/special-services/anti-margin-call", h1: "Anti margin call", lead: "Programs designed to support disciplined risk management — eligibility criteria apply.", body: defaultBody },
  { rel: "special-services/negative-margin-hedge/index.html", stpActive: "/special-services/negative-margin-hedge", h1: "Hedge in negative margin", lead: "Structured hedging workflows with supporting controls — speak with our desk about suitability.", body: defaultBody },
  { rel: "special-services/vps/index.html", stpActive: "/special-services/vps", h1: "VPS hosting", lead: "Low-latency virtual hosting for algorithmic style execution.", body: defaultBody },
  { rel: "special-services/advisory/index.html", stpActive: "/special-services/advisory", h1: "Advisory", lead: "Informational support and market education.", body: defaultBody },
  { rel: "special-services/priority/index.html", stpActive: "/special-services/priority", h1: "Priority support", lead: "Dedicated response channels for qualified account tiers.", body: defaultBody },
  { rel: "platforms/index.html", stpActive: "/platforms", h1: "Trading platforms", lead: "MetaTrader 5, STP Portal, and social trading.", body: defaultBody },
  { rel: "platforms/mt5/index.html", stpActive: "/platforms/mt5", h1: "MetaTrader 5", lead: "Advanced charting, automation, and liquidity access on desktop and mobile.", body: defaultBody },
  { rel: "platforms/stp-portal/index.html", stpActive: "/platforms/stp-portal", h1: "STP Portal", lead: "Client reporting, funding, and account services in one secure hub.", body: defaultBody },
  { rel: "platforms/social-trading/index.html", stpActive: "/platforms/social-trading", h1: "Social trading", lead: "Follow and copy strategies with transparent performance statistics.", body: defaultBody },
  { rel: "champions/index.html", stpActive: "/champions", h1: "Champions", lead: "Compete, learn, and win — program details published here.", body: defaultBody },
  { rel: "champions/faq/index.html", stpActive: "/champions/faq", h1: "Champions FAQ", lead: "Eligibility, scoring, and participation rules.", body: defaultBody },
  { rel: "champions/rules/index.html", stpActive: "/champions/rules", h1: "Champions rules", lead: "Full ruleset and compliance requirements.", body: defaultBody },
  { rel: "champions/past-winners/index.html", stpActive: "/champions/past-winners", h1: "Past winners", lead: "Archive of previous seasons and top finishers.", body: defaultBody },
  { rel: "education/index.html", stpActive: "/education", h1: "Free education", lead: "Courses, sessions, and platform walkthroughs.", body: defaultBody },
  { rel: "education/forex-tutorials/index.html", stpActive: "/education/forex-tutorials", h1: "Forex tutorials", lead: "Structured learning hub with course sections and video lessons.", body: defaultBody },
  { rel: "education/account-management/index.html", stpActive: "/education/account-management", h1: "Account management", lead: "STP Portal tutorials from registration through funding and platform setup.", body: defaultBody },
  { rel: "partnership/ib/index.html", stpActive: "/partnership/ib", h1: "Introducing broker", lead: "Revenue share and marketing support for introducers.", body: defaultBody },
  { rel: "partnership/partner-hiring/index.html", stpActive: "/partnership/partner-hiring", h1: "Partner Hiring", lead: "Join STP Trading as a partner hire — talent programmes and growth paths.", body: defaultBody },
  { rel: "about/index.html", stpActive: "/about", h1: "About STP Trading", lead: "Who we are and how we operate.", body: defaultBody },
  { rel: "blog/index.html", stpActive: "/blog", h1: "Blog", lead: "Analysis, product updates, and company news.", body: defaultBody },
  { rel: "contact/index.html", stpActive: "/contact", h1: "Contact", lead: "Reach support, sales, and media contacts.", body: defaultBody },
  { rel: "announcements/index.html", stpActive: "/announcements", h1: "Announcements", lead: "Official notices and schedules.", body: defaultBody },
  { rel: "license/index.html", stpActive: "/license", h1: "License & regulation", lead: "Corporate registrations and regulatory permissions.", body: defaultBody },
  { rel: "awards/index.html", stpActive: "/awards", h1: "Awards", lead: "Industry recognition for service and execution.", body: defaultBody },
  { rel: "faq/index.html", stpActive: "/faq", h1: "FAQs", lead: "Common questions about accounts, funding, and trading.", body: defaultBody },
  { rel: "documentation/index.html", stpActive: "/documentation", h1: "Documentation", lead: "Legal agreements, guides, and references.", body: defaultBody },
  { rel: "legal/index.html", stpActive: "/legal", h1: "Legal", lead: "Policies and jurisdictional information.", body: defaultBody },
  { rel: "legal/risk-disclosure/index.html", stpActive: "/legal/risk-disclosure", h1: "Risk disclosure", lead: "Leverage, volatility, and loss scenarios.", body: defaultBody },
  { rel: "economic-calendar/index.html", stpActive: "/economic-calendar", h1: "Economic calendar", lead: "High-impact macro events.", body: defaultBody },
  { rel: "trading-instruments/index.html", stpActive: "/trading-instruments", h1: "Trading instruments", lead: "Forex, indices, commodities, and digital assets.", body: defaultBody },
];

for (const p of pages) {
  const dir = path.join(root, path.dirname(p.rel));
  fs.mkdirSync(dir, { recursive: true });
  const description = p.lead.slice(0, 160).replace(/"/g, "'");
  const html = buildHtml({
    description,
    stpActive: p.stpActive,
    h1: p.h1,
    lead: p.lead,
    bodyHtml: p.body(),
  });
  fs.writeFileSync(path.join(root, p.rel), html, "utf8");
  console.log("Wrote", p.rel);
}
