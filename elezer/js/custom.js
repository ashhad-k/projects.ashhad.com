 $( document ).ready(function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    
  $(".owl-carousel").owlCarousel({
    loop: false,
    autoplay: true,
    items: 1,
    nav: true,
    autoplayHoverPause: true,
    animateOut: 'slideOutUp',
    animateIn: 'slideInUp',
    responsive:{
      600:{
          items:6
      },
   
  }
  });
  }});