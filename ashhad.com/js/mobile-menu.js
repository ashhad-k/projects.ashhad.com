const ssMobileMenu = function () {
  const toggleButton = document.querySelector('.s-header__menu-toggle');
  const mainNavWrap = document.querySelector('.s-header__nav');
  const siteBody = document.querySelector('body');
  const menuLinks = document.querySelectorAll('.s-header__nav a');

  if (!(toggleButton && mainNavWrap && menuLinks)) return;

  // Toggle menu on button click
  toggleButton.addEventListener('click', function (e) {
    e.preventDefault();
    this.classList.toggle('is-clicked');
    siteBody.classList.toggle('menu-is-open');
    mainNavWrap.classList.toggle('is-visible');
    console.log('Menu toggled'); // Debugging statement
  });

  // Close menu when a menu item is clicked
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (window.matchMedia('(max-width: 900px)').matches) {
        toggleButton.classList.remove('is-clicked');
        siteBody.classList.remove('menu-is-open');
        mainNavWrap.classList.remove('is-visible');
        console.log('Menu closed by link click'); // Debugging statement
      }
    });
  });

  // Close menu on window resize
  window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
      if (siteBody.classList.contains('menu-is-open')) {
        siteBody.classList.remove('menu-is-open');
      }
      if (toggleButton.classList.contains('is-clicked')) {
        toggleButton.classList.remove('is-clicked');
      }
      if (mainNavWrap.classList.contains('is-visible')) {
        mainNavWrap.classList.remove('is-visible');
      }
      console.log('Menu closed by resize'); // Debugging statement
    }
  });
};

// Assuming you have a function to call the mobile menu initialization after includeHTML finishes
yourFunctionToCallAfterIncludeHTML = function() {
  ssMobileMenu();
};