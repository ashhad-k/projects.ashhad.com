#!/usr/bin/env python3
"""
Build step for the Invest in Afghanistan site.

assets/site.css and assets/site.js stay the single source of truth, but every
page is shipped fully self-contained so it works from any folder — including
straight out of a Downloads directory.

  src/*.html   ->  *.html   (with the shared CSS/JS inlined)

Also verifies that every internal link points at a file that exists.
"""
import os, re, sys, glob

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC  = os.path.join(ROOT, 'src')
def _read(*parts):
    return open(os.path.join(ROOT, *parts), encoding='utf-8').read()

CSS    = _read('assets', 'site.css')
JS     = _read('assets', 'site.js')
MCSS   = _read('assets', 'motion.css')     # smooth scroll, cursor, footer bounce
MJS    = _read('assets', 'motion.js')
LENIS  = _read('assets', 'lenis.min.js')   # vendored, MIT — see LENIS-LICENSE.txt

LINK_RE    = re.compile(r'[ \t]*<link rel="stylesheet" href="assets/site\.css">\n?')
SCRIPT_RE  = re.compile(r'[ \t]*<script src="assets/site\.js"></script>\n?')
MLINK_RE   = re.compile(r'[ \t]*<link rel="stylesheet" href="assets/motion\.css">\n?')
MSCRIPT_RE = re.compile(r'[ \t]*<script src="assets/motion\.js"></script>\n?')

def inline(html):
    """Replace every assets/* tag with the file's contents.

    Lambda replacements throughout — the CSS and JS contain backslashes that
    re.sub would otherwise treat as escape sequences in the replacement.
    """
    html = LINK_RE.sub(
        lambda m: '<style>\n/* ==== shared design system (inlined at build) ==== */\n'
                  + CSS + '\n/* ==== motion layer ==== */\n' + MCSS + '\n</style>\n',
        html, count=1)
    html = SCRIPT_RE.sub(
        lambda m: '<script>/* ==== Lenis v1.1.18 — MIT, see assets/LENIS-LICENSE.txt ==== */\n'
                  + LENIS + '\n</script>\n'
                  '<script>\n/* ==== shared site chrome (inlined at build) ==== */\n'
                  + JS + '\n</script>\n'
                  '<script>\n/* ==== motion layer (inlined at build) ==== */\n'
                  + MJS + '\n</script>\n', html, count=1)
    # index.html carries its own chrome, so it only takes the motion layer
    html = MLINK_RE.sub(
        lambda m: '<style>\n/* ==== motion layer (inlined at build) ==== */\n'
                  + MCSS + '\n</style>\n', html, count=1)
    html = MSCRIPT_RE.sub(
        lambda m: '<script>/* ==== Lenis v1.1.18 — MIT, see assets/LENIS-LICENSE.txt ==== */\n'
                  + LENIS + '\n</script>\n'
                  '<script>\n/* ==== motion layer (inlined at build) ==== */\n'
                  + MJS + '\n</script>\n', html, count=1)
    return html

def build_one(path):
    return inline(open(path, encoding='utf-8').read()), os.path.basename(path)

def main():
    if not os.path.isdir(SRC):
        print('no src/ directory'); return 1
    built = []
    for p in sorted(glob.glob(os.path.join(SRC, '*.html'))):
        html, name = build_one(p)
        out = os.path.join(ROOT, name)
        open(out, 'w', encoding='utf-8').write(html)
        built.append(name)
    print('built %d pages: %s' % (len(built), ', '.join(built)))

    # index.html lives in the root and keeps its own chrome; it only needs the
    # motion layer folded in. Kept idempotent by rebuilding from index.src.html.
    idx_src = os.path.join(ROOT, 'index.src.html')
    idx_out = os.path.join(ROOT, 'index.html')
    if os.path.exists(idx_src):
        open(idx_out, 'w', encoding='utf-8').write(inline(open(idx_src, encoding='utf-8').read()))
        print('built index.html from index.src.html')

    # ---- link check across every built page + the homepage ----
    pages = set(os.path.basename(p) for p in glob.glob(os.path.join(ROOT, '*.html')))
    missing = {}
    href_re = re.compile(r'(?:href|src)="([^"#][^"]*?)"')
    for name in sorted(built + ['index.html']):
        fp = os.path.join(ROOT, name)
        if not os.path.exists(fp):
            continue
        body = open(fp, encoding='utf-8').read()
        for h in href_re.findall(body):
            if h.startswith(('http', 'data:', 'mailto:', 'tel:', '//')):
                continue
            if "'+" in h or '${' in h:      # JS template fragments, not real links
                continue
            target = h.split('#')[0].split('?')[0]
            if not target or target.endswith(('.css', '.js', '.png', '.jpg', '.svg')):
                continue
            # subfolder links (e.g. portal/login.html) — resolve on disk
            if '/' in target:
                if not os.path.exists(os.path.join(ROOT, target)):
                    missing.setdefault(target, set()).add(name)
                continue
            if target not in pages:
                missing.setdefault(target, set()).add(name)
    if missing:
        print('\n!! BROKEN LINKS — target does not exist:')
        for t in sorted(missing):
            print('   %-28s referenced by %s' % (t, ', '.join(sorted(missing[t]))))
        return 2
    print('link check: every internal link resolves')
    return 0

if __name__ == '__main__':
    sys.exit(main())
