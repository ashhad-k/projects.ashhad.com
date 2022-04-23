
// AOS
AOS.init({
	offset: 200,
	duration: 600,
	easing: 'ease-out-cubic',
	delay: 100,
});
	AOS.refresh();

$('.my-paroller').paroller();


// tooltip
$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
});

$('ul.nav li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(300);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(300);
});


// owl carousel 1
 $(document).ready(function() {
              $('.owl-carousel').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 2,
                    nav: false
                  },
                  1000: {
                    items: 3,
                    nav: true,
                    loop: false,
                    margin: 20
                  }
                }
              })
            });



// owl carousel 2
 $(document).ready(function() {
              $('.owl-carousel2').owlCarousel({
                loop: true,
                margin: 10,
                responsiveClass: true,
                responsive: {
                  0: {
                    items: 1,
                    nav: true
                  },
                  600: {
                    items: 2,
                    nav: false
                  },
                  1000: {
                    items: 3,
                    nav: true,
                    loop: false,
                    margin: 20
                  }
                }
              })
            });


	 
// add class on TOP
$(function () {
	var header = $(".navbar");
	$(window).scroll(function () {
		var scroll = $(window).scrollTop();

		if (scroll >= 200) {
			header.removeClass('').addClass("top1-min");
		} else {
			header.removeClass("top1-min").addClass('');
		}
	});
});



// carousel
$('#carouselExample').on('slide.bs.carousel', function (e) {

  
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $('.carousel-item').length;
    
    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});


  $('#carouselExample').carousel({ 
                interval: 2000
        });



