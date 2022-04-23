  AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
		
		AOS.refresh();

      //setInterval(addItem, 300);


//
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

