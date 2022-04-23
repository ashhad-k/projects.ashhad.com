// JavaScript Document

AOS.init({
	offset: 200,
	duration: 800,
	easing: 'ease-out-cubic',
	delay: 100,
});

//Mobile Nav
$('.burger').click(function(){
	$('.topnav').toggleClass('menutoggle');
  
});



// tooltip
$(document).ready(function () {
	$('[data-toggle="tooltip"]').tooltip();
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

// onepage scroll script
$(document).ready(function () {
	$('#nav').onePageNav({
		currentClass: 'current',
		changeHash: true,
		scrollSpeed: 750,
		scrollThreshold: 0.5,
		filter: ':not(.navbar-brand)',
		easing: 'swing',
		begin: function () {
			//I get fired when the animation is starting
		},
		end: function () {
			//I get fired when the animation is ending
		},
		scrollChange: function ($currentListItem) {
			//I get fired when you enter a section and I pass the list item of the section
		}
	});

});

// parallax
// initialize paroller.js 
$('.my-paroller').paroller();

if (!(/Android|webOS|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent))) { //if not these userAgents
	// Parallax - initialize paroller.js 
	$('.my-paroller').paroller();
} else {}
