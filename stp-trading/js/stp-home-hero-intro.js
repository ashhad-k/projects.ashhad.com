/**
 * Homepage hero load sequence (opt-in via body[data-stp-home-hero-intro]).
 * Loader → blank canvas → nav from top → hero left → hero right → award boxes → ticker.
 */
(function () {
  var body = document.body;
  if (!body.classList.contains("stp-page-home") || !body.hasAttribute("data-stp-home-hero-intro")) {
    return;
  }

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var HERO_IMAGE_SRC = (function () {
    try {
      var src = document.currentScript && document.currentScript.src;
      if (src) return new URL("../assets/hero/home.png", src).href;
    } catch (e) {}
    return "../assets/hero/home.png";
  })();
  var LOADER_MIN_MS = 640;
  var LOADER_MAX_MS = 2600;
  var LOADER_OUT_MS = 620;
  var INTRO_DURATION_MS = 1050;
  var INTRO_TAIL_MS = 420;
  var AWARD_STAGGER_MS = 72;

  var STEP_MS = {
    afterLoader: 100,
    navToHeroLeft: 360,
    heroLeftToRight: 320,
    heroRightToAwards: 340,
    awardsToTicker: 260,
  };

  function revealClass(step) {
    return "stp-home-intro-reveal-" + step;
  }

  function getTargets() {
    var shell = document.querySelector(".stp-page-header-shell");
    return {
      utility: document.querySelector(".stp-utility-shell"),
      nav: shell && shell.querySelector(":scope > .stp-container.stp-container--fluid"),
      heroLines: document.querySelector(".stp-page-header-hero--lines > .stp-hero-lines"),
      heroLeft: document.querySelector(".stp-split-hero--home .stp-split-hero__visual"),
      heroRight: document.querySelector(".stp-split-hero--home .stp-split-hero__copy"),
      awards: document.querySelector(".stp-page-header-hero__awards"),
      awardCards: Array.from(
        document.querySelectorAll(".stp-award-strip--hero .stp-award-card")
      ),
      ticker: document.querySelector(".stp-page-header-hero__rail"),
      loader: document.querySelector(".stp-home-intro-loader"),
    };
  }

  function wait(ms) {
    return new Promise(function (resolve) {
      window.setTimeout(resolve, ms);
    });
  }

  function waitForImage(src, timeoutMs) {
    return new Promise(function (resolve) {
      var done = false;

      function finish() {
        if (done) return;
        done = true;
        resolve();
      }

      var img = new Image();
      img.onload = function () {
        if (typeof img.decode === "function") {
          img.decode().then(finish).catch(finish);
          return;
        }
        finish();
      };
      img.onerror = finish;
      img.src = src;
      window.setTimeout(finish, timeoutMs);
    });
  }

  function nextFrame() {
    return new Promise(function (resolve) {
      requestAnimationFrame(function () {
        requestAnimationFrame(resolve);
      });
    });
  }

  function removeLoader(targets) {
    body.classList.add("stp-home-intro-loader-out");
    body.classList.remove("stp-home-hero-intro-loading");
    body.removeAttribute("aria-busy");

    return wait(LOADER_OUT_MS).then(function () {
      if (targets.loader && targets.loader.parentNode) {
        targets.loader.parentNode.removeChild(targets.loader);
      }
    });
  }

  function finishIntro() {
    body.classList.add("stp-home-hero-intro-done");
    body.classList.remove(
      revealClass("nav"),
      revealClass("hero-left"),
      revealClass("hero-right"),
      revealClass("awards"),
      revealClass("ticker"),
      "stp-home-intro-loader-out",
      "stp-home-hero-intro-loading"
    );
    body.removeAttribute("aria-busy");
    window.dispatchEvent(new CustomEvent("stp:home-hero-intro-done"));
  }

  function revealAwards(cards) {
    body.classList.add(revealClass("awards"));
    cards.forEach(function (card, index) {
      card.style.setProperty("--stp-intro-delay", String(index * AWARD_STAGGER_MS) + "ms");
      card.classList.add("stp-home-intro-revealed");
    });
  }

  function scheduleReveal(step, delay) {
    return wait(delay).then(function () {
      return nextFrame().then(function () {
        body.classList.add(revealClass(step));
      });
    });
  }

  function runSequence(targets) {
    var awardLeadMs = targets.awardCards.length * AWARD_STAGGER_MS;

    Promise.resolve()
      .then(function () {
        return scheduleReveal("nav", STEP_MS.afterLoader);
      })
      .then(function () {
        return scheduleReveal("hero-left", STEP_MS.navToHeroLeft);
      })
      .then(function () {
        return scheduleReveal("hero-right", STEP_MS.heroLeftToRight);
      })
      .then(function () {
        return wait(STEP_MS.heroRightToAwards).then(function () {
          revealAwards(targets.awardCards);
        });
      })
      .then(function () {
        return scheduleReveal("ticker", STEP_MS.awardsToTicker + awardLeadMs);
      })
      .then(function () {
        return wait(INTRO_TAIL_MS + INTRO_DURATION_MS);
      })
      .then(finishIntro);
  }

  function runReducedMotion(targets) {
    if (targets.loader && targets.loader.parentNode) {
      targets.loader.parentNode.removeChild(targets.loader);
    }

    body.classList.add(
      revealClass("nav"),
      revealClass("hero-left"),
      revealClass("hero-right"),
      revealClass("awards"),
      revealClass("ticker")
    );
    targets.awardCards.forEach(function (card) {
      card.classList.add("stp-home-intro-revealed");
    });
    finishIntro();
  }

  function initHomeHeroIntro() {
    var targets = getTargets();
    if (!targets.nav || !targets.heroLeft || !targets.heroRight) {
      if (targets.loader && targets.loader.parentNode) {
        targets.loader.parentNode.removeChild(targets.loader);
      }
      finishIntro();
      return;
    }

    if (reducedMotion) {
      runReducedMotion(targets);
      return;
    }

    body.classList.add("stp-home-hero-intro-loading");
    body.setAttribute("aria-busy", "true");

    Promise.all([waitForImage(HERO_IMAGE_SRC, LOADER_MAX_MS), wait(LOADER_MIN_MS)])
      .then(function () {
        return removeLoader(targets);
      })
      .then(function () {
        return nextFrame();
      })
      .then(function () {
        if (targets.nav) void targets.nav.offsetHeight;
        runSequence(targets);
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHomeHeroIntro, { once: true });
  } else {
    initHomeHeroIntro();
  }
})();
