/**
 * Active nav: uses <meta name="stp-active" content="/path/"> or falls back to location.
 * Links may use data-nav-path (prefix match when not "/") or data-nav-paths="comma,separated"
 * for a parent whose children live under different top-level paths (e.g. Company).
 */
(function () {
  // Resolve this site's own root URL from the currently executing script tag
  // (site.js lives at "<root>/js/site.js"), so paths work under file://, a domain
  // root, or any subpath - no hardcoded folder name required.
  var SITE_ROOT_URL = (function () {
    try {
      var src = document.currentScript && document.currentScript.src;
      if (src) return new URL("..", src).href;
    } catch (e) {}
    return window.location.origin + "/";
  })();
  var SITE_ROOT_PATH = (function () {
    try {
      return new URL(SITE_ROOT_URL).pathname;
    } catch (e) {
      return "/";
    }
  })();
  function siteUrl(relPath) {
    return new URL(relPath, SITE_ROOT_URL).href;
  }
  function stripBase(p) {
    var s = String(p || "");
    if (s === SITE_ROOT_PATH || s + "/" === SITE_ROOT_PATH) return "/";
    if (s.indexOf(SITE_ROOT_PATH) === 0) return "/" + s.slice(SITE_ROOT_PATH.length);
    return s;
  }
  function normalizeNavPath(p) {
    let s = String(p || "").trim();
    if (s !== "/" && /\/index\.html$/i.test(s)) {
      s = s.replace(/\/index\.html$/i, "");
    }
    s = s.replace(/\/$/, "") || "/";
    return s || "/";
  }

  function pathMatchesTarget(normalized, target) {
    if (target === "/") return normalized === "/";
    return normalized === target || normalized.startsWith(target + "/");
  }

  function targetsFromNavLink(a) {
    const out = [];
    const multi = a.getAttribute("data-nav-paths");
    if (multi) {
      multi.split(",").forEach((piece) => {
        const t = normalizeNavPath(piece);
        if (t && !out.includes(t)) out.push(t);
      });
    }
    const single = a.getAttribute("data-nav-path");
    if (single) {
      const t = normalizeNavPath(single);
      if (!out.includes(t)) out.push(t);
    }
    return out;
  }

  /** Resolve a link's pathname to the same shape as stp-active / location (no trailing slash except "/"). */
  function hrefToNormalizedPath(anchor) {
    const href = anchor && anchor.getAttribute("href");
    if (!href || href.startsWith("#")) return "";
    try {
      const u = new URL(href, window.location.origin);
      return normalizeNavPath(stripBase(u.pathname));
    } catch {
      return "";
    }
  }

  /** Pathname + hash (lowercased) for dropdown items that share one path with different fragments. */
  function hrefToPathAndHashKey(anchor) {
    const href = anchor && anchor.getAttribute("href");
    if (!href || href.startsWith("#")) return "";
    try {
      const u = new URL(href, window.location.origin);
      const p = normalizeNavPath(stripBase(u.pathname));
      const h = (u.hash || "").toLowerCase();
      return p + h;
    } catch {
      return "";
    }
  }

  function locationPathAndHashKey() {
    const p = normalizeNavPath(stripBase(window.location.pathname));
    return p + (window.location.hash || "").toLowerCase();
  }

  function applyActiveNav() {
    const meta = document.querySelector('meta[name="stp-active"]');
    const path = stripBase(window.location.pathname).replace(/\/$/, "") || "/";
    const rawMeta = meta && meta.getAttribute("content");
    const toMatch = (rawMeta && rawMeta.trim()) || path;
    const normalized = normalizeNavPath(toMatch);

    const candidates = document.querySelectorAll("a[data-nav-path], a[data-nav-paths]");
    candidates.forEach((a) => {
      a.classList.remove("active");
      a.removeAttribute("aria-current");
    });

    candidates.forEach((a) => {
      const targets = targetsFromNavLink(a);
      const isActive = targets.some((t) => pathMatchesTarget(normalized, t));
      if (isActive) {
        a.classList.add("active");
        if (!a.classList.contains("dropdown-toggle")) {
          a.setAttribute("aria-current", "page");
        }
      }
    });

    const dropdownItems = document.querySelectorAll(
      ".stp-main-nav .dropdown-menu a.dropdown-item[href], .stp-main-navbar .dropdown-menu a.dropdown-item[href]"
    );
    dropdownItems.forEach((a) => {
      a.classList.remove("active");
      a.removeAttribute("aria-current");
    });
    const locKey = locationPathAndHashKey();
    dropdownItems.forEach((a) => {
      const href = a.getAttribute("href") || "";
      let hrefHasHash = false;
      try {
        hrefHasHash = !!new URL(href, window.location.origin).hash;
      } catch {
        hrefHasHash = href.includes("#");
      }
      const itemKey = hrefToPathAndHashKey(a);
      const itemPath = hrefToNormalizedPath(a);
      if (hrefHasHash) {
        if (itemKey && itemKey === locKey) {
          a.classList.add("active");
          a.setAttribute("aria-current", "page");
        }
      } else if (itemPath && itemPath === normalized) {
        a.classList.add("active");
        a.setAttribute("aria-current", "page");
      }
    });

    document
      .querySelectorAll(".stp-main-nav .nav-item.dropdown, .stp-main-navbar .nav-item.dropdown")
      .forEach((item) => {
        item.classList.remove("stp-nav-parent-active");
        if (item.querySelector(".dropdown-menu .dropdown-item.active")) {
          item.classList.add("stp-nav-parent-active");
        }
      });
  }

  function setFooterYear() {
    const el = document.getElementById("stp-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /** Append back-to-top control when markup is not present (requires #main). */
  function injectBackToTop() {
    if (document.querySelector(".stp-back-to-top")) return;
    const body = document.body;
    if (!body || !body.classList.contains("stp-site")) return;
    if (!document.getElementById("main")) return;

    const a = document.createElement("a");
    a.className = "stp-back-to-top";
    a.href = "#main";
    a.title = "Back to top";
    a.setAttribute("aria-label", "Back to top");
    a.setAttribute("aria-hidden", "true");
    a.tabIndex = -1;
    a.innerHTML =
      '<svg class="stp-back-to-top__arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<path d="M6 15 12 9l6 6" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />' +
      "</svg>";
    body.appendChild(a);
  }

  /**
   * Back-to-top: show after one viewport scroll OR 1000px (whichever is less distance).
   * Fade in via .is-visible + CSS (body.stp-site .stp-back-to-top in stp-components.css).
   */
  function initBackToTopVisibility() {
    const btn = document.querySelector(".stp-back-to-top");
    if (!btn || btn.dataset.stpScrollBound === "1") return;
    btn.dataset.stpScrollBound = "1";

    function scrollThresholdPx() {
      const vh = window.innerHeight || 0;
      return Math.min(1000, vh);
    }

    function update() {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      const show = y >= scrollThresholdPx();
      btn.classList.toggle("is-visible", show);
      btn.setAttribute("aria-hidden", show ? "false" : "true");
      btn.tabIndex = show ? 0 : -1;
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("stp:scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", update, { passive: true });
    }
    update();
  }

  /** HonorPro-style mobile panel: close menu after navigation; lock body scroll while open. */
  function initMobileNav() {
    const configs = [
      { id: "stpNavMarketing", mq: "(max-width: 991.98px)" },
      { id: "stpChromeNav", mq: "(max-width: 1199.98px)" },
    ];

    configs.forEach(function (cfg) {
      const collapse = document.getElementById(cfg.id);
      if (!collapse || collapse.dataset.stpMobileNavInit === "1") return;
      collapse.dataset.stpMobileNavInit = "1";

      const mq = window.matchMedia(cfg.mq);

      function isMobileNav() {
        return mq.matches;
      }

      function setBodyNavOpen(open) {
        if (open && isMobileNav()) {
          document.body.classList.add("stp-mobile-nav-open");
        } else if (!document.querySelector(".navbar-collapse.show")) {
          document.body.classList.remove("stp-mobile-nav-open");
        }
      }

      collapse.addEventListener("shown.bs.collapse", function () {
        setBodyNavOpen(true);
      });
      collapse.addEventListener("hidden.bs.collapse", function () {
        document.body.classList.remove("stp-mobile-nav-open");
      });

      collapse
        .querySelectorAll(
          'a.dropdown-item[href], a.nav-link:not(.dropdown-toggle)[href], a.stp-nav-dd--plain[href]'
        )
        .forEach(function (a) {
          const href = a.getAttribute("href");
          if (!href || href === "#") return;
          a.addEventListener("click", function () {
            if (!isMobileNav()) return;
            const inst =
              typeof bootstrap !== "undefined" && bootstrap.Collapse
                ? bootstrap.Collapse.getInstance(collapse)
                : null;
            if (inst) inst.hide();
          });
        });

      mq.addEventListener("change", function () {
        if (!isMobileNav()) document.body.classList.remove("stp-mobile-nav-open");
      });
    });
  }

  /** Pinned marketing nav in .stp-page-header-shell (all routes using account-marketing-navbar). */
  function initPinnedPageNav() {
    const utilMq = window.matchMedia("(min-width: 768px)");

    document.querySelectorAll(".stp-page-header-shell").forEach(function (shell) {
      const nav = shell.querySelector(":scope > .stp-container.stp-container--fluid");
      if (!nav || !nav.querySelector(".stp-main-nav")) return;
      if (shell.dataset.stpNavPinInit === "1") return;
      shell.dataset.stpNavPinInit = "1";

      function updatePin() {
        document.documentElement.style.setProperty("--stp-nav-pinned-height", nav.offsetHeight + "px");
        const util = document.querySelector(".stp-utility-shell");
        let top = 0;
        if (util && utilMq.matches) {
          top = Math.max(0, util.getBoundingClientRect().bottom);
        }
        nav.style.top = top + "px";
      }

      updatePin();
      window.addEventListener("resize", updatePin, { passive: true });
      window.addEventListener("scroll", updatePin, { passive: true });
      window.addEventListener("stp:scroll", updatePin, { passive: true });
      utilMq.addEventListener("change", updatePin);
    });
  }

  var STP_DD_CHEVRON =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="m6 9 6 6 6-6" /></svg>';
  var STP_DD_CHECK =
    '<svg class="stp-dd__check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="m20 6-11 11-5-5"/></svg>';

  function initPillDropdowns() {
    var dropdowns = Array.from(document.querySelectorAll(".stp-dd"));
    dropdowns.forEach(function (dd) {
      if (dd.dataset.stpDdInit === "true") return;
      dd.dataset.stpDdInit = "true";
      dd.dataset.open = dd.dataset.open || "false";

      var btn = dd.querySelector(".stp-pill");
      var menu = dd.querySelector(".stp-dd__menu");
      if (!btn || !menu) return;

      function closeDd() {
        dd.dataset.open = "false";
        btn.setAttribute("aria-expanded", "false");
      }

      function openDd() {
        dropdowns.forEach(function (other) {
          if (other === dd) return;
          other.dataset.open = "false";
          var otherBtn = other.querySelector(".stp-pill");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        });
        dd.dataset.open = "true";
        btn.setAttribute("aria-expanded", "true");
        var firstItem =
          menu.querySelector('.stp-dd__item[aria-checked="true"]') || menu.querySelector(".stp-dd__item");
        if (firstItem) firstItem.focus({ preventScroll: true });
      }

      function toggleDd() {
        if (dd.dataset.open === "true") {
          closeDd();
          btn.focus({ preventScroll: true });
          return;
        }
        openDd();
      }

      btn.addEventListener("click", function (e) {
        e.preventDefault();
        toggleDd();
      });

      btn.addEventListener("keydown", function (e) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openDd();
        }
      });

      menu.addEventListener("keydown", function (e) {
        var items = Array.from(menu.querySelectorAll(".stp-dd__item"));
        if (!items.length) return;
        var active = document.activeElement;
        var idx = Math.max(0, items.indexOf(active));

        if (e.key === "Escape") {
          e.preventDefault();
          closeDd();
          btn.focus({ preventScroll: true });
          return;
        }
        if (e.key === "ArrowDown") {
          e.preventDefault();
          items[Math.min(items.length - 1, idx + 1)].focus({ preventScroll: true });
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          items[Math.max(0, idx - 1)].focus({ preventScroll: true });
          return;
        }
        if (e.key === "Home") {
          e.preventDefault();
          items[0].focus({ preventScroll: true });
          return;
        }
        if (e.key === "End") {
          e.preventDefault();
          items[items.length - 1].focus({ preventScroll: true });
          return;
        }
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (active && active.classList.contains("stp-dd__item")) active.click();
        }
      });
    });

    if (dropdowns.length && !document.documentElement.dataset.stpDdGlobalBound) {
      document.documentElement.dataset.stpDdGlobalBound = "1";
      document.addEventListener("click", function (e) {
        if (e.target.closest(".stp-dd")) return;
        document.querySelectorAll(".stp-dd").forEach(function (dd) {
          dd.dataset.open = "false";
          var b = dd.querySelector(".stp-pill");
          if (b) b.setAttribute("aria-expanded", "false");
        });
      });
      document.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        document.querySelectorAll(".stp-dd").forEach(function (dd) {
          dd.dataset.open = "false";
          var b = dd.querySelector(".stp-pill");
          if (b) b.setAttribute("aria-expanded", "false");
        });
      });
    }
  }

  function syncSignalTabsDropdown(tabList, dd) {
    if (!dd) return;
    var tabs = Array.from(tabList.querySelectorAll(".stp-signal-tab"));
    var activeTab = tabList.querySelector(".stp-signal-tab--active") || tabs[0];
    var labelNode = dd.querySelector("[data-dd-label]");
    if (labelNode && activeTab) labelNode.textContent = activeTab.textContent.trim();

    var items = Array.from(dd.querySelectorAll(".stp-dd__item"));
    items.forEach(function (item, i) {
      var tab = tabs[i];
      var active = tab && tab === activeTab;
      item.setAttribute("aria-checked", active ? "true" : "false");
    });
  }

  function buildSignalTabsDropdown(tabList) {
    var menuLabel = tabList.getAttribute("aria-label") || "Categories";
    var tabs = Array.from(tabList.querySelectorAll(".stp-signal-tab"));
    var activeTab = tabList.querySelector(".stp-signal-tab--active") || tabs[0];
    var dd = document.createElement("div");
    dd.className = "stp-dd stp-signal-tabs-dd";
    dd.dataset.open = "false";

    var btn = document.createElement("button");
    btn.className = "stp-pill";
    btn.type = "button";
    btn.setAttribute("aria-haspopup", "menu");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML =
      '<span data-dd-label>' + (activeTab ? activeTab.textContent.trim() : "") + "</span>" + STP_DD_CHEVRON;

    var menu = document.createElement("div");
    menu.className = "stp-dd__menu";
    menu.setAttribute("role", "menu");
    menu.setAttribute("aria-label", menuLabel);

    tabs.forEach(function (tab, i) {
      var item = document.createElement("button");
      item.className = "stp-dd__item";
      item.type = "button";
      item.setAttribute("role", "menuitemradio");
      item.setAttribute("aria-checked", tab.classList.contains("stp-signal-tab--active") ? "true" : "false");
      item.dataset.tabIndex = String(i);
      item.innerHTML = "<span>" + tab.textContent.trim() + "</span>" + STP_DD_CHECK;
      menu.appendChild(item);
    });

    dd.appendChild(btn);
    dd.appendChild(menu);
    return dd;
  }

  function initSignalTabs() {
    document.querySelectorAll(".stp-signal-tabs").forEach(function (tabList) {
      if (tabList.dataset.stpTabsInit === "true") return;
      tabList.dataset.stpTabsInit = "true";

      var switcher = tabList.closest(".stp-signal-tabs-switcher");
      if (!switcher) {
        switcher = document.createElement("div");
        switcher.className = "stp-signal-tabs-switcher";
        tabList.parentNode.insertBefore(switcher, tabList);
        switcher.appendChild(tabList);
      }

      var dd = switcher.querySelector(".stp-signal-tabs-dd");
      if (!dd) {
        dd = buildSignalTabsDropdown(tabList);
        switcher.appendChild(dd);
      }

      function setActiveTab(activeBtn) {
        var tabs = Array.from(tabList.querySelectorAll(".stp-signal-tab"));
        tabs.forEach(function (t) {
          var active = t === activeBtn;
          t.classList.toggle("stp-signal-tab--active", active);
          t.setAttribute("aria-selected", active ? "true" : "false");
        });
        syncSignalTabsDropdown(tabList, dd);
      }

      tabList.addEventListener("click", function (e) {
        var btn = e.target.closest(".stp-signal-tab");
        if (!btn) return;
        setActiveTab(btn);
      });

      var menu = dd.querySelector(".stp-dd__menu");
      if (menu && menu.dataset.stpSignalMenuBound !== "true") {
        menu.dataset.stpSignalMenuBound = "true";
        menu.addEventListener("click", function (e) {
          var item = e.target.closest(".stp-dd__item");
          if (!item) return;
          var tabs = Array.from(tabList.querySelectorAll(".stp-signal-tab"));
          var idx = Number(item.dataset.tabIndex);
          var tab = tabs[idx];
          if (!tab) return;
          setActiveTab(tab);

          var labelNode = dd.querySelector("[data-dd-label]");
          if (labelNode) labelNode.textContent = tab.textContent.trim();

          var items = Array.from(menu.querySelectorAll(".stp-dd__item"));
          items.forEach(function (it) {
            it.setAttribute("aria-checked", it === item ? "true" : "false");
          });

          dd.dataset.open = "false";
          var pillBtn = dd.querySelector(".stp-pill");
          if (pillBtn) {
            pillBtn.setAttribute("aria-expanded", "false");
            pillBtn.focus({ preventScroll: true });
          }
        });
      }

      syncSignalTabsDropdown(tabList, dd);
    });

    initPillDropdowns();
  }

  function initHomeHeroIntro() {
    if (!document.body.hasAttribute("data-stp-home-hero-intro")) return;

    function loadScript(src) {
      var existing = document.querySelector('script[src="' + src + '"]');
      if (existing) return;
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      document.body.appendChild(script);
    }

    loadScript(siteUrl("js/stp-home-hero-intro.js"));
  }

  function initLocomotiveSite() {
    if (!document.body.classList.contains("stp-site")) return;

    function loadScript(src, onLoad) {
      var existing = document.querySelector('script[src="' + src + '"]');
      if (existing) {
        if (onLoad) {
          if (existing.dataset.stpLoaded === "1") onLoad();
          else existing.addEventListener("load", onLoad, { once: true });
        }
        return;
      }
      var script = document.createElement("script");
      script.src = src;
      script.async = false;
      if (onLoad) {
        script.addEventListener(
          "load",
          function () {
            script.dataset.stpLoaded = "1";
            onLoad();
          },
          { once: true }
        );
      }
      document.body.appendChild(script);
    }

    function bootLocomotiveSite() {
      if (typeof window.stpLocomotiveRescanReveals === "function") {
        window.stpLocomotiveRescanReveals();
        return;
      }
      loadScript(siteUrl("js/locomotive-site.js"));
    }

    function startLocomotiveSite() {
      if (typeof LocomotiveScroll === "function") {
        bootLocomotiveSite();
        return;
      }

      loadScript(siteUrl("js/vendor/locomotive-scroll.min.js"), bootLocomotiveSite);
    }

    if (document.body.hasAttribute("data-stp-home-hero-intro")) {
      var locomotiveBooted = false;

      function safeBootLocomotive() {
        if (locomotiveBooted) return;
        locomotiveBooted = true;
        startLocomotiveSite();
      }

      window.addEventListener("stp:home-hero-intro-done", safeBootLocomotive, { once: true });
      window.setTimeout(safeBootLocomotive, 10000);
      return;
    }

    startLocomotiveSite();
  }

  /** Layout/chrome init — safe before partial injection (pinned nav, scroll, mobile menu). */
  /**
   * Mega-menu controller for .stp-main-nav: hover-to-open panels on desktop
   * (≥992px), tap-to-expand accordion on mobile. Toggles the .show class on the
   * .nav-item.dropdown and its .dropdown-menu (no Bootstrap dropdown JS), so the
   * existing CSS + applyActiveNav() keep working. Desktop clicks on a top-level
   * label fall through to its overview page; mobile clicks expand the accordion.
   */
  function initMegaNav() {
    var hoverMQ = window.matchMedia("(min-width: 992px)");
    document.querySelectorAll(".stp-main-nav").forEach(function (nav) {
      if (nav.dataset.stpMegaInit === "true") return;
      nav.dataset.stpMegaInit = "true";

      var items = Array.from(nav.querySelectorAll(".nav-item.dropdown.stp-has-mega"));
      if (!items.length) return;
      var closeTimer;

      function setOpen(item, open) {
        item.classList.toggle("show", open);
        var menu = item.querySelector(".dropdown-menu");
        var tog = item.querySelector(".dropdown-toggle");
        if (menu) menu.classList.toggle("show", open);
        if (tog) tog.setAttribute("aria-expanded", open ? "true" : "false");
      }
      function openItem(item) {
        clearTimeout(closeTimer);
        items.forEach(function (o) {
          if (o !== item) setOpen(o, false);
        });
        setOpen(item, true);
      }
      function closeItem(item) {
        setOpen(item, false);
      }
      function closeAll() {
        items.forEach(function (o) {
          setOpen(o, false);
        });
      }

      items.forEach(function (item) {
        var tog = item.querySelector(".dropdown-toggle");

        item.addEventListener("mouseenter", function () {
          if (hoverMQ.matches) openItem(item);
        });
        item.addEventListener("mouseleave", function () {
          if (!hoverMQ.matches) return;
          clearTimeout(closeTimer);
          closeTimer = setTimeout(function () {
            closeItem(item);
          }, 160);
        });

        // Keyboard: focusing into the item opens it; leaving it closes (desktop)
        item.addEventListener("focusin", function () {
          if (hoverMQ.matches) openItem(item);
        });
        item.addEventListener("focusout", function (e) {
          if (!hoverMQ.matches) return;
          if (!item.contains(e.relatedTarget)) closeItem(item);
        });

        if (tog) {
          tog.addEventListener("click", function (e) {
            if (hoverMQ.matches) return; // desktop: navigate to overview page
            e.preventDefault(); // mobile: toggle accordion
            var isOpen = item.classList.contains("show");
            items.forEach(function (o) {
              if (o !== item) setOpen(o, false);
            });
            setOpen(item, !isOpen);
          });
          tog.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
              closeItem(item);
              tog.focus({ preventScroll: true });
            }
          });
        }
      });

      if (hoverMQ.addEventListener) {
        hoverMQ.addEventListener("change", closeAll);
      }

      if (!document.documentElement.dataset.stpMegaGlobalBound) {
        document.documentElement.dataset.stpMegaGlobalBound = "1";
        document.addEventListener("click", function (e) {
          if (e.target.closest(".stp-main-nav .nav-item.dropdown.stp-has-mega")) return;
          document.querySelectorAll(".stp-main-nav .nav-item.dropdown.stp-has-mega.show").forEach(function (it) {
            it.classList.remove("show");
            var m = it.querySelector(".dropdown-menu");
            var t = it.querySelector(".dropdown-toggle");
            if (m) m.classList.remove("show");
            if (t) t.setAttribute("aria-expanded", "false");
          });
        });
        document.addEventListener("keydown", function (e) {
          if (e.key !== "Escape") return;
          document.querySelectorAll(".stp-main-nav .nav-item.dropdown.stp-has-mega.show").forEach(function (it) {
            it.classList.remove("show");
            var m = it.querySelector(".dropdown-menu");
            var t = it.querySelector(".dropdown-toggle");
            if (m) m.classList.remove("show");
            if (t) t.setAttribute("aria-expanded", "false");
          });
        });
      }
    });
  }

  /**
   * Language selector: updates the pill (flag + label) and the active check when a
   * language is chosen. Visual-only for now — no i18n routing is wired up yet.
   */
  function initLangSelector() {
    document.querySelectorAll(".stp-lang-nav").forEach(function (nav) {
      if (nav.dataset.stpLangInit === "true") return;
      nav.dataset.stpLangInit = "true";

      var flag = nav.querySelector(".stp-lang-pill__flag");
      var code = nav.querySelector(".stp-lang-pill__code");
      var name = nav.querySelector(".stp-lang-pill__name");
      var opts = Array.from(nav.querySelectorAll(".stp-lang-opt"));

      opts.forEach(function (opt) {
        opt.addEventListener("click", function (e) {
          e.preventDefault();
          opts.forEach(function (o) {
            o.classList.remove("is-selected");
            o.removeAttribute("aria-current");
          });
          opt.classList.add("is-selected");
          opt.setAttribute("aria-current", "true");

          if (flag && opt.dataset.flag) flag.setAttribute("src", opt.dataset.flag);
          if (code && opt.dataset.code) code.textContent = opt.dataset.code;
          if (name) {
            var label = opt.dataset.label || "";
            var region = opt.dataset.region
              ? ' <span class="stp-lang-pill__region">' + opt.dataset.region + "</span>"
              : "";
            name.innerHTML = label + region;
          }
        });
      });
    });
  }

  function runCoreSiteInit() {
    setFooterYear();
    injectBackToTop();
    initBackToTopVisibility();
    initMobileNav();
    initMegaNav();
    initLangSelector();
    initPinnedPageNav();
    initSignalTabs();
    initHomeHeroIntro();
    initLocomotiveSite();
  }

  function runSiteInit() {
    applyActiveNav();
    runCoreSiteInit();
  }

  document.addEventListener("stp:partials-ready", function () {
    runSiteInit();
  });
  document.addEventListener("shown.bs.dropdown", function () {
    applyActiveNav();
  });
  if (!document.querySelector("[data-include]")) {
    runSiteInit();
  } else {
    runCoreSiteInit();
  }
})();
