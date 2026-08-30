
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





// top burger menu
 
  $('.sidenav .nav-link').click(function(){
    $('.anim-trigger').toggleClass('fadeInRight');
  });
  
  $('.burgertop-inner').click(function(){
  $('.sidenavbg').toggleClass('showmenu');
  $('.nav-item.animated').toggleClass('fadeInRight');
  $('.btn.animated').toggleClass('fadeInLeft');
  $('.menu-p.animated').toggleClass('fadeInLeft');
  $('.social-links.animated').toggleClass('fadeInLeft');
  $('.cr3.animated').toggleClass('fadeInRight');
  });
  
  $('.sidenav .closeside').click(function(){
  $('.showmenu ').toggleClass('showmenu');
  $('.nav-item.animated').toggleClass('fadeInRight');
  $('.btn.animated').toggleClass('fadeInLeft');
$('.menu-p.animated').toggleClass('fadeInLeft');
$('.social-links.animated').toggleClass('fadeInLeft');
$('.cr3.animated').toggleClass('fadeInRight');
  });
  
  $('.nav-link').click(function(){
  $('.showmenu ').toggleClass('showmenu');
  });
  

//==============================
// Loycai Systems and Solutions Actions
$("#ls1").hover(
  function() {
    $('#ls1-items').fadeIn();
  }, function() {
    $('#ls2-items').fadeOut();
  }
);

// sub menu
$("#ls2").hover(
  function() {
//    $('#ls2-items').collapse('show');
    $('#ls2-items').fadeIn();

  }, function() {
//    $('#ls1-items').collapse('hide');
    $('#ls1-items').fadeOut();
  }
);



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
	

