// locomotive
 const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
 // lerp: 0.05, // Slow down the scroll speed
 // multiplier: 0.8, // Decrease multiplier to make scroll slower
  smoothMobile: true // Enable smooth scrolling on mobile devices
});
scroll.update(); // Reinitialize if you add or change content
// locomotive end



// locomotive scroll link
document.querySelectorAll('[data-scroll-to]').forEach((link) => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('data-scroll-to'));
    
    scroll.scrollTo(target, {
      offset: 0, // Adjust offset if needed
      duration: 1000, // Adjust the scroll speed
      easing: [0.25, 0.00, 0.35, 1.00] // Custom easing function
    });
  });
});
//


// bs accordion active class to head
document.addEventListener('DOMContentLoaded', function () {
    var accordionItems = document.querySelectorAll('.accordion-button');

    accordionItems.forEach(function (button) {
      button.addEventListener('click', function () {
        // Remove 'opened' class from all buttons
        accordionItems.forEach(function(btn) {
          btn.classList.remove('opened');
        });

        // Add 'opened' class to the clicked button if it's not already opened
        if (!button.classList.contains('collapsed')) {
          button.classList.add('opened');
        }
      });
    });
  });

