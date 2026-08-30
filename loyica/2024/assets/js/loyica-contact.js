 document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById('modal1');

    modal.addEventListener('shown.bs.modal', function () {
      // Disable default scrolling
      document.body.style.overflow = 'hidden';
    });

    modal.addEventListener('hidden.bs.modal', function () {
      // Enable default scrolling
      document.body.style.overflow = 'auto';
    });
  });