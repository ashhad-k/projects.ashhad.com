// =================================================================
// ------------------ OWL Carousel + mouse move
// =================================================================


$(document).ready(function () {
	var owl = $('.owl-carousel');
	owl.owlCarousel({
		margin: 0,
		animateOut: 'fadeOut',
		animateIn: 'fadeIn',
		nav: true,
		loop: false,
		center: true,
		URLhashListener: true,
		autoplayHoverPause: true,
		startPosition: 'URLHash',
		mouseDrag:false,
		lazyLoad:true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			960: {
				items: 1
			},
			1200: {
				items: 1
			}
		}
	});
	owl.on('mousewheel', '.owl-stage', function (e) {
		if (e.deltaY > 0) {
			owl.trigger('prev.owl');
		} else {
			owl.trigger('next.owl');
		}
		e.preventDefault();
	});
});

// mousewheel fix for chrome.
//this.canvas.addEventListener('mousewheel',function(event){
//    mouseController.wheel(event);
//    return false; 
//}, false);


// =================================================================
// ------------------ OWL Carousel Animation on slides
// =================================================================

$(document).ready(function (){
  // Declare Carousel jquery object
  var owl = $('.owl-carousel');

  // add animate.css class(es) to the elements to be animated
  function setAnimation ( _elem, _InOut ) {
    // Store all animationend event name in a string.
    // cf animate.css documentation
    var animationEndEvent = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

    _elem.each ( function () {
      var $elem = $(this);
      var $animationType = 'animated ' + $elem.data( 'animation-' + _InOut );

      $elem.addClass($animationType).one(animationEndEvent, function () {
        $elem.removeClass($animationType); // remove animate.css Class at the end of the animations
      });
    });
  }

// Fired before current slide change
  owl.on('change.owl.carousel', function(event) {
      var $currentItem = $('.owl-item', owl).eq(event.item.index);
      var $elemsToanim = $currentItem.find("[data-animation-out]");
      setAnimation ($elemsToanim, 'out');
  });

// Fired after current slide has been changed
  var round = 0;
  owl.on('changed.owl.carousel', function(event) {

      var $currentItem = $('.owl-item', owl).eq(event.item.index);
      var $elemsToanim = $currentItem.find("[data-animation-in]");
    
      setAnimation ($elemsToanim, 'in');
  })
  
  owl.on('translated.owl.carousel', function(event) {
    console.log (event.item.index, event.page.count);
    
      if (event.item.index == (event.page.count - 1))  {
        if (round < 1) {
          round++
          console.log (round);
        } else {
          owl.trigger('stop.owl.autoplay');
          var owlData = owl.data('owl.carousel');
          owlData.settings.autoplay = false; //don't know if both are necessary
          owlData.options.autoplay = false;
          owl.trigger('refresh.owl.carousel');
        }
      }
  });

});

//
