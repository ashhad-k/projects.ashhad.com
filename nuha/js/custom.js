 AOS.init({
      offset: 100,
      duration: 600,
      easing: 'ease-out-cubic',
      delay: 100,
    });

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