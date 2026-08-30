/**
 * IB Partner — commission estimator (Figma 18_ib_partner calculator band).
 */
(function () {
  var root = document.querySelector("[data-stp-ib-calc]");
  if (!root) return;

  var levels = [
    { id: 1, label: "Level 01", rate: 3.5 },
    { id: 2, label: "Level 02", rate: 4 },
    { id: 3, label: "Level 03", rate: 4.5 },
    { id: 4, label: "Level 04", rate: 5 },
    { id: 5, label: "Level 05", rate: 5.5 },
    { id: 6, label: "Level 06", rate: 6 },
    { id: 7, label: "Level 07", rate: 6.5 },
  ];

  var activeLevel = 1;
  var lots = 10;

  var lotsEl = root.querySelector("[data-stp-ib-lots]");
  var lotsOut = root.querySelector("[data-stp-ib-lots-out]");
  var commOut = root.querySelector("[data-stp-ib-commission]");
  var levelBtns = root.querySelectorAll("[data-stp-ib-level]");

  function formatMoney(n) {
    return "$" + Math.round(n);
  }

  function currentRate() {
    var found = levels.find(function (l) {
      return l.id === activeLevel;
    });
    return found ? found.rate : levels[0].rate;
  }

  function updateRangeFill() {
    if (!lotsEl) return;
    var min = Number(lotsEl.min) || 1;
    var max = Number(lotsEl.max) || 50;
    var pct = ((lots - min) / (max - min)) * 100;
    lotsEl.style.setProperty("--stp-ib-range-fill", pct + "%");
  }

  function render() {
    if (lotsOut) lotsOut.textContent = String(lots);
    if (commOut) commOut.textContent = formatMoney(lots * currentRate());
    updateRangeFill();
    levelBtns.forEach(function (btn) {
      var on = Number(btn.getAttribute("data-stp-ib-level")) === activeLevel;
      btn.classList.toggle("stp-ib-calc__level--active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  levelBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      activeLevel = Number(btn.getAttribute("data-stp-ib-level"));
      render();
    });
  });

  if (lotsEl) {
    lotsEl.addEventListener("input", function () {
      lots = Number(lotsEl.value) || 1;
      render();
    });
  }

  render();
})();
