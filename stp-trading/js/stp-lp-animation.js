/**
 * LP chart — scene highlight rotation + live-style bid/ask/spread ticks.
 */
(function () {
  var chart = document.querySelector(".stp-home-trading-conditions__visual .stp-lp-chart");
  if (!chart) return;

  var bidEl = chart.querySelector("[data-stp-lp-bid]");
  var askEl = chart.querySelector("[data-stp-lp-ask]");
  var spreadEl = chart.querySelector("[data-stp-lp-spread]");
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function flash(el) {
    if (!el) return;
    el.classList.remove("stp-lp-value--tick");
    void el.offsetWidth;
    el.classList.add("stp-lp-value--tick");
  }

  function formatPrice(n) {
    return n.toFixed(2);
  }

  function formatSpread(n) {
    return n.toFixed(1);
  }

  if (bidEl && askEl && spreadEl && !reducedMotion) {
    var bid = parseFloat(bidEl.textContent) || 2655.2;
    var ask = parseFloat(askEl.textContent) || 2655.23;

    window.setInterval(function () {
      var bidDelta = (Math.random() - 0.5) * 0.08;
      var askDelta = (Math.random() - 0.5) * 0.08;

      bid = Math.max(2654.5, Math.min(2656.5, bid + bidDelta));
      ask = Math.max(bid + 0.1, Math.min(2656.8, ask + askDelta));

      if (ask - bid < 0.2) ask = bid + 0.2 + Math.random() * 0.15;
      if (ask - bid > 0.5) ask = bid + 0.2 + Math.random() * 0.15;

      var spread = ask - bid;

      bidEl.textContent = formatPrice(bid);
      askEl.textContent = formatPrice(ask);
      spreadEl.textContent = formatSpread(spread);

      flash(bidEl);
      flash(askEl);
      flash(spreadEl);
    }, 900 + Math.floor(Math.random() * 600));
  }

  if (reducedMotion) return;

  var scene = 1;
  window.setInterval(function () {
    chart.classList.remove("scene-1", "scene-2", "scene-3", "scene-4");
    scene = scene >= 4 ? 1 : scene + 1;
    chart.classList.add("scene-" + scene);
  }, 3500);
})();
