
// prevent link jump on click
$('.item2 a').click(function(e)
{
    e.preventDefault();
});

	
// AOS
 AOS.init({
        easing: 'ease-in-out-cubic',
	 	duration: 600,
	 	 offset: 200,
      });

// smooth jump	
	$('a').click(function(){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});

// scrollify - > snap to link
$(function() {
          $.scrollify({
            section : ".cn",
			  scrollSpeed:1200,
//			  scrollbars:false,
          });
        });


// toggle 3 divs
$(document).ready(function() {
	
    $('.cn3').hide();
	$('.cn3.active').show();
    $('.ab-btns button').click(function(){
		
        var target = "." + $(this).data("target");
        $(".cn3").hide();
        $(target).show();

//		$(target).css('opacity', 0)
//				 .slideDown('slow')
//				 .animate(
//					{ opacity: 1 },
//					{ queue: false, duration: 'slow' }
//				  );
	
										});

});

// Add active class on click
	 $('.ab-btns button').click(function(e) {
        //e.preventDefault();
        $('.dots').removeClass('active');
        $(this).addClass('active');
    });


// top burger menu
 
  $('.sidenav .nav-link').click(function(){
    $('.anim-trigger').toggleClass('fadeInRight');
  });
  
  $('.burgertop-inner').click(function(){
  $('.sidenavbg').toggleClass('showmenu');
  $('.nav-item.animated').toggleClass('fadeInRight');
  });
  
  $('.sidenav .closeside').click(function(){
  $('.showmenu ').toggleClass('showmenu');
  $('.nav-item.animated').toggleClass('fadeInRight');
  });
  
  $('.nav-link').click(function(){
  $('.showmenu ').toggleClass('showmenu');
  });
  

// Add remove class on Tech frames
$('#tech1').click(function(){
    $('.tech1').toggleClass('bounceInLeft');
	$('.tech1a').toggleClass('bounceInLeft');
  });

$('#tech2').click(function(){
    $('.tech2').toggleClass('bounceInRight');
	$('.tech2a').toggleClass('bounceInRight');
  });



// Add remove class on About Toggles boxes
$('#button-1').click(function(){
    $('.large-char1').toggleClass('zoomIn');
    $('.abcn-h1').toggleClass('bounceInLeft');
    $('.abcn-p1').toggleClass('bounceInLeft');
    $('.abcn-b1').toggleClass('bounceInLeft');
	
	// remove classsess immidiately
	$('.large-char2').removeClass('zoomIn');
    $('.abcn-h2').removeClass('bounceInLeft');
    $('.abcn-p2').removeClass('bounceInLeft');
    $('.abcn-b2').removeClass('bounceInLeft');
	$('.large-char3').removeClass('zoomIn');
    $('.abcn-h3').removeClass('bounceInLeft');
    $('.abcn-p3').removeClass('bounceInLeft');
    $('.abcn-b3').removeClass('bounceInLeft');
	
  });

$('#button-2').click(function(){
    $('.large-char2').toggleClass('zoomIn');
    $('.abcn-h2').toggleClass('bounceInLeft');
    $('.abcn-p2').toggleClass('bounceInLeft');
    $('.abcn-b2').toggleClass('bounceInLeft');
		
	// remove classsess immidiately
	$('.large-char1').removeClass('zoomIn');
    $('.abcn-h1').removeClass('bounceInLeft');
    $('.abcn-p1').removeClass('bounceInLeft');
    $('.abcn-b1').removeClass('bounceInLeft');
	$('.large-char3').removeClass('zoomIn');
    $('.abcn-h3').removeClass('bounceInLeft');
    $('.abcn-p3').removeClass('bounceInLeft');
    $('.abcn-b3').removeClass('bounceInLeft');
  });

$('#button-3').click(function(){
    $('.large-char3').toggleClass('zoomIn');
    $('.abcn-h3').toggleClass('bounceInLeft');
    $('.abcn-p3').toggleClass('bounceInLeft');
    $('.abcn-b3').toggleClass('bounceInLeft');
	
		
	// remove classsess immidiately
	$('.large-char2').removeClass('zoomIn');
    $('.abcn-h2').removeClass('bounceInLeft');
    $('.abcn-p2').removeClass('bounceInLeft');
    $('.abcn-b2').removeClass('bounceInLeft');
	$('.large-char1').removeClass('zoomIn');
    $('.abcn-h1').removeClass('bounceInLeft');
    $('.abcn-p1').removeClass('bounceInLeft');
    $('.abcn-b1').removeClass('bounceInLeft');
  });




//$('#ab2').click(function(){
//    $('.ab2').toggleClass('bounceInRight');
//	$('.ab2a').toggleClass('bounceInRight');
//  });



// from loyica1

  $(window).ready(function(){
      setInterval(function(){ 
        $('.animatestart').addClass("animate1")
      }, 1);
    
      
    setInterval(function(){ 
       $('.animatestart').removeClass("animate1");
     $('.animatestart').addClass("animate1-OFF")
      }, 4000);
    
    setInterval(function(){ 
        $('.animatestart').addClass("animate2")
      }, 5500);
    
      setInterval(function(){ 
        $('.animatecontent').addClass("contentshow")
      }, 6000);
  
      setInterval(function(){ 
      $('.animatecontent-lines').addClass("linesshow")
    }, 6000);
  
    setInterval(function(){ 
      $('.button--nina').addClass("fadeInUp")
    }, 6000);


    setInterval(function(){ 
      $('.blank_text').remove();
       }, 10000);
  
    
      setInterval(function(){ 
        $('.burgertop').addClass("topmenushow");
        $('.topsidelogo').addClass("topmenushow")
    
      }, 5500);
    
      setInterval(function(){ 
        $('.maptop').addClass("mapshow")
      }, 5500);
    
      setInterval(function(){ 
        $('.contactbottom').addClass("mapshow")
      }, 5500);
  
    });
    


// Search 2 code
$(document).ready(function() {
  $('#close-btn').click(function() {
    $('#search-overlay').fadeOut();
    $('#search-btn').show();
  });
  $('#search-btn').click(function() {
    $(this).hide();
    $('#search-overlay').fadeIn();
  });
});


// hide search when scroll
$(function() {
    var visiblity = $("#search-btn");
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
    
        if (scroll >= 80) {
            visiblity.fadeOut("slow");
			visiblity.hide;
			
        } else {
            visiblity.fadeIn("slow");
        }
    });
});
	

