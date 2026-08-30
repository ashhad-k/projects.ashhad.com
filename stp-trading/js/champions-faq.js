(function () {
  var root = document.getElementById("champ-faq-accordion");
  if (!root) return;

  var items = root.querySelectorAll(".stp-champ-faq-item");

  function setOpen(item, open) {
    var btn = item.querySelector(".stp-champ-faq-q");
    var panel = item.querySelector(".stp-champ-faq-a");
    if (!btn || !panel) return;

    item.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    panel.setAttribute("aria-hidden", open ? "false" : "true");
  }

  items.forEach(function (item) {
    var btn = item.querySelector(".stp-champ-faq-q");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");
      items.forEach(function (other) {
        setOpen(other, false);
      });
      setOpen(item, !isOpen);
    });
  });
})();
