$(document).on('click', 'a[href^="#"]:not([href=#carouselTab1])', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
     }, 500);
});

	
$(window).scroll(function(){
            if ($(this).scrollTop() > 250) {
                $('.gotop').fadeIn();
            } else {
                $('.gotop').fadeOut();
            }
        });
        			  
		  setTimeout(function(){
			$(".loader").addClass("loaderhide");
		 }, 2000); 

	// Accordion color active
		  $('.card-header a').click(function() {
    $('.card-header').removeClass('active');
    if(!$(this).closest('.card').find('.collapse').hasClass('show'))
        $(this).parents('.card-header').addClass('active');
});
$('.searchtopbtn').click(function(){
$('.search').toggleClass('searchbox');
});
$('.searchclose').click(function(){
$('.search').toggleClass('searchbox');
})
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 5,
    spaceBetween: 30,
    slidesPerGroup: 5,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

