
// AOS
AOS.init({
      offset: 100,
      duration: 600,
      easing: 'ease-out-cubic',
      delay: 100,
    });

	AOS.refresh();



// tooltip
$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
});

$('ul.nav li.dropdown').hover(function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(300);
}, function() {
  $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(300);
});


// DATE PICKER
$('#inputDate').datepicker({
});


// Gallery
$(document).ready(function() {
  $('#close-btn').click(function() {
    $('#search-overlay').fadeOut();
    $('#search-btn').show();
    $('.search-btn').show();
  });
  $('#search-btn').click(function() {
    $(this).hide();
    $('#search-overlay').fadeIn();
  });
	 $('.search-btn').click(function() {
    $(this).hide();
    $('#search-overlay').fadeIn();
  });
});

//
   var images = [
                'img/gallery/900.jpg',
                'img/gallery/901.jpg',
                'img/gallery/902.jpg',
                'img/gallery/903.jpg',
                'img/gallery/905.jpg',
                'img/gallery/906.jpg',
                'img/gallery/907.jpg',
                'img/gallery/908.jpg',
               
            ];

            $(function() {

                $('#gallery1').imagesGrid({
                    images: images
                });
               
				$('#gallery2').imagesGrid({
                    images: images
                });
     
			
			});

