// AOS
AOS.init({
    offset: 100,
    duration: 500,
    easing: 'ease-in-out',
    delay: 100,
});



// Tilter
window.addEventListener('load', () => {
    // First tilter
    tilter('.tilter', {
        perspective: 300,
        maxTilt: 3,
        mantain: false,
        fx3d: true,
        fxDistance: 70,
    });

    // Second tilter with different settings
    tilter('.tilter2', {
       perspective: 0,
        maxTilt: 2,
        mantain: false,
        fx3d: false,
        fxDistance: 200,
    });
});

// =============================


// gsap    
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// smooth scroll minimal
ScrollSmoother.create({
    smooth: 2,
    effects: true,
});






// smooth jump gsap
function getSamePageAnchor(link) {
    if (
        link.protocol !== window.location.protocol ||
        link.host !== window.location.host ||
        link.pathname !== window.location.pathname ||
        link.search !== window.location.search
    ) {
        return false;
    }
    return link.hash;
}

// Scroll to a given hash, preventing the event given if there is one
function scrollToHash(hash, e) {
    const elem = hash ? document.querySelector(hash) : false;
    if (elem) {
        if (e) e.preventDefault();
        gsap.to(window, {
            scrollTo: elem
        });
    }
}

// If a link's href is within the current page, scroll to it instead
document.querySelectorAll('a[href]').forEach(a => {
    a.addEventListener('click', e => {
        scrollToHash(getSamePageAnchor(a), e);
    });
});

// Scroll to the element in the URL's hash on load
scrollToHash(window.location.hash);

// progress
gsap.to('progress', {
    value: 100,
    ease: 'none',
    scrollTrigger: {
        scrub: 0.3
    }
});


///
 (function ($) {
    "use strict";

    $(document).ready(function () {

        /**-----------------------------
         *  Navbar fix
         * ---------------------------*/
        $(document).on('click', '.navbar-area .navbar-nav li.menu-item-has-children>a', function (e) {
            e.preventDefault();
        });

        /*-------------------------------------
            menu
        -------------------------------------*/
        $('.navbar-area .menu').on('click', function() {
            $(this).toggleClass('open');
            $('.navbar-area .navbar-collapse').toggleClass('sopen');
        });

        // mobile menu
        if ($(window).width() < 992) {
            $(".in-mobile").clone().appendTo(".sidebar-inner");
            $(".in-mobile ul li.menu-item-has-children").append('<i class="fas fa-chevron-right"></i>');

            $(".menu-item-has-children a").on('click', function(e) {
                // e.preventDefault();

                $(this).siblings('.sub-menu').animate({
                    height: "toggle"
                }, 300);
            });
        }

        var menutoggle = $('.menu-toggle');
        var mainmenu = $('.navbar-nav');

        menutoggle.on('click', function() {
            if (menutoggle.hasClass('is-active')) {
                mainmenu.removeClass('menu-open');
            } else {
                mainmenu.addClass('menu-open');
            }
        });
    });

    $(window).on('load', function () {

        /*-----------------
            preloader
        ------------------*/
        var preLoder = $("#preloader");
        preLoder.fadeOut(0);

        /*-----------------
            back to top
        ------------------*/
        var backtoTop = $('.back-to-top');
        backtoTop.fadeOut();

        /*---------------------
            Cancel Preloader
        ----------------------*/
        $(document).on('click', '.cancel-preloader a', function (e) {
            e.preventDefault();
            $("#preloader").fadeOut(2000);
        });

    });
    
    // Toggle Navbar class
     
     
      $(window).on("scroll", function() {
  var scrollPosition = $(window).scrollTop();
  var navbar = $(".navbar");

   //Add/remove "sticky-active" class based on scroll position
  if (scrollPosition >= 400) {
    navbar.addClass("sticky-active");
  } else {
    navbar.removeClass("sticky-active");
  }

  // Hide/show navbar based on scroll direction (upward or downward)
  var isScrollingUp = scrollPosition < $(window).data('lastScroll');
  $(window).data('lastScroll', scrollPosition);

  if (isScrollingUp && navbar.hasClass("sticky-active")) {
    navbar.removeClass("hidden"); // Reveal navbar on scrolling up
  } else if (!isScrollingUp && navbar.hasClass("sticky-active")) {
    navbar.addClass("hidden"); // Hide navbar on scrolling down
  }
});

})(jQuery);




// Marquee animations
['.cn-marquee', '.cn-marquee1', '.cn-marquee2'].forEach((selector, i) => {
    gsap.timeline({
        scrollTrigger: {
            trigger: selector,
            scrub: 0.2,
            start: 'top 80%',
            markers: true,
            end: "+=300%"
        }
    }).to(`${selector} .marquee-container`, {
        x: i % 2 === 0 ? "-100%" : "100%",
        duration: 10,
        ease: "linear"
    });
});


//
// Blog post mouse read - temp removed
gsap.set(".mouse-read", {
    xPercent: -60,
    yPercent: -60
});

const xSetter = gsap.quickSetter(".mouse-read", "x", "px");
const ySetter = gsap.quickSetter(".mouse-read", "y", "px");

window.addEventListener("mousemove", e => {
    xSetter(e.x);
    ySetter(e.y);
});



// Box animation of black card
gsap.to(".obj2", {
    width: "100%",
    height: "100%",
    duration: 1,
    ease: "power2.inOut",
    scrollTrigger: {
        trigger: ".pg-hm-vision",
        start: "top 80%",
        end: "top 50%",
        toggleActions: "play none none reverse"
    }
});

// Home HDR balls
document.addEventListener("DOMContentLoaded", function() {
    const ball = document.querySelector(".cn-hdr-ball");
    const section = document.getElementById("s-home");

    function handleMouseMove(event) {
        const rect = section.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        gsap.to(ball, {
            x: x,
            y: y,
            duration: 0.1,
            ease: "power2.out"
        });
    }

    section.addEventListener("mousemove", handleMouseMove);

    ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: "top 20%",
        onEnter: function() {
            section.removeEventListener("mousemove", handleMouseMove);
        },
        onLeaveBack: function() {
            section.addEventListener("mousemove", handleMouseMove);
        }
    });
});

//Home FTR balls

document.addEventListener("DOMContentLoaded", function() {
    const ball = document.querySelector(".cn-ftr-ball");
    const section = document.getElementById("s-footer");

    // Function to handle mousemove event
    function handleMouseMove(event) {
        const rect = section.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        gsap.to(ball, {
            x: x,
            y: y,
            duration: 0.1,
            ease: "power2.out"
        });
    }

    // Add mousemove event listener
    section.addEventListener("mousemove", handleMouseMove);

});

