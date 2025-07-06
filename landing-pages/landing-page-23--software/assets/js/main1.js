/**
* Template Name: OnePage - v2.0.0
* Template URL: https://bootstrapmade.com/onepage-multipurpose-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Preloader
  $(window).on('load', function() {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function() {
        $(this).remove();
      });
    }
  });



  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp

  // if ($('body').hasClass('mobile-nav-active')) {
          // $('body').removeClass('mobile-nav-active');
          // $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          // $('.mobile-nav-overly').fadeOut();
        // }
       

  // // Testimonials carousel (uses the Owl Carousel library)
  // $(".testimonials-carousel").owlCarousel({
  //   autoplay: true,
  //   dots: true,
  //   loop: true,
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     768: {
  //       items: 2
  //     },
  //     900: {
  //       items: 3
  //     }
  //   }
  // });

 
  // Portfolio details carousel
  $(".slider-one").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });
  $(".test-slider").owlCarousel({
    autoplay: true,
    dots: false,
    loop: true,
    items: 1
  });
  

  // Initi AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  aos_init();

// $(document).on('click', '.mobile-nav-toggle', function(e) {
      // $('body').toggleClass('mobile-nav-active');
      // $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      // $('.mobile-nav-overly').toggle();
    // });
// $(document).click(function(e) {
      // var container = $(".mobile-nav, .mobile-nav-toggle");
      // if (!container.is(e.target) && container.has(e.target).length === 0) {
        // if ($('body').hasClass('mobile-nav-active')) {
          // $('body').removeClass('mobile-nav-active');
          // $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          // $('.mobile-nav-overly').fadeOut();
        // }
      // }
    // });

  // // Mobile Navigation
  // if ($('.nav-menu').length) {
  //   var $mobile_nav = $('.nav-menu').clone().prop({
  //     class: 'mobile-nav d-lg-none'
  //   });
  //   $('body').append($mobile_nav);
  //   $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
  //   $('body').append('<div class="mobile-nav-overly"></div>');

  //   $(document).on('click', '.mobile-nav-toggle', function(e) {
  //     $('body').toggleClass('mobile-nav-active');
  //     $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  //     $('.mobile-nav-overly').toggle();
  //   });

  //   $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
  //     e.preventDefault();
  //     $(this).next().slideToggle(300);
  //     $(this).parent().toggleClass('active');
  //   });

  //   $(document).click(function(e) {
  //     var container = $(".mobile-nav, .mobile-nav-toggle");
  //     if (!container.is(e.target) && container.has(e.target).length === 0) {
  //       if ($('body').hasClass('mobile-nav-active')) {
  //         $('body').removeClass('mobile-nav-active');
  //         $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  //         $('.mobile-nav-overly').fadeOut();
  //       }
  //     }
  //   });
  // } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
  //   $(".mobile-nav, .mobile-nav-toggle").hide();
  // }











})(jQuery);


if ($(window).width() < 769) {

$(".faq-wrapper").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

$(".counter-boxwrapper").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 2
  });

$(".pacagers-wrapper").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

$(".boxes-wrapper").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });


$(".hs-wrapper").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

$(".test-slider").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });
$( ".count-box" ).removeClass( "hover" )


};