
// prevent link jump on click
$('.item2 > a').click(function (e) {
  e.preventDefault();
});


// AOS
AOS.init({
  easing: 'ease-in-out-quart',
  delay: 100,
  duration: 600,
  offset: 200,
});


if (!(/Android|webOS|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent))) { //if not these userAgents
  // Parallax - initialize paroller.js 
  $('.my-paroller').paroller();
} else {
}





// top burger menu



$('.sidenav .nav-link').click(function () {
  $('.anim-trigger').toggleClass('fadeInRight');

});

$('.burgertop-inner').click(function () {

  $('.sidenavbg').toggleClass('showmenu');
  $('.nav-item.animated').toggleClass('fadeInRight');
  $('.btn.animated').toggleClass('fadeInLeft');
  $('.menu-p.animated').toggleClass('fadeInLeft');
  $('.social-links.animated').toggleClass('fadeInLeft');
  $('.cr3.animated').toggleClass('fadeInRight');
  $('.m-header').toggleClass('fixedpos');
  if ($('.sidenavbg').hasClass('showmenu')) {
    $.scrollify.disable();
  } else {
    $.scrollify.enable();
  }


});

$('.sidenav .closeside').click(function () {
  $('.showmenu ').toggleClass('showmenu');
  $('.nav-item.animated').toggleClass('fadeInRight');
  $('.btn.animated').toggleClass('fadeInLeft');
  $('.menu-p.animated').toggleClass('fadeInLeft');
  $('.social-links.animated').toggleClass('fadeInLeft');
  $('.cr3.animated').toggleClass('fadeInRight');
});

$('.nav-link').click(function () {
  $('.showmenu ').toggleClass('showmenu');
});






// from loyica1
$(window).ready(function () {
  setInterval(function () {
    $('.animatestart').addClass("animate1")
  }, 1);


  setInterval(function () {
    $('.animatestart').removeClass("animate1");
    $('.animatestart').addClass("animate1-OFF")
  }, 4000);

  setInterval(function () {
    $('.animatestart').addClass("animate2")
  }, 5500);

  setInterval(function () {
    $('.animatecontent').addClass("contentshow")
  }, 6000);

  setInterval(function () {
    $('.animatecontent-lines').addClass("linesshow")
  }, 6000);

  setInterval(function () {
    $('.button--nina').addClass("fadeInUp")
  }, 6000);


  setInterval(function () {
    $('.blank_text').remove();
  }, 10000);


  setInterval(function () {
    $('.burgertop').addClass("topmenushow");
    $('.topsidelogo').addClass("topmenushow")

  }, 5500);

  setInterval(function () {
    $('.maptop').addClass("mapshow")
  }, 5500);

  setInterval(function () {
    $('.contactbottom').addClass("mapshow")
  }, 200);


});



// Search 2 code
$(document).ready(function () {
  $('#close-btn').click(function () {
    $('#search-overlay').fadeOut();
    $('#search-btn').show();
  });
  $('#search-btn').click(function () {
    $(this).hide();
    $('#search-overlay').fadeIn();
  });
});


// hide search when scroll
$(function () {
  var visiblity = $(".disappearOnScroll");
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 80) {

      visiblity.removeClass('smoothfadein');
      visiblity.addClass('smoothfadeout');


    } else {
      visiblity.removeClass('smoothfadeout');
      visiblity.addClass('smoothfadein');
    }
  });
});
/*For Start a project Modal -Start */
$('.menucareer').click(function () {
  $('.sidenavbg').toggleClass('showmenu');
  $('.careermodal').toggleClass('showmodal');

});

$('.sidenavproj .closecareerside').click(function () {
  $('.careermodal ').toggleClass('showmodal');
  $('.m-header').toggleClass('fixedpos');
  $.scrollify.enable();
});

$('.menustartproject').click(function () {
  $('.sidenavbg').toggleClass('showmenu');
  $('.startaprojectmodal').toggleClass('showmodal');

});



$('#openprojectmodal').click(function () {
  $('.startaprojectmodal').toggleClass('showmodal');
  $('.m-header').toggleClass('fixedpos');
  if ($('.sidenavprojbg').hasClass('showmodal')) {
    $.scrollify.disable();
  } else {
    $.scrollify.enable();
  }

});


$('#openprojectmodal2').click(function () {
  $('.startaprojectmodal').toggleClass('showmodal');
  $('.m-header').toggleClass('fixedpos');
  if ($('.sidenavprojbg').hasClass('showmodal')) {
    $.scrollify.disable();
  } else {
    $.scrollify.enable();
  }

});


$('.sidenavproj .closeside').click(function () {
  if ($(this).hasClass('careerside')) {
    $('.careermodal ').toggleClass('showmodal');
  } else {
    $('.startaprojectmodal ').toggleClass('showmodal');
  }
  $('.m-header').toggleClass('fixedpos');
  $.scrollify.enable();
});


/*For Start a project Modal -End */
// COLOR CHANGE ON SCROLL
$(window).scroll(function () {

  // selectors
  var $window = $(window),
    $body = $('body'),
    $panel = $('.panel');

  // Change 33% earlier than scroll position so colour is there when you arrive.
  var scroll = $window.scrollTop() + ($window.height() / 3);

  $panel.each(function () {
    var $this = $(this);

    // if position is within range of this panel.
    // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
    // Remember we set the scroll to 33% earlier in scroll var.
    if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

      // Remove all classes on body with color-
      $body.removeClass(function (index, css) {
        return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
      });

      // Add class of currently active div
      $body.addClass('color-' + $(this).data('color'));
    }
  });

}).scroll();

// Tooltip
$(function () {
  'use strict';
  $('[data-toggle="tooltip"]').tooltip();

  $(".sidenav li")
    .mouseover(function () {
      console.log($(this));
      if ($(this).hasClass('intro')) {
        $(".menu-p").text('We think of ourselves as the architects of a digital world.  \n We believe that there’s no idea that can’t be operationalized with a combination of powerful code and out-of-the box design.');
      } else if ($(this).hasClass('systems')) {
        $(".menu-p").text("Our in-house systems are designed to deliver core business efficiencies, and purpose-built for segments and industries.  \n Our systems are easy to use, and ready to be deployed off the shelf.");
      } else if ($(this).hasClass('solutions')) {
        $(".menu-p").text("We deliver digital experiences that drive results. \n Our project management process begins with thorough research about your requirements, and continues past launch to offer our extended support. ");
      } else if ($(this).hasClass('about')) {
        $(".menu-p").text("We’re a team of consultants, creatives, and coders united by a love of good design and a passion for technology. \n Together, we’re on a mission to turn great ideas into the architecture of a digital tomorrow. ");
      } else if ($(this).hasClass('contact')) {
        $(".menu-p").text("Whether you’re looking for systems purpose-built for your industry, or custom-made for your unique requirements, we have a solution that’s a perfect fit for your business requirements. \n Let’s start with a consultation.");
      }

    })
    .mouseout(function () {

      $(".menu-p").text("");
    });
});
