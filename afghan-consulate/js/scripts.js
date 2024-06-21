AOS.init({
    offset: 100,
    duration: 500,
    easing: 'ease-in-out',
    delay: 100,
});

AOS.init({
  disable: function() {
    var maxWidth = 1024;
    return window.innerWidth < maxWidth;
  }
});



// homepage carousel auto start
const myCarouselElement = document.querySelector('#carousel1')
const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
})


// apply class when user scrolled navigation
$(document).ready(function() {
  var prevScrollPos = $(window).scrollTop();
  $(window).scroll(function() {
    var currentScrollPos = $(window).scrollTop();
    if (prevScrollPos < currentScrollPos) {
      $("#nav1").addClass("scrolled-down");
    } else {
      $("#nav1").removeClass("scrolled-down");
    }
    prevScrollPos = currentScrollPos;
  });
});
