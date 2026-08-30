/**
 * Site-wide Locomotive Scroll v5 + staggered fade-up reveals for section copy and cards.
 */
(function () {
  if (!document.body.classList.contains("stp-site")) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isHomePage = document.body.classList.contains("stp-page-home");

  var AOS_WHOLE_CARD_SELECTOR = [
    ".stp-promo-card",
    ".stp-home-acct-card",
    ".stp-home-market-tools__card",
    ".stp-award-card",
    ".stp-acct-card",
    ".stp-step-card",
    ".stp-feature-card",
    ".stp-feat-pill-card",
    ".stp-dark-info-card",
    ".stp-service-card",
    ".stp-service-panel",
    ".stp-service-cta",
    ".stp-contact-card",
    ".stp-tool-card",
    ".stp-dl-card",
    ".stp-doc-card",
    ".stp-license-card",
    ".stp-ti-tool-card",
    ".stp-ib-term-card",
    ".stp-ib-growth-card",
    ".stp-ib-maximizer__card",
    ".stp-edu-quick-card",
    ".stp-signal-card",
    ".stp-signal-stat",
    ".stp-champ-cc-card",
    ".stp-cta-banner",
    ".stp-compare-card",
    ".stp-nmh-takeaway",
    ".stp-mkt-card",
    ".stp-about-story-highlight",
    ".stp-vps-feat",
    ".stp-priority-feat",
  ].join(",");

  var AOS_CARD_SKIP_ANCESTOR = [
    ".stp-signal-marquee",
    ".stp-footer",
    "footer",
    ".stp-main-nav",
    ".stp-main-navbar",
  ].join(",");

  var AOS_EXCLUDE_ANCESTOR = [
    ".stp-cert-tile",
    ".stp-main-nav",
    ".stp-main-navbar",
    ".stp-footer",
    "footer",
    ".visually-hidden",
  ].join(",");

  var AOS_KICKER_SELECTOR = [
    ".stp-feat-mosaic__kicker",
    ".stp-acct-kicker",
    ".stp-edu-section-head__kicker",
    ".stp-platform-dl__kicker",
    ".stp-about-story-visual__kicker",
    ".stp-about-story-panel__kicker",
    ".stp-ib-maximizer__kicker",
    ".stp-hero-kicker",
    ".stp-company-kicker",
    ".stp-acct-details__kicker",
    ".stp-home-account-types__payments-kicker",
    ".stp-champ-kicker",
    ".stp-service-kicker",
  ].join(",");

  var AOS_PRETITLE_SELECTOR = ".stp-feat-mosaic__pretitle, .stp-honor-pretitle";

  var AOS_TITLE_SELECTOR = [
    ".stp-feat-mosaic__title",
    ".stp-split-hero__title",
    ".stp-home-hero__title",
    ".stp-home-traders-first__title",
    ".stp-acct-details__title",
    ".stp-acct-section-title",
    ".stp-edu-section-head__title",
    ".stp-platform-dl__title",
    ".stp-about-story-panel__title",
    ".stp-about-story-visual__title",
    ".stp-company-section-title",
    ".stp-ib-maximizer__title",
    ".stp-trust-banner h2",
    ".stp-champ-h2",
    ".stp-service-h2",
  ].join(",");

  var AOS_LEAD_SELECTOR = [
    ".stp-home-hero__tagline",
    ".stp-home-traders-first__lead",
    ".stp-split-hero__lead",
    ".stp-home-hero__lead",
  ].join(",");

  var AOS_CARD_TITLE_SELECTOR = [
    ".stp-promo-card__title",
    ".stp-home-market-tools__card-title",
    ".stp-feat-pill-card__title",
    ".stp-feature-card__title",
    ".stp-dark-info-card__title",
    ".stp-about-story-highlight__title",
    ".stp-doc-card__title",
    ".stp-license-card__title",
    ".stp-champ-round-title",
    ".stp-ib-term-card__title",
    ".stp-champ-cc-card h3",
    ".stp-vps-feat__title",
  ].join(",");

  var AOS_EXTRA_SELECTOR = [
    ".stp-spreads-band__tabs-row",
    ".stp-spreads-band__actions",
    ".stp-home-hero__actions",
    ".stp-split-hero__actions",
    ".stp-home-cta-pair",
    ".stp-home-account-types__actions",
    ".stp-home-trading-platform__actions",
    ".stp-home-market-tools__actions",
    ".stp-home-trading-conditions__actions",
    ".stp-home-traders-first__actions",
    ".stp-home-account-types__payments-kicker",
    ".stp-platform-dl__actions",
  ].join(",");

  var SECTION_INNER_GROUP_SELECTOR = [
    ":scope > .container.stp-acct-section",
    ":scope > .container > .stp-acct-section",
    ".stp-acct-details",
    ".stp-edu-section-head",
    ".stp-feature-strip",
    ".stp-trust-banner",
    ".stp-about-story-visual",
    ".stp-about-story-panel",
    ".stp-about-story-highlights",
    ".stp-platform-dl__copy",
    ".stp-ib-maximizer",
    ".stp-service-cards",
    ".stp-signal-stats",
    ".stp-edu-quick-grid",
    ".stp-home-services-grid",
    ".stp-home-account-types__grid",
    ".stp-home-market-tools__grid",
  ].join(",");

  var AOS_REVEAL_GRID_SELECTOR = [
    ".stp-feature-strip",
    ".stp-service-cards",
    ".stp-edu-quick-grid",
    ".stp-home-services-grid",
    ".stp-home-account-types__grid",
    ".stp-home-market-tools__grid",
    ".stp-signal-stats",
    ".stp-about-story-highlights",
    ".row.g-4",
    ".row",
    ".container",
    "section",
  ].join(",");

  var STAGGER_MS = 320;
  var REVEAL_DURATION_MS = 1300;
  var locoStaggerGroups = typeof WeakMap === "function" ? new WeakMap() : null;
  var locoStaggerGroupsFallback = [];

  var scroll = null;
  var aosObserver = null;
  var staggerGroupObserver = null;
  var locoRevealPendingResize = false;

  function staggerDelay(stepIndex) {
    return stepIndex * STAGGER_MS;
  }

  function maxItemDelay(items) {
    var max = 0;
    items.forEach(function (item) {
      max = Math.max(max, item.delay || 0);
    });
    return max;
  }

  function viewportHeight() {
    return window.innerHeight || document.documentElement.clientHeight || 1;
  }

  function hasViewportOverlap(container) {
    if (!container) return false;

    var rect = container.getBoundingClientRect();
    var vh = viewportHeight();
    return rect.bottom > 0 && rect.top < vh;
  }

  function isFullyOutsideViewport(container) {
    if (!container) return true;

    var rect = container.getBoundingClientRect();
    var vh = viewportHeight();
    var margin = vh * 0.04;
    return rect.bottom < -margin || rect.top > vh + margin;
  }

  function shouldRevealStaggerGroup(container) {
    return container.dataset.stpStaggerActive !== "1" && hasViewportOverlap(container);
  }

  function shouldResetStaggerGroup(container) {
    if (container.dataset.stpStaggerActive !== "1" && container.dataset.stpStaggerComplete !== "1") {
      return false;
    }

    if (container.dataset.stpStaggerRevealing === "1" && hasViewportOverlap(container)) {
      return false;
    }

    return isFullyOutsideViewport(container);
  }

  function initStaggerGroupObserver() {
    if (staggerGroupObserver || reducedMotion) return;

    staggerGroupObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var container = entry.target;
          var handlers = locoStaggerGroups ? locoStaggerGroups.get(container) : null;

          if (!handlers) {
            var fallback = locoStaggerGroupsFallback.find(function (item) {
              return item.container === container;
            });
            handlers = fallback && fallback.handlers;
          }
          if (!handlers) return;

          if (entry.isIntersecting) {
            if (container.dataset.stpStaggerActive !== "1") handlers.reveal();
            return;
          }

          if (container.dataset.stpStaggerActive === "1" || container.dataset.stpStaggerComplete === "1") {
            handlers.reset();
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );
  }

  function observeStaggerGroup(container) {
    if (!container || container.dataset.stpStaggerObserved === "1") return;

    container.dataset.stpStaggerObserved = "1";

    if (reducedMotion) return;

    initStaggerGroupObserver();
    if (staggerGroupObserver) {
      staggerGroupObserver.observe(container);
    }
  }

  function prefersLocomotiveReveal() {
    return !reducedMotion;
  }

  function shouldSkipCardReveal(el) {
    return !!(el && el.closest(AOS_CARD_SKIP_ANCESTOR));
  }

  function isAosExcluded(el) {
    if (!el) return false;
    if (el.matches(AOS_WHOLE_CARD_SELECTOR) && !shouldSkipCardReveal(el)) return false;

    var excluded = el.closest(AOS_EXCLUDE_ANCESTOR);
    if (!excluded) return false;
    if (excluded === el && el.matches(AOS_WHOLE_CARD_SELECTOR) && !shouldSkipCardReveal(el)) return false;

    return true;
  }

  function initAosFadeUpObserver() {
    if (aosObserver || reducedMotion) return;

    aosObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          entry.target.classList.toggle("is-inview", entry.isIntersecting);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
  }

  function observeAosElement(el) {
    if (!el || el.dataset.stpAosObserved === "1") return;

    el.dataset.stpAosObserved = "1";

    if (reducedMotion) {
      el.classList.add("is-inview");
      return;
    }

    initAosFadeUpObserver();
    if (aosObserver) {
      aosObserver.observe(el);
    } else {
      el.classList.add("is-inview");
    }
  }

  function bindLocomotiveReveal(el, delayMs) {
    if (!el || el.classList.contains("stp-aos-fade-up") || isAosExcluded(el)) return;

    el.classList.add("stp-aos-fade-up");
    el.style.setProperty("--stp-aos-delay", delayMs + "ms");

    if (reducedMotion) {
      el.classList.add("is-inview");
      return;
    }

    if (!el.hasAttribute("data-scroll")) {
      el.setAttribute("data-scroll", "");
      el.setAttribute("data-scroll-repeat", "");
      el.setAttribute("data-scroll-offset", "0, 25%");
    }

    locoRevealPendingResize = true;
  }

  function bindIndependentReveal(el, delayMs) {
    if (!el || el.classList.contains("stp-aos-fade-up") || isAosExcluded(el)) return;

    el.classList.add("stp-aos-fade-up");
    el.style.setProperty("--stp-aos-delay", delayMs + "ms");

    if (reducedMotion) {
      el.classList.add("is-inview");
      return;
    }

    observeAosElement(el);
  }

  function bindAosFadeUp(el, delayMs) {
    if (!el || el.classList.contains("stp-aos-fade-up") || isAosExcluded(el)) return;

    if (prefersLocomotiveReveal()) {
      bindIndependentReveal(el, delayMs);
      return;
    }

    el.classList.add("stp-aos-fade-up");
    el.style.setProperty("--stp-aos-delay", delayMs + "ms");
    observeAosElement(el);
  }

  function commitLocomotiveReveals() {
    if (!locoRevealPendingResize || !scroll) return;
    locoRevealPendingResize = false;
    scroll.resize();
    requestAnimationFrame(syncLocomotiveStaggerGroups);
  }

  function registerLocoStaggerGroup(container, handlers) {
    if (locoStaggerGroups) {
      locoStaggerGroups.set(container, handlers);
      return;
    }
    locoStaggerGroupsFallback.push({ container: container, handlers: handlers });
  }

  function syncLocomotiveStaggerGroups() {
    function runHandlers(container, handlers) {
      if (!handlers) return;

      if (shouldResetStaggerGroup(container)) {
        handlers.reset();
        return;
      }

      if (shouldRevealStaggerGroup(container)) {
        handlers.reveal();
      }
    }

    if (locoStaggerGroups) {
      locoStaggerGroups.forEach(function (handlers, container) {
        runHandlers(container, handlers);
      });
      return;
    }

    locoStaggerGroupsFallback.forEach(function (entry) {
      runHandlers(entry.container, entry.handlers);
    });
  }

  function initStaggerScrollSync() {
    if (document.documentElement.dataset.stpStaggerScrollBound === "1") return;
    document.documentElement.dataset.stpStaggerScrollBound = "1";

    function onScrollCheck() {
      syncLocomotiveStaggerGroups();
    }

    window.addEventListener("stp:scroll", onScrollCheck, { passive: true });
    window.addEventListener("scroll", onScrollCheck, { passive: true });
  }

  function bootstrapInFoldReveals() {
    if (reducedMotion || !prefersLocomotiveReveal()) return;

    function revealIfInFold(container, handlers) {
      if (!container || !handlers || container.dataset.stpStaggerActive === "1") return;
      if (hasViewportOverlap(container)) handlers.reveal();
    }

    if (locoStaggerGroups) {
      locoStaggerGroups.forEach(function (handlers, container) {
        revealIfInFold(container, handlers);
      });
      return;
    }

    locoStaggerGroupsFallback.forEach(function (entry) {
      revealIfInFold(entry.container, entry.handlers);
    });
  }

  function ensureHomeHeroVisualVisible() {
    if (!isHomePage) return;

    document.querySelectorAll(".stp-home-hero__figure").forEach(function (figure) {
      figure.classList.add("stp-home-hero__figure--static");
      figure.removeAttribute("data-scroll");
      figure.removeAttribute("data-scroll-speed");
      figure.classList.remove("stp-scroll-parallax");
    });
  }

  function bindLocomotiveStaggerGroup(container, items) {
    if (!container || container.dataset.stpLocoStaggerBound === "1") return;

    var boundItems = items.filter(function (item) {
      return item && item.el && !isAosExcluded(item.el);
    });
    if (!boundItems.length) return;

    container.dataset.stpLocoStaggerBound = "1";
    container.dataset.stpAosBound = "1";

    var timers = [];

    function prepareChildren() {
      boundItems.forEach(function (item) {
        item.el.classList.add("stp-aos-fade-up");
        item.el.style.setProperty("--stp-aos-delay", "0ms");
      });
    }

    function resetChildren() {
      if (container.dataset.stpStaggerActive !== "1" && container.dataset.stpStaggerComplete !== "1") return;

      container.dataset.stpStaggerActive = "0";
      container.dataset.stpStaggerRevealing = "0";
      container.dataset.stpStaggerComplete = "0";
      timers.forEach(clearTimeout);
      timers = [];
      boundItems.forEach(function (item) {
        item.el.classList.remove("is-inview");
      });
    }

    function revealChildren() {
      if (container.dataset.stpStaggerActive === "1") return;

      container.dataset.stpStaggerActive = "1";
      container.dataset.stpStaggerRevealing = "1";
      timers.forEach(clearTimeout);
      timers = [];

      boundItems.forEach(function (item) {
        timers.push(
          setTimeout(function () {
            requestAnimationFrame(function () {
              if (container.dataset.stpStaggerActive !== "1") return;
              item.el.classList.add("is-inview");
            });
          }, item.delay || 0)
        );
      });

      timers.push(
        setTimeout(function () {
          container.dataset.stpStaggerRevealing = "0";
          container.dataset.stpStaggerComplete = "1";
        }, maxItemDelay(boundItems) + REVEAL_DURATION_MS)
      );
    }

    prepareChildren();

    if (reducedMotion) {
      boundItems.forEach(function (item) {
        item.el.classList.add("is-inview");
      });
      return;
    }

    registerLocoStaggerGroup(container, {
      reveal: revealChildren,
      reset: resetChildren,
    });

    observeStaggerGroup(container);

    if (hasViewportOverlap(container)) {
      requestAnimationFrame(function () {
        if (container.dataset.stpStaggerActive !== "1") revealChildren();
      });
    }
  }

  function failSafeVisibleReveals() {
    if (reducedMotion) return;

    window.setTimeout(function () {
      document.querySelectorAll(".stp-aos-fade-up:not(.is-inview)").forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var vh = viewportHeight();
        if (rect.bottom > 0 && rect.top < vh) {
          el.classList.add("is-inview");
        }
      });
    }, 2000);
  }

  function buildGroupAosItems(container) {
    var items = [];
    var step = 0;
    var kicker = container.querySelector(AOS_KICKER_SELECTOR);
    var pretitle = container.querySelector(AOS_PRETITLE_SELECTOR);
    var title = container.querySelector(AOS_TITLE_SELECTOR);
    var lead = container.querySelector(AOS_LEAD_SELECTOR);

    if (!title) {
      title = container.querySelector("h2, h1");
    }

    if (kicker) {
      items.push({ el: kicker, delay: staggerDelay(step++) });
    }
    if (pretitle) {
      items.push({ el: pretitle, delay: staggerDelay(step++) });
    }
    if (title) {
      items.push({ el: title, delay: staggerDelay(step++) });
    }
    if (lead) {
      items.push({ el: lead, delay: staggerDelay(step++) });
    }

    container.querySelectorAll(AOS_WHOLE_CARD_SELECTOR).forEach(function (el) {
      if (el === container) return;
      if (shouldSkipCardReveal(el)) return;
      if (
        items.some(function (item) {
          return item.el === el;
        })
      ) {
        return;
      }
      items.push({ el: el, delay: staggerDelay(step++) });
    });

    container.querySelectorAll(AOS_EXTRA_SELECTOR).forEach(function (el) {
      if (
        isAosExcluded(el) ||
        items.some(function (item) {
          return item.el === el;
        })
      ) {
        return;
      }
      items.push({ el: el, delay: staggerDelay(step++) });
    });

    return items;
  }

  function buildStaggeredItems(elements) {
    var items = [];
    var step = 0;

    elements.forEach(function (el) {
      if (!el) return;
      items.push({ el: el, delay: staggerDelay(step++) });
    });

    return items;
  }

  function bindAosGroup(container, items) {
    if (!container || container.dataset.stpAosBound === "1") return;

    var boundItems = items.filter(function (item) {
      return item && item.el && !isAosExcluded(item.el);
    });
    if (!boundItems.length) return;

    if (prefersLocomotiveReveal()) {
      bindLocomotiveStaggerGroup(container, boundItems);
      return;
    }

    container.dataset.stpAosBound = "1";

    boundItems.forEach(function (item) {
      bindAosFadeUp(item.el, item.delay);
    });
  }

  function getOrphanAosItems(section, innerGroups) {
    return buildGroupAosItems(section).filter(function (item) {
      return !Array.from(innerGroups).some(function (group) {
        return group.contains(item.el);
      });
    });
  }

  function bindOrphanAosGroup(container, items) {
    var boundItems = items.filter(function (item) {
      return item && item.el && !isAosExcluded(item.el);
    });
    if (!boundItems.length) return;

    if (container.dataset.stpLocoStaggerBound === "1" || container.dataset.stpAosBound === "1") {
      boundItems.forEach(function (item) {
        bindIndependentReveal(item.el, item.delay);
      });
      return;
    }

    bindAosGroup(container, boundItems);
  }

  function findRevealGridContainer(el) {
    return el.closest(AOS_REVEAL_GRID_SELECTOR) || el.parentElement;
  }

  function initMissedRevealCards() {
    var groups = new Map();

    document.querySelectorAll(AOS_WHOLE_CARD_SELECTOR).forEach(function (el) {
      if (shouldSkipCardReveal(el)) return;
      if (el.classList.contains("stp-aos-fade-up")) return;

      var container = findRevealGridContainer(el);
      if (!groups.has(container)) groups.set(container, []);
      groups.get(container).push(el);
    });

    groups.forEach(function (cards, container) {
      if (container.dataset.stpLocoStaggerBound === "1") {
        cards.forEach(function (card, index) {
          bindIndependentReveal(card, staggerDelay(index));
        });
        return;
      }

      bindAosGroup(container, buildStaggeredItems(cards));
    });
  }

  function buildSplitHeroItems(copy) {
    var kicker = copy.querySelector(".stp-hero-kicker");
    var elements = [];

    if (kicker) elements.push(kicker);
    elements.push(copy.querySelector(".stp-split-hero__title, h1"));
    elements.push(copy.querySelector(".stp-split-hero__lead"));
    elements.push(copy.querySelector(".stp-split-hero__actions"));

    return buildStaggeredItems(elements);
  }

  function homeHeroIntroActive() {
    return isHomePage && document.body.hasAttribute("data-stp-home-hero-intro");
  }

  function initHomeHeroAos() {
    if (homeHeroIntroActive()) return;

    ensureHomeHeroVisualVisible();

    var heroCopy = document.querySelector(".stp-home-hero-copy");
    if (!heroCopy) return;

    bindAosGroup(
      heroCopy,
      buildStaggeredItems([
        heroCopy.querySelector(".stp-home-hero__title"),
        heroCopy.querySelector(".stp-home-hero__tagline"),
        heroCopy.querySelector(".stp-home-hero__lead"),
        heroCopy.querySelector(".stp-home-hero__actions"),
        heroCopy.querySelector(".stp-home-hero__trust"),
      ])
    );
  }

  function initHomeHeroAwardsAos() {
    if (!isHomePage || homeHeroIntroActive()) return;

    var grid = document.querySelector(".stp-award-strip--hero .stp-award-strip__grid");
    if (!grid || grid.dataset.stpAosBound === "1") return;

    var cards = Array.from(grid.querySelectorAll(".stp-award-card"));
    if (!cards.length) return;

    bindAosGroup(grid, buildStaggeredItems(cards));
  }

  function initSplitHeroAos() {
    document.querySelectorAll(".stp-split-hero__copy").forEach(function (copy) {
      if (copy.querySelector(".stp-home-hero-copy")) return;
      bindAosGroup(copy, buildSplitHeroItems(copy));
    });
  }

  function initMinimalPageHeaderAos() {
    document.querySelectorAll("#main .stp-page-header-hero .stp-container").forEach(function (container) {
      if (container.closest(".stp-split-hero")) return;
      if (container.querySelector(".stp-home-hero-copy, .stp-split-hero__copy")) return;

      bindAosGroup(
        container,
        buildStaggeredItems([container.querySelector("h1"), container.querySelector("p.lead")])
      );
    });
  }

  function initMainContentAos() {
    var main = document.getElementById("main");
    if (!main || main.dataset.stpAosBound === "1") return;

    var directH1 = main.querySelector(":scope > h1");
    if (!directH1 || main.querySelector(":scope > section")) return;

    bindAosGroup(
      main,
      buildStaggeredItems([directH1, main.querySelector(":scope > p.lead")])
    );
  }

  function initSectionAos() {
    document.querySelectorAll("#main section").forEach(function (section) {
      if (section.dataset.stpAosBound === "1") return;

      var innerGroups = section.querySelectorAll(SECTION_INNER_GROUP_SELECTOR);
      if (innerGroups.length) {
        section.dataset.stpAosBound = "1";
        innerGroups.forEach(function (group) {
          bindAosGroup(group, buildGroupAosItems(group));
        });

        var orphans = getOrphanAosItems(section, innerGroups);
        if (orphans.length) {
          var orphanContainer =
            section.querySelector(":scope > .container, :scope > .container-fluid > .container") || section;
          bindOrphanAosGroup(orphanContainer, orphans);
        }
        return;
      }

      bindAosGroup(section, buildGroupAosItems(section));
    });
  }

  function initHonorRevealSections() {
    document.querySelectorAll("[data-stp-honor-reveal]:not([data-stp-aos-bound])").forEach(function (section) {
      bindAosGroup(section, buildGroupAosItems(section));
    });
  }

  function initSiteAos() {
    initHomeHeroAos();
    initHomeHeroAwardsAos();
    initSplitHeroAos();
    initMinimalPageHeaderAos();
    initMainContentAos();
    initSectionAos();
    initHonorRevealSections();
    initMissedRevealCards();
  }

  function initHeroParallax() {
    if (reducedMotion || typeof LocomotiveScroll !== "function") return;

    ensureHomeHeroVisualVisible();

    document.querySelectorAll(".stp-page-header-hero .stp-split-hero__figure").forEach(function (figure) {
      if (figure.classList.contains("stp-home-hero__figure--static")) return;
      if (figure.hasAttribute("data-scroll")) return;
      figure.setAttribute("data-scroll", "");
      figure.setAttribute("data-scroll-speed", "0.12");
      figure.classList.add("stp-scroll-parallax");
    });
  }

  function bindNavCollapse() {
    if (!scroll) return;

    ["stpNavMarketing", "stpChromeNav"].forEach(function (id) {
      var navCollapse = document.getElementById(id);
      if (!navCollapse || navCollapse.dataset.stpLocoNavBound === "1") return;
      navCollapse.dataset.stpLocoNavBound = "1";

      navCollapse.addEventListener("shown.bs.collapse", function () {
        scroll.stop();
      });
      navCollapse.addEventListener("hidden.bs.collapse", function () {
        scroll.start();
        scroll.resize();
      });
    });
  }

  function bindBackToTop() {
    document.querySelectorAll(".stp-back-to-top").forEach(function (btn) {
      if (btn.dataset.stpLocoTopBound === "1") return;
      btn.dataset.stpLocoTopBound = "1";

      btn.addEventListener("click", function (e) {
        if (!window.stpLocomotiveScroll) return;
        var main = document.getElementById("main");
        if (!main) return;
        e.preventDefault();
        window.stpLocomotiveScroll.scrollTo(main, {
          offset: 0,
          duration: reducedMotion ? 0 : 1.1,
        });
      });
    });
  }

  function initLocomotiveScroll() {
    if (scroll || typeof LocomotiveScroll !== "function") return scroll;

    initHeroParallax();

    scroll = new LocomotiveScroll({
      lenisOptions: {
        lerp: reducedMotion ? 1 : 0.09,
        smoothWheel: !reducedMotion,
      },
      triggerRootMargin: "0px 0px 12% 0px",
      scrollCallback: function () {
        window.dispatchEvent(new CustomEvent("stp:scroll"));
      },
    });

    window.stpLocomotiveScroll = scroll;
    bindNavCollapse();
    bindBackToTop();

    window.addEventListener(
      "resize",
      function () {
        scroll.resize();
      },
      { passive: true }
    );

    commitLocomotiveReveals();
    runRevealBootstrap();

    return scroll;
  }

  function runRevealBootstrap() {
    if (!prefersLocomotiveReveal()) return;

    requestAnimationFrame(function () {
      syncLocomotiveStaggerGroups();
      bootstrapInFoldReveals();
    });
    failSafeVisibleReveals();
  }

  window.stpLocomotiveRescanReveals = function () {
    ensureHomeHeroVisualVisible();
    initSiteAos();
    if (scroll) {
      locoRevealPendingResize = prefersLocomotiveReveal();
      commitLocomotiveReveals();
      scroll.resize();
    }
    runRevealBootstrap();
  };

  document.documentElement.classList.add("stp-locomotive-ready");
  initSiteAos();
  initStaggerScrollSync();
  initLocomotiveScroll();
  if (!scroll) runRevealBootstrap();
})();
