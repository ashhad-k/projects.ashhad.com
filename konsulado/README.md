# Konsulado — front-end handoff

Static HTML, CSS and JavaScript. No build step, no framework, no package
install. Upload this folder as it is and open `index.html`.

Nothing points at an external host — no CDN, no Google Fonts, no analytics —
so it works from a subfolder, from a file:// path, and behind a firewall.

## The three pages, and how they join up

    index.html      →  onboarding.html  →  konsulado.html
    the public site    setting up          the application

- **index.html** — the homepage. Every generic way in — *Enter the consulate*,
  *Enter the portal*, the sticky dock — starts the journey at the onboarding;
  nobody is dropped into a signed-in application without going through it. The
  emergency cards and several footer links do go straight into the
  application, at the view they name — an emergency is not the moment to ask
  somebody to sign up.
- **onboarding.html** — the sign-up journey. Both of its exits (*I already
  have an account*, and *Go to my home screen* at the end) land on
  `konsulado.html`. Every screen carries a *Save and finish later* link back
  to the homepage.
- **konsulado.html** — the application. The crest at the top of the sidebar
  returns to the homepage.

## Layout

    index.html            the public site — the front door
    onboarding.html       the sign-up journey
    contents.html         every page in the folder, and the deep links
    konsulado.html        the application
    favicon.svg
    assets/css/           fonts.css, core.css, ui.css and one file per module
    assets/js/            data.js, cat.js and one file per module
    assets/fonts/         *.woff2  (Funnel Display, Inter, IBM Plex Mono)
    assets/img/           *.jpg, *.svg
    assets/video/         hero-loop.mp4  (the homepage film, muted, looping)
    prototypes/           the application as one self-contained file

## The application

Every view is rendered by `window.KRENDER(name)` into `#page`. There are 83
of them and they are registered as properties on `window.KP` by the module
that owns them — `R1.js` owns the renewal, `V1.js` the vault, and so on.

Navigation is `data-go="<view>"` on any element; one delegated listener in
`E1.js` handles the lot. **The view is also in the address bar** —
`konsulado.html#docs` opens the vault, the back button works, and a view can
be linked to from anywhere.

**Link to a view by name, never by number.** The seven emergency cases are
registered twice: under `so1`…`so7`, and under `so-held`, `so-work`,
`so-death`, `so-home`, `so-wages`, `so-lost`, `so-hurt`. The homepage uses
the names. It used to use the numbers, the case list was reordered, and four
of the five emergency cards silently began opening somebody else's emergency.
The numbers are kept so old links do not break; do not add new ones.

### Where the data lives — this is the seam to build against

    assets/js/data.js     window.KI      icon set
                          window.KEVENTS dated events for the timeline
                          window.KDAYS   date helpers
                          window.KACTS   quick actions
                          window.KFEED   recent activity
                          window.KSLA    published processing times
    assets/js/cat.js      the service catalogue — 51 services
    assets/js/V1.js       window.KVAULT  the document vault
    assets/js/W1.js       window.KAPPS   applications in flight
    assets/js/PY.js       window.KRCPT   receipts

Replace those objects with fetches and nothing else has to change. The shapes
are stable; the values are examples.

### The vault's three tiers

Every document in `window.KVAULT` carries `kind`, and it is the whole trust
model of the product — do not collapse it into a boolean:

    proved   read off the document on the device and matched to a live face.
             Evidence. Nothing outside the post had to answer for it.
    given    typed or uploaded by the person. Reusable, never evidence.
    issued   sealed by this post. Anyone can verify it in seconds.

The dashboard's document card and the vault read from the same three words. If
you add a tier, add it in both.

### One rule that is not cosmetic

**This product has no link to any system outside the post.** No consular
register, no DFA feed, no PSA feed, no ICA lookup. Every screen was written so
that it is true for somebody signing up for the first time, with no history
here at all. Where a stage sits with another agency, the copy reports the last
thing *this post* did — the date a booklet went to Manila in the pouch — and
names the other agency's published turnaround as an estimate rather than a
position. When you wire this to a real backend, keep that line: a status that
implies a feed the post has not got is the one thing the client will catch.

`core.css` holds the design tokens — colour, radius, shadow, easing — as CSS
custom properties, plus the button and chip primitives. Everything else reads
from those; change a token and the whole product follows.

## The homepage

`index.html`, one file plus `assets/`. It carries its own CSS and JS inline
(about 200 KB before compression — serve it gzipped) and pulls the images, the
film and the fonts from `assets/`. GSAP 3.13 and its ScrollTrigger and
SplitText plugins are bundled into the page rather than linked, so it has no
network dependency.

The scroll-driven motion, the sticky navigation and the WebGL terrain behind
the platform section all degrade on their own: `prefers-reduced-motion` turns
the whole layer off, and every reveal sets its own from-state in script, so a
browser that never runs it still shows the page.

## Conventions worth keeping

- Status is never colour alone. Every state ships an icon and a text label.
- Minimum 34px tap target on every button and link (WCAG 2.2 target size).
- Zero horizontal overflow down to 320px; verified at 2560, 1920, 1512, 1280,
  390 and 320.
- Anything placed directly in a 12-column cell sets `height:100%`, or the row
  shows its seams.
- Rows that pair a label with a value use a container query, not a viewport
  one. The same row appears in a 260px card and an 880px panel, and only the
  row knows which.

## Before this is a real product

Two things in here are prototype data and must be settled with the post:
the **duty-officer number** (`+971 56 501 5756`, uncorroborated) and the
**consulate street number** (`851 Beirut Street`, uncorroborated; Al Qusais 3
and P.O. Box 94778 are confirmed).

## Fonts

Funnel Display (display), Inter (interface), IBM Plex Mono (reference numbers).
All self-hosted in `assets/fonts` and declared in `assets/css/fonts.css`.

