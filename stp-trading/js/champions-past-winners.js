/**
 * Past Winners — filter rounds by competition select (Figma 15_stp_champions_pastwinners).
 */
(function () {
  'use strict';

  function initPastWinnersFilter() {
    var select = document.getElementById('champ-pw-filter');
    var roundsRoot = document.getElementById('champ-pw-rounds');
    if (!select || !roundsRoot) return;

    var rounds = roundsRoot.querySelectorAll('.stp-champ-pw-round[data-round]');

    function applyFilter() {
      var value = select.value;
      rounds.forEach(function (round) {
        var show = value === 'all' || round.getAttribute('data-round') === value;
        round.hidden = !show;
      });
    }

    select.addEventListener('change', applyFilter);
    applyFilter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPastWinnersFilter);
  } else {
    initPastWinnersFilter();
  }

  document.addEventListener('stp:partials-ready', initPastWinnersFilter);
})();
