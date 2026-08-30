/**
 * includes.js — Partial injection for data-include attributes.
 * Works on HTTP servers rooted at your project (Live Server, Vite static, nginx, etc.).
 * Uses fetch with no-cache during development patterns; dispatches stp:partials-ready when done.
 */
(function () {
  'use strict';

  /**
   * @param {string} includePath — e.g. "/partials/footer.html"
   * @returns {string[]}
   */
  /**
   * e.g. /partials/footer.html → correct URL from /account-types/zero/index.html → ../../partials/footer.html
   */
  function rootedPartialsFromPage(includePath) {
    let dirPath = location.pathname;
    if (!dirPath.endsWith('/')) {
      dirPath = dirPath.replace(/\/[^/]*$/, '/');
    }
    const depth = dirPath.split('/').filter(Boolean).length;
    const rel = (depth ? '../'.repeat(depth) : '') + includePath.replace(/^\//, '');
    return new URL(rel, window.location.href).href;
  }

  function resolveCandidateUrls(includePath) {
    const origin = window.location.origin;
    const pathsToTry = [];

    const metaRoot = document.querySelector('meta[name="stp-asset-prefix"]');
    const prefixRaw = metaRoot ? metaRoot.getAttribute('content') || '' : '';
    const prefix = prefixRaw.replace(/\/?$/, '');

    if (includePath.startsWith('/')) {
      pathsToTry.push(rootedPartialsFromPage(includePath));
      pathsToTry.push(origin + (prefix ? prefix + includePath : includePath));
      pathsToTry.push(new URL(includePath.replace(/^\//, ''), origin + '/').href);
    } else {
      pathsToTry.push(new URL(includePath, window.location.href).href);
    }

    return [...new Set(pathsToTry)];
  }

  /**
   * @param {HTMLElement} el
   * @returns {Promise<void>}
   */
  async function loadInclude(el) {
    const src = el.getAttribute('data-include');
    if (!src) return;

    const bust = /\b(debug|devtools|localhost)\b/i.test(location.hostname || '');
    const qs = bust ? '?t=' + String(Date.now()) : '';

    const urls = resolveCandidateUrls(src);
    let lastErr = '';

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i] + qs;
      try {
        const res = await fetch(url, { cache: 'no-cache' });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const html = await res.text();
        el.outerHTML = html;
        return;
      } catch (err) {
        lastErr = err && err.message ? err.message : String(err);
      }
    }

    console.warn('[includes.js] Failed to load:', src, lastErr || '(unknown)');
    el.setAttribute('data-include-error', '1');
    el.innerHTML =
      '<p style="margin:24px;color:#721c24;background:#f8d7da;border:1px solid #f5c6cb;border-radius:12px;padding:16px;text-align:center">Could not load <code>' +
      encodeURI(src).replace(/</g, '') +
      '</code>. Serve this site over HTTP (Live Server / dev server); file:// URLs cannot fetch partials. Check the console.</p>';
  }

  async function init() {
    const elements = document.querySelectorAll('[data-include]');
    await Promise.all(Array.from(elements).map((el) => loadInclude(el)));
    document.dispatchEvent(new CustomEvent('stp:partials-ready', { bubbles: true }));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => init().catch(console.error));
  } else {
    init().catch(console.error);
  }
})();
