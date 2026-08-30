(function () {
  var panel = document.getElementById("edu-journey-panel");
  if (panel) {
    var navItems = panel.querySelectorAll("[data-journey-nav]");
    var sections = Array.prototype.slice.call(
      panel.querySelectorAll("[data-journey-section]")
    );
    var scrollLockUntil = 0;
    var scrollTicking = false;
    /** Line below sticky header where the next section becomes “current”. */
    var ACTIVATE_OFFSET = 140;

    function setActiveNav(id) {
      if (!id) return;
      navItems.forEach(function (link) {
        var active = link.getAttribute("data-journey-nav") === id;
        link.classList.toggle("is-active", active);
        link.setAttribute("aria-selected", active ? "true" : "false");
      });
    }

    /** Last section whose top has crossed the activation line (stable 1 → 2 → 3 …). */
    function activeSectionId() {
      var active = sections[0] ? sections[0].id : "";
      for (var i = 0; i < sections.length; i++) {
        if (sections[i].getBoundingClientRect().top <= ACTIVATE_OFFSET) {
          active = sections[i].id;
        }
      }
      return active;
    }

    function updateFromScroll() {
      scrollTicking = false;
      if (Date.now() < scrollLockUntil) return;
      setActiveNav(activeSectionId());
    }

    function onScroll() {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(updateFromScroll);
      }
    }

    navItems.forEach(function (link) {
      link.addEventListener("click", function (event) {
        var targetId = link.getAttribute("data-journey-nav");
        var target = targetId ? document.getElementById(targetId) : null;
        if (!target) return;

        event.preventDefault();
        setActiveNav(targetId);
        scrollLockUntil = Date.now() + 1000;
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        window.setTimeout(function () {
          scrollLockUntil = 0;
          setActiveNav(activeSectionId());
        }, 1000);
      });
    });

    setActiveNav(activeSectionId());
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  var faqRoot = document.getElementById("edu-faq-accordion");
  if (!faqRoot) return;

  var faqItems = faqRoot.querySelectorAll(".stp-edu-faq-item");

  function setFaqOpen(item, open) {
    var btn = item.querySelector(".stp-edu-faq-q");
    var answer = item.querySelector(".stp-edu-faq-a");
    if (!btn || !answer) return;

    item.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    answer.setAttribute("aria-hidden", open ? "false" : "true");
  }

  faqItems.forEach(function (item) {
    var btn = item.querySelector(".stp-edu-faq-q");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      faqItems.forEach(function (other) {
        setFaqOpen(other, false);
      });
      setFaqOpen(item, !isOpen);
    });
  });
})();
