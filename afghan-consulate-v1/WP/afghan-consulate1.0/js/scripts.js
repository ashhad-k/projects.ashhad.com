//AOS.init({
//    offset: 100,
//    duration: 500,
//    easing: 'ease-in-out',
//    delay: 100,
//});
//
//AOS.init({
//  disable: function() {
//    var maxWidth = 1024;
//    return window.innerWidth < maxWidth;
//  }
//});



// homepage carousel auto start
const myCarouselElement = document.querySelector('#carousel1')
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
})



// wp menu click issue
jQuery(document).ready(function($) {
    // Click handler for menu items with children
    $('.menu-item-has-children > a').on('click', function(e) {
        e.preventDefault(); // Prevent the default link behavior

        var $parentLi = $(this).parent('.menu-item-has-children');

        // Toggle the 'open' class on the parent <li>
        $parentLi.toggleClass('open');

        // Toggle the display of the sub-menu
        $parentLi.siblings().removeClass('open').find('.sub-menu').hide(); // Close other sub-menus
        $parentLi.find('.sub-menu').toggle(); // Toggle the clicked sub-menu
    });

    // Close the sub-menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.menu-item-has-children').length) {
            $('.menu-item-has-children > .sub-menu').hide();
            $('.menu-item-has-children').removeClass('open');
        }
    });
});

// WP > Top Menu > apply class when user scrolled navigation
jQuery(document).ready(function($) {
    var prevScrollPos = $(window).scrollTop();
    $(window).scroll(function() {
        var currentScrollPos = $(window).scrollTop();
        if (prevScrollPos < currentScrollPos) {
            $("#nav0").addClass("scrolled-down");
        } else {
            $("#nav0").removeClass("scrolled-down");
        }
        prevScrollPos = currentScrollPos;
    });
});