(function () {
  var panel = document.getElementById("champ-rules-panel");
  if (!panel) return;

  var navItems = panel.querySelectorAll("[data-rule-nav]");
  var sections = panel.querySelectorAll("[data-rule-section]");
  if (!navItems.length || !sections.length) return;

  function setActiveNav(id) {
    navItems.forEach(function (link) {
      var active = link.getAttribute("data-rule-nav") === id;
      link.classList.toggle("is-active", active);
      link.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  navItems.forEach(function (link) {
    link.addEventListener("click", function (event) {
      var targetId = link.getAttribute("data-rule-nav");
      var target = targetId ? document.getElementById(targetId) : null;
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveNav(targetId);
    });
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (entry) {
            return entry.isIntersecting;
          })
          .sort(function (a, b) {
            return b.intersectionRatio - a.intersectionRatio;
          })[0];

        if (visible && visible.target.id) {
          setActiveNav(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.55],
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
