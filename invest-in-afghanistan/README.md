# Invest in Afghanistan — website & portal prototype

Prepared for the Ministry of Industry & Commerce.
**Open `index.html` to start.** The investor/business portal opens from the
**Portal** button in the nav (→ `portal/login.html`).

---

## 1. Before handing this over

Media (images + hero videos) is fetched by a downloader so the folder is fully
self-sufficient offline:

```bash
bash download-media.sh          # or double-click download-media.command on macOS
```

That pulls every image and hero video into `media/` (~30 files, ~190 MB). After
it finishes, the whole folder works with no internet connection and can be zipped
as-is. The pages work even if you skip this — anything missing from `media/`
falls back automatically to the hosted copy on the CDN — but the zip would then
depend on that CDN.

---

## 2. What is in this folder

```
index.html … contact.html    22 finished site pages — open these
index.src.html               homepage source, before the motion layer is inlined
src/                          editable sources for most site pages (see §6)
portal/                      the investor & business portal — a multi-page app
                             (44 pages, its own build; see portal/README.md)
assets/site.css              the stylesheet, un-inlined, for reference
assets/site.js               the site chrome script (nav / mega menu / footer)
assets/motion.css / .js      smooth scroll, cursor, magnetics, footer bounce
assets/lenis.min.js          Lenis v1.1.18, vendored (MIT)
assets/LENIS-LICENSE.txt     its licence
build.py                     re-inlines assets from src/ into every site page
download-media.sh / .command fetches the media into media/
media/                       images and hero videos (run the downloader)
README.md                    this file
```

Every shipped page is **self-contained** — all CSS, JavaScript and markup are
inside the HTML file. Open any file directly and it works, no server or install.
`assets/` and `src/` are the readable sources; `build.py` inlines them into the
finished pages (see §6).

---

## 3. Site pages

| File | What it is |
|---|---|
| `index.html` | Homepage — kinetic hero, looping video, both journeys |
| `why-afghanistan.html` | Investment case, trade corridors, candid risk section |
| `industries.html` | Nine sectors, one brief each, scroll-spy index |
| `opportunities.html` | 12 live projects, filterable, with detail cards |
| `incentives.html` | Incentives, industrial parks, land allocation |
| `provinces.html` | Where to build, province by province |
| `success-stories.html` | Afghan businesses |
| `start-a-business.html` | Setup guide + **working fee calculator** |
| `legal-structures.html` | The four company forms compared |
| `business-activities.html` | Searchable activity-code catalogue |
| `fees.html` | Full fee and timing schedule |
| `services.html` | All 18 services A–Z, searchable, deep-linkable |
| `verify.html` | **Working** public licence verification demo |
| `foreign-ownership.html` | What a foreign investor may own, sector by sector |
| `required-documents.html` | **Working checklist builder** — structure × ownership × activity |
| `resources.html` | The eight instruments, and which law sits behind which service |
| `forms.html` | Downloadable templates, **searchable and filterable** |
| `faq.html` | Questions, **searchable**, filtered by topic |
| `news.html` | Newsroom |
| `news-article.html` | A single news article layout |
| `about.html` | About the Ministry |
| `contact.html` | Contact and offices |

The **portal** is a separate multi-page app under `portal/` — sign in → verify
identity → onboard → apply → pay → track → digital licence, in both a business
and an investor variant. See **`portal/README.md`** for its map and build.

Everything is cross-linked. The mega menu, mobile menu and footer are generated
from a single site map (`NAVGROUPS` / `FOOTCOLS` in `assets/site.js`), so nothing
is orphaned.

**Menu rule:** a menu entry exists only if it opens a *different page*. No entry
points at an anchor on the page it already sits under, and no entry points at a
page belonging to another section. Sections with a single destination — Services,
Verify & Search — are plain links with no dropdown. Verified: every internal
link, including every `#anchor` and every `portal/…` link, resolves.

---

## 4. Design system

| Token | Value | Use |
|---|---|---|
| Cream | `#f2efe9` | Page background |
| Cream 2 | `#f7f6f1` | Raised surfaces |
| Ink (navy) | `#0d1b26` | Text, dark panels |
| Teal | `#176f7e` | Accent panels |
| Lime | `#8ce05f` | Primary CTA fill |
| Sky | `#7dd3fc` | **All button hover states**, highlighted headline words |
| Bright cyan | `#00b4cc` | Text-link hover, active nav, progress |
| Muted | `#6f7a83` | Secondary text |
| Hairline | `rgba(13,27,38,.11)` | Borders and rules |

**Type** — Inter, weights 400/500/600/700. Display type is weight 600 with tight
negative tracking (−5% to −6.2%) and line-height 0.9–1.05. Body 15–18px at
line-height 1.55–1.68.

**Layout** — container `max-width 1760px`, `padding 0 clamp(20px, 6.2vw, 110px)`.
Full-bleed panels sit at a 6px frame inset with a 25px radius. Section padding
`clamp(70px, 8vw, 130px)`.

**Motion** — one easing curve for reveals (`cubic-bezier(.19,1,.22,1)`) and one for
images (`cubic-bezier(.16,1,.3,1)`). Every button is the same component with a
sky-blue fill sweeping up on hover. Every image scales to 1.05 over 0.85s. There
is a `prefers-reduced-motion` block and a `@media(hover:none)` block so touch
devices do not get stuck in hover states.

**Breakpoints** — 1200, 1024, 960, 820, 620, 400. Verified at 1600, 1440, 1180,
1024, 834, 768, 600, 430, 390 and 360px with no horizontal overflow.

---

## 5. Motion layer

Everything in `assets/motion.*` is progressive enhancement. With JavaScript
disabled, on a touch device, or with **prefers-reduced-motion** enabled, all of
it turns itself off and the site behaves exactly as it did before.

| Effect | What it does |
|---|---|
| **Smooth scrolling** | Lenis, vendored and inlined. Not GSAP ScrollSmoother — that is a paid Club GreenSock plugin and could not be shipped here. Lenis is MIT and gives the same feel. Native momentum is left alone on phones. |
| **Cursor** | A dot pinned to the pointer and a ring that chases it, both `mix-blend-mode: difference` so one cursor reads correctly on cream, on ink and on photography. Swells and fills over anything clickable, becomes a caret over inputs. |
| **Magnetic controls** | Buttons, the portal chip, social icons and the accordion plus-signs lean toward the cursor. Implemented with the `translate` property rather than `transform`, so it composes with the existing hover transforms. |
| **Footer bounce** | The closer arrives a beat late and overshoots on a spring curve, children staggered, with the oversized wordmark travelling furthest and landing last. |
| **Hero wordmark** | "Afghanistan" is split into letters at runtime; they rise toward the pointer with an eased falloff and the nearest turns sky blue. Recalculated once per animation frame, and the word is re-auto-fitted after splitting. |

Because Lenis disables native smooth scrolling, **every in-page `#anchor` is
routed through `window.smoothTo()`**, defined in `motion.js`. If you add a new
in-page link it is handled automatically; if you scroll programmatically, call
`window.smoothTo(el, -76)` rather than `scrollIntoView`.

---

## 6. Editing & the build step

`assets/site.css` and `assets/site.js` are the **single source of truth** for the
shared design system and chrome. `build.py` inlines them (plus the motion layer)
into every page so the shipped files stay self-contained:

```bash
python3 build.py
```

It builds `src/*.html` → the matching root page, rebuilds `index.html` from
`index.src.html` (index keeps its own chrome and only takes the motion layer),
then **link-checks every internal link** — including `portal/…` subfolder links —
and reports any that do not resolve.

**Editing rules**

* Change shared chrome / design → edit `assets/site.*`, then run `build.py`.
* Change a page's own content → edit its file in `src/`, then run `build.py`.
* **Three pages have no `src/` source** and are edited directly at the root:
  `industries.html`, `opportunities.html`, `success-stories.html`. (Give them a
  `src/` entry if you want them in the build loop.)
* The portal has its **own** build — see `portal/README.md`; running the root
  `build.py` does not touch `portal/`.

---

## 7. Notes for the developer

* **Nothing talks to a backend.** The portal, the fee calculator and the licence
  verification all run on mock data held inside the page. No payment instruction
  is sent and no credential is collected anywhere.
* **Verification demo data** is the `DB` object in `verify.html` — three cases:
  valid, expired, not found.
* **Portal demo accounts** are pre-filled; just click through. Sign-in, OTP and
  identity verification are simulated. See `portal/README.md`.
* **Content is ours, not the client's.** Figures are indicative and captioned as
  such. The Ministry supplies final numbers.
* **Photography is placeholder.** The hero videos and landscape stills were
  generated for this prototype; sector photos are stock and should be replaced.
* **Still to do:** Dari and Pashto with RTL layout, a real CMS or API behind the
  portal, and final imagery.
