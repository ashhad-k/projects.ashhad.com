
// AOS
AOS.init({
	offset: 200,
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

//
