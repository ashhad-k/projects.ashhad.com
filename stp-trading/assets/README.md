# STP Trading — static assets

## Layout

| Path | Use |
|------|-----|
| `logos/` | Brand marks (`stp-trading.svg`, dark variant, mark) |
| `icons/` | Reusable UI: `ui/`, `payment/`, `platforms/` |
| `bg/` | CSS backgrounds: `patterns/`, `heroes/`, `cards/` |
| `hero/` | One full-width hero PNG per route (Figma export / generator) |
| `images/` | Photos and page-specific art, grouped by route or topic |
| `fonts/` | Self-hosted fonts (if any) |

## Rules

1. **No files at `/assets/` root** — only these top-level folders.
2. **Shared chrome** → `logos/` or `icons/`, not duplicated per page.
3. **Page-only art** → `images/{route}/` (e.g. `images/home/promo-card-1.png`).
4. **Hero PNGs** → `hero/{slug}.png` (kept for the Figma download pipeline).
5. Name files by **content** (`promo-card-1.png`), not export order (`feature-02.png`).

Figma raster exports: `node scripts/download-figma-image-exports.mjs` (paths from `scripts/asset-paths.mjs`).
