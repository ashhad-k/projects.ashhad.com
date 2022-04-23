$(function(){

 // Add minus icon for collapse element which is open by default
        $(".collapse.show").each(function(){
            $(this).prev(".card-header").find(".fa").addClass("fa-caret-down").removeClass("fa-caret-up");
        });
        
        // Toggle plus minus icon on show hide of collapse element
        $(".collapse").on('show.bs.collapse', function(){
            $(this).prev(".card-header").find(".fa").removeClass("fa-caret-up").addClass("fa-caret-down");
        }).on('hide.bs.collapse', function(){
            $(this).prev(".card-header").find(".fa").removeClass("fa-caret-down").addClass("fa-caret-up");
        });




	$('#nav-icon4').click(function(){
	  	$(this).toggleClass('open');
	    $('.header .mainMenu').slideToggle();
	    $('.overlay').toggleClass('show');
	    $('.leftSidebar').toggleClass('activeMenu');
	});



if ($(window).width() < 1025) {
    $('.LeftSubBg h3').click(function(){
        $(this).parent('.LeftSubBg').find('ul').slideToggle();
        $(this).toggleClass('active')
    });
}




$('.leftSidebar>ul>li a').click(function(){
    $(this).parents('li').find('.submenu').slideToggle();
});


});