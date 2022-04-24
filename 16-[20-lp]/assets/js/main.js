

/**
* jquery-match-height master by @liabru
* http://brm.io/jquery-match-height/
* License: MIT
*/

;(function(factory) { // eslint-disable-line no-extra-semi
  'use strict';
  if (typeof define === 'function' && define.amd) {
      // AMD
      define(['jquery'], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
      // CommonJS
      module.exports = factory(require('jquery'));
  } else {
      // Global
      factory(jQuery);
  }
})(function($) {
  /*
  *  internal
  */

  var _previousResizeWidth = -1,
      _updateTimeout = -1;

  /*
  *  _parse
  *  value parse utility function
  */

  var _parse = function(value) {
      // parse value and convert NaN to 0
      return parseFloat(value) || 0;
  };

  /*
  *  _rows
  *  utility function returns array of jQuery selections representing each row
  *  (as displayed after float wrapping applied by browser)
  */

  var _rows = function(elements) {
      var tolerance = 1,
          $elements = $(elements),
          lastTop = null,
          rows = [];

      // group elements by their top position
      $elements.each(function(){
          var $that = $(this),
              top = $that.offset().top - _parse($that.css('margin-top')),
              lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

          if (lastRow === null) {
              // first item on the row, so just push it
              rows.push($that);
          } else {
              // if the row top is the same, add to the row group
              if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                  rows[rows.length - 1] = lastRow.add($that);
              } else {
                  // otherwise start a new row group
                  rows.push($that);
              }
          }

          // keep track of the last row top
          lastTop = top;
      });

      return rows;
  };

  /*
  *  _parseOptions
  *  handle plugin options
  */

  var _parseOptions = function(options) {
      var opts = {
          byRow: true,
          property: 'height',
          target: null,
          remove: false
      };

      if (typeof options === 'object') {
          return $.extend(opts, options);
      }

      if (typeof options === 'boolean') {
          opts.byRow = options;
      } else if (options === 'remove') {
          opts.remove = true;
      }

      return opts;
  };

  /*
  *  matchHeight
  *  plugin definition
  */

  var matchHeight = $.fn.matchHeight = function(options) {
      var opts = _parseOptions(options);

      // handle remove
      if (opts.remove) {
          var that = this;

          // remove fixed height from all selected elements
          this.css(opts.property, '');

          // remove selected elements from all groups
          $.each(matchHeight._groups, function(key, group) {
              group.elements = group.elements.not(that);
          });

          // TODO: cleanup empty groups

          return this;
      }

      if (this.length <= 1 && !opts.target) {
          return this;
      }

      // keep track of this group so we can re-apply later on load and resize events
      matchHeight._groups.push({
          elements: this,
          options: opts
      });

      // match each element's height to the tallest element in the selection
      matchHeight._apply(this, opts);

      return this;
  };

  /*
  *  plugin global options
  */

  matchHeight.version = 'master';
  matchHeight._groups = [];
  matchHeight._throttle = 80;
  matchHeight._maintainScroll = false;
  matchHeight._beforeUpdate = null;
  matchHeight._afterUpdate = null;
  matchHeight._rows = _rows;
  matchHeight._parse = _parse;
  matchHeight._parseOptions = _parseOptions;

  /*
  *  matchHeight._apply
  *  apply matchHeight to given elements
  */

  matchHeight._apply = function(elements, options) {
      var opts = _parseOptions(options),
          $elements = $(elements),
          rows = [$elements];

      // take note of scroll position
      var scrollTop = $(window).scrollTop(),
          htmlHeight = $('html').outerHeight(true);

      // get hidden parents
      var $hiddenParents = $elements.parents().filter(':hidden');

      // cache the original inline style
      $hiddenParents.each(function() {
          var $that = $(this);
          $that.data('style-cache', $that.attr('style'));
      });

      // temporarily must force hidden parents visible
      $hiddenParents.css('display', 'block');

      // get rows if using byRow, otherwise assume one row
      if (opts.byRow && !opts.target) {

          // must first force an arbitrary equal height so floating elements break evenly
          $elements.each(function() {
              var $that = $(this),
                  display = $that.css('display');

              // temporarily force a usable display value
              if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                  display = 'block';
              }

              // cache the original inline style
              $that.data('style-cache', $that.attr('style'));

              $that.css({
                  'display': display,
                  'padding-top': '0',
                  'padding-bottom': '0',
                  'margin-top': '0',
                  'margin-bottom': '0',
                  'border-top-width': '0',
                  'border-bottom-width': '0',
                  'height': '100px',
                  'overflow': 'hidden'
              });
          });

          // get the array of rows (based on element top position)
          rows = _rows($elements);

          // revert original inline styles
          $elements.each(function() {
              var $that = $(this);
              $that.attr('style', $that.data('style-cache') || '');
          });
      }

      $.each(rows, function(key, row) {
          var $row = $(row),
              targetHeight = 0;

          if (!opts.target) {
              // skip apply to rows with only one item
              if (opts.byRow && $row.length <= 1) {
                  $row.css(opts.property, '');
                  return;
              }

              // iterate the row and find the max height
              $row.each(function(){
                  var $that = $(this),
                      style = $that.attr('style'),
                      display = $that.css('display');

                  // temporarily force a usable display value
                  if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                      display = 'block';
                  }

                  // ensure we get the correct actual height (and not a previously set height value)
                  var css = { 'display': display };
                  css[opts.property] = '';
                  $that.css(css);

                  // find the max height (including padding, but not margin)
                  if ($that.outerHeight(false) > targetHeight) {
                      targetHeight = $that.outerHeight(false);
                  }

                  // revert styles
                  if (style) {
                      $that.attr('style', style);
                  } else {
                      $that.css('display', '');
                  }
              });
          } else {
              // if target set, use the height of the target element
              targetHeight = opts.target.outerHeight(false);
          }

          // iterate the row and apply the height to all elements
          $row.each(function(){
              var $that = $(this),
                  verticalPadding = 0;

              // don't apply to a target
              if (opts.target && $that.is(opts.target)) {
                  return;
              }

              // handle padding and border correctly (required when not using border-box)
              if ($that.css('box-sizing') !== 'border-box') {
                  verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                  verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
              }

              // set the height (accounting for padding and border)
              $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
          });
      });

      // revert hidden parents
      $hiddenParents.each(function() {
          var $that = $(this);
          $that.attr('style', $that.data('style-cache') || null);
      });

      // restore scroll position if enabled
      if (matchHeight._maintainScroll) {
          $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
      }

      return this;
  };

  /*
  *  matchHeight._applyDataApi
  *  applies matchHeight to all elements with a data-match-height attribute
  */

  matchHeight._applyDataApi = function() {
      var groups = {};

      // generate groups by their groupId set by elements using data-match-height
      $('[data-match-height], [data-mh]').each(function() {
          var $this = $(this),
              groupId = $this.attr('data-mh') || $this.attr('data-match-height');

          if (groupId in groups) {
              groups[groupId] = groups[groupId].add($this);
          } else {
              groups[groupId] = $this;
          }
      });

      // apply matchHeight to each group
      $.each(groups, function() {
          this.matchHeight(true);
      });
  };

  /*
  *  matchHeight._update
  *  updates matchHeight on all current groups with their correct options
  */

  var _update = function(event) {
      if (matchHeight._beforeUpdate) {
          matchHeight._beforeUpdate(event, matchHeight._groups);
      }

      $.each(matchHeight._groups, function() {
          matchHeight._apply(this.elements, this.options);
      });

      if (matchHeight._afterUpdate) {
          matchHeight._afterUpdate(event, matchHeight._groups);
      }
  };

  matchHeight._update = function(throttle, event) {
      // prevent update if fired from a resize event
      // where the viewport width hasn't actually changed
      // fixes an event looping bug in IE8
      if (event && event.type === 'resize') {
          var windowWidth = $(window).width();
          if (windowWidth === _previousResizeWidth) {
              return;
          }
          _previousResizeWidth = windowWidth;
      }

      // throttle updates
      if (!throttle) {
          _update(event);
      } else if (_updateTimeout === -1) {
          _updateTimeout = setTimeout(function() {
              _update(event);
              _updateTimeout = -1;
          }, matchHeight._throttle);
      }
  };

  /*
  *  bind events
  */

  // apply on DOM ready event
  $(matchHeight._applyDataApi);

  // use on or bind where supported
  var on = $.fn.on ? 'on' : 'bind';

  // update heights on load and resize events
  $(window)[on]('load', function(event) {
      matchHeight._update(false, event);
  });

  // throttled update heights on resize events
  $(window)[on]('resize orientationchange', function(event) {
      matchHeight._update(true, event);
  });

});



$('.match').matchHeight();
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


//*****************************
    // Tabbing 
    //*****************************
    
    $('[data-targetit]').on('click',function () {
        $(this).siblings().removeClass('current');
        $(this).addClass('current');
        var target = $(this).data('targetit');
        $('.'+target).siblings('[class^="tabs"]').removeClass('current');
        $('.'+target).addClass('current');
        $('.multiple-items').slick('setPosition', 0);

    });

  $('.multiple-items').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay:true,
responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1
      }
    }
  ]
});


// Show the first tab and hide the rest
$('#tabs-nav li:first-child').addClass('active');
$('.tab-content').hide();
$('.tab-content:first').show();

// Click function
$('#tabs-nav li').click(function(){
  $('#tabs-nav li').removeClass('active');
  $(this).addClass('active');
  $('.tab-content').hide();
   $('.multiple-items').slick('setPosition', 0);
  
  var activeTab = $(this).find('a').attr('href');
  $(activeTab).fadeIn();
  return false;
});


$('.center').slick({
  centerMode: true,
  centerPadding: '0px',
  slidesToShow: 5,
  autoplay:true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 3
      }
    },
    {
      breakpoint: 480,
      settings: {
        arrows: false,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      }
    }
  ]
});
$('.heroslide').slick({

  autoplay:true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  fade:true,
  speed: 300,
  dots:false,
  arrows:true,
responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
});
  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.navbar-nav a, #scroll-bot a, .mobile-nav a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        if ($('#header').length) {
          scrollto -= $('#header').outerHeight()
        }

        if ($(this).attr("href") == '#header') {
          scrollto = 0;
        }

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.navbar-nav, .mobile-nav').length) {
          $('.navbar-nav .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // // Mobile Navigation
  // if ($('.navbar-nav').length) {
  //   var $mobile_nav = $('.navbar-nav').clone().prop({
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

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.navbar-nav , #mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".navbar-nav ul:first li:first").addClass('active');
      }
    });
  });

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

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
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });
  $('.testimonial-slider').slick({
    arrows:false,
    dots:false,

  });
  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 1
      },
      900: {
        items: 1
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox({
        'share': false
      });
    });
  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
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

})(jQuery);

/* ---- particles.js config ---- */

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});


/* ---- stats.js config ---- */

var count_particles, stats, update;
stats = new Stats;
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);
count_particles = document.querySelector('.js-count-particles');
update = function() {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);





