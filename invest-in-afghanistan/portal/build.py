#!/usr/bin/env python3
"""
Build step for the Invest in Afghanistan — Investor & Business Portal.

assets/portal.css and assets/portal.js are the single source of truth, but
every page ships fully self-contained so it works from any folder (including
straight out of a Downloads directory, or wherever the backend developer
mounts it).

  src/*.html   ->  *.html   (with the shared CSS/JS inlined)

Also verifies that every internal link points at a page that exists.
"""
import os, re, sys, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC  = os.path.join(ROOT, 'src')

def _read(*p):
    return open(os.path.join(ROOT, *p), encoding='utf-8').read()

CSS   = _read('assets', 'portal.css')
JS    = _read('assets', 'portal.js')
APP   = _read('assets', 'app.js')
VIEWS = _read('assets', 'views.js')

LINK_RE   = re.compile(r'[ \t]*<link rel="stylesheet" href="assets/portal\.css">\n?')
SCRIPT_RE = re.compile(r'[ \t]*<script src="assets/portal\.js"></script>\n?')
APP_RE    = re.compile(r'[ \t]*<script src="assets/app\.js"></script>\n?')
VIEWS_RE  = re.compile(r'[ \t]*<script src="assets/views\.js"></script>\n?')

def inline(html):
    html = LINK_RE.sub(
        lambda m: '<style>\n/* ==== portal design system (inlined at build) ==== */\n'
                  + CSS + '\n</style>\n', html, count=1)
    html = SCRIPT_RE.sub(
        lambda m: '<script>\n/* ==== portal behaviour (inlined at build) ==== */\n'
                  + JS + '\n</script>\n', html, count=1)
    html = APP_RE.sub(
        lambda m: '<script>\n/* ==== portal data model (inlined at build) ==== */\n'
                  + APP + '\n</script>\n', html, count=1)
    html = VIEWS_RE.sub(
        lambda m: '<script>\n/* ==== portal views (inlined at build) ==== */\n'
                  + VIEWS + '\n</script>\n', html, count=1)
    return html

def main():
    if not os.path.isdir(SRC):
        print('no src/ directory'); return 1
    built = []
    for p in sorted(glob.glob(os.path.join(SRC, '*.html'))):
        name = os.path.basename(p)
        open(os.path.join(ROOT, name), 'w', encoding='utf-8').write(inline(_read('src', name)))
        built.append(name)
    print('built %d portal pages: %s' % (len(built), ', '.join(built)))

    pages = set(os.path.basename(p) for p in glob.glob(os.path.join(ROOT, '*.html')))
    href_re = re.compile(r'(?:href|src)="([^"#][^"]*?)"')
    missing = {}
    for name in built:
        body = _read(name)
        for h in href_re.findall(body):
            if h.startswith(('http', 'data:', 'mailto:', 'tel:', '//')):
                continue
            if "'+" in h or '${' in h:
                continue
            target = h.split('#')[0].split('?')[0]
            if not target or target.endswith(('.css', '.js', '.png', '.jpg', '.svg')):
                continue
            # links into the parent website (../foo.html) — resolve on disk
            if target.startswith('../'):
                if os.path.exists(os.path.join(ROOT, target)):
                    continue
                missing.setdefault(target, set()).add(name)
                continue
            if target not in pages:
                missing.setdefault(target, set()).add(name)
    if missing:
        print('\n!! BROKEN LINKS:')
        for t in sorted(missing):
            print('   %-26s referenced by %s' % (t, ', '.join(sorted(missing[t]))))
        return 2
    print('link check: every internal link resolves')
    return 0

if __name__ == '__main__':
    sys.exit(main())
