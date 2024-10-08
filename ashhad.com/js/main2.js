/* ===================================================================
 * Monica 1.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function (html) {

  'use strict';

  const cfg = {

    // MailChimp URL
    mailChimpURL: 'https://facebook.us1.list-manage.com/subscribe/post?u=1abf75f6981256963a47d197a&amp;id=37c6d8f4d6'

  };


  /* preloader
   * -------------------------------------------------- */
  const ssPreloader = function () {

    const siteBody = document.querySelector('body');
    const preloader = document.querySelector('#preloader');
    if (!preloader) return;

    html.classList.add('ss-preload');

    window.addEventListener('load', function () {
      html.classList.remove('ss-preload');
      html.classList.add('ss-loaded');

      preloader.addEventListener('transitionend', function afterTransition(e) {
        if (e.target.matches('#preloader')) {
          siteBody.classList.add('ss-show');
          e.target.style.display = 'none';
          preloader.removeEventListener(e.type, afterTransition);
        }
      });
    });

  }; // end ssPreloader


  /* mobile menu
   * ---------------------------------------------------- */
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
}; // end ssMobileMenu


  /* Initialize
   * ------------------------------------------------------ */
  (function ssInit() {

    ssPreloader();
    ssMobileMenu();
    includeHTML();

  })();

})(document.documentElement);
