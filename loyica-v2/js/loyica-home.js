// scrollify - > snap to link
$(function() {
          $.scrollify({
            section : ".cn",
			scrollSpeed:1200,
			sectionName : "section-name",
        before:function(index, sections) { 
       var $current = $('.cn-about2');

         var $prevsec = $('.cn-about');
      
      if(index == 3){
        
        
         $prevsec.addClass('animated fadeOut');

        $current.addClass('animated fadeIn');
         
      }else{
        $prevsec.removeClass('animated fadeOut');
     
        $current.removeClass('animated fadeIn');

      }
 
    },

          });
        });



// smooth jump	
	$('a.nav-link').click(function(){
	e.preventDefault();
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 500);
    return false;
});




// 2nd slide hover items

if(!(/Android|webOS|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent) )) { //if not these userAgents
  // 2nd slide hover items
$("#p-item1").hover(
  function() {
    $('#cn-tech-frame1').collapse('show');
	$('.tech1').toggleClass('fadeInUp');
	$('.tech1a').toggleClass('fadeInUp');

    $("#solutionsframe").addClass('removeframe');
    $("#systemsframe").removeClass('removeframe');

    $("#p-item1").removeClass('dark_bg');
     $("#p-item2").removeClass('gray_bg');
     $(".cn-tech .lhs").removeClass('dark_bg');

  }, function() {
    $('#cn-tech-frame1').collapse('hide');
    $('.tech1').toggleClass('fadeInUp');
  $('.tech1a').toggleClass('fadeInUp');

  }
);

$("#p-item2").hover(
  function() {
    $('#cn-tech-frame2').collapse('show');
	$('.tech2').toggleClass('fadeInUp');
	$('.tech2a').toggleClass('fadeInUp');

    $("#systemsframe").addClass('removeframe');
    $("#solutionsframe").removeClass('removeframe');
     $("#p-item1").addClass('dark_bg');
     $("#p-item2").addClass('gray_bg');

    
  }, function() {
    $('#cn-tech-frame2').collapse('hide');
      $('.tech2').toggleClass('fadeInUp');
  $('.tech2a').toggleClass('fadeInUp');
  }
);

}else{
  $('#cn-tech-frame1').collapse('show');
  $('#cn-tech-frame2').collapse('show');

}



//==============================
// toggle 3 divs
$(document).ready(function() {
	
    $('.cn3').hide();
	$('.cn3.active').show();
    $('.ab-btns button').click(function(){
		
        var target = "." + $(this).data("target");
        $(".cn3").hide();
        $(target).show();

	
		});

});

// Add active class on click
	 $('.ab-btns button').click(function(e) {
        //e.preventDefault();
        $('.dots').removeClass('active');
        $(this).addClass('active');
    });



// Add remove class on About Toggles boxes
$('#button-1').click(function(){

      
      $('.large-char1').removeClass('zoomOut');

     if($('.large-char2').hasClass('display')){
        $('.large-char2').addClass('zoomOut');
        setTimeout(function(){   $('.large-char2').addClass('nodisplay');
       $('.large-char2').removeClass('display');}, 200);

       
    }else if($('.large-char3').hasClass('display')){
      $('.large-char3').addClass('zoomOut');
        setTimeout(function(){   $('.large-char2').addClass('nodisplay');

       $('.large-char3').addClass('nodisplay');
      
       $('.large-char3').removeClass('display');}, 200);
    }
  setTimeout(function(){  $('.large-char1').toggleClass('zoomIn');
      $('.large-char1').removeClass('nodisplay');
      $('.large-char1').toggleClass('display'); }, 300);
  

    $('.abcn-h1').toggleClass('fadeInUp');
    $('.abcn-p1').toggleClass('fadeInUp');
    $('.abcn-b1').toggleClass('fadeInUp');
  
  // remove classsess immidiately
  $('.large-char2').removeClass('zoomIn');
 
    $('.abcn-h2').removeClass('fadeInUp');
    $('.abcn-p2').removeClass('fadeInUp');
    $('.abcn-b2').removeClass('fadeInUp');
  $('.large-char3').removeClass('zoomIn');
 
    $('.abcn-h3').removeClass('fadeInUp');
    $('.abcn-p3').removeClass('fadeInUp');
    $('.abcn-b3').removeClass('fadeInUp');
  
});

$('#button-2').click(function(){
  $('.large-char2').removeClass('zoomOut');
    if($('.large-char1').hasClass('display')){
        $('.large-char1').addClass('zoomOut');
        setTimeout(function(){
         $('.large-char1').addClass('nodisplay');
       $('.large-char1').removeClass('display');}, 200);
    }else if($('.large-char3').hasClass('display')){
      $('.large-char3').addClass('zoomOut');
       setTimeout(function(){
       $('.large-char3').addClass('nodisplay');
       $('.large-char3').removeClass('display');}, 200);
    }
    setTimeout(function(){
    $('.large-char2').toggleClass('zoomIn');
    $('.large-char2').removeClass('nodisplay');
     $('.large-char2').addClass('display');}, 300);

    // $('.large-char2').toggleClass('zoomIn');
    $('.abcn-h2').toggleClass('fadeInUp');
    $('.abcn-p2').toggleClass('fadeInUp');
    $('.abcn-b2').toggleClass('fadeInUp');
    
  // remove classsess immidiately
  $('.large-char1').removeClass('zoomIn');
    $('.abcn-h1').removeClass('fadeInUp');
    $('.abcn-p1').removeClass('fadeInUp');
    $('.abcn-b1').removeClass('fadeInUp');
  $('.large-char3').removeClass('zoomIn');
    $('.abcn-h3').removeClass('fadeInUp');
    $('.abcn-p3').removeClass('fadeInUp');
    $('.abcn-b3').removeClass('fadeInUp');
  });

$('#button-3').click(function(){
   $('.large-char3').removeClass('zoomOut');
 
    if($('.large-char1').hasClass('display')){
        $('.large-char1').addClass('zoomOut');
       setTimeout(function(){
      
         $('.large-char1').addClass('nodisplay');
       $('.large-char1').removeClass('display');}, 200);
    }else if($('.large-char2').hasClass('display')){
      $('.large-char2').addClass('zoomOut');
       setTimeout(function(){
       $('.large-char2').addClass('nodisplay');
       $('.large-char2').removeClass('display');}, 200);
    }
  setTimeout(function(){
    $('.large-char3').toggleClass('zoomIn');
    $('.large-char3').removeClass('nodisplay');

     $('.large-char3').addClass('display');
     }, 300);
    // $('.large-char3').toggleClass('zoomIn');
    $('.abcn-h3').toggleClass('fadeInUp');
    $('.abcn-p3').toggleClass('fadeInUp');
    $('.abcn-b3').toggleClass('fadeInUp');
  
    
  // remove classsess immidiately
  $('.large-char2').removeClass('zoomIn');
    $('.abcn-h2').removeClass('fadeInUp');
    $('.abcn-p2').removeClass('fadeInUp');
    $('.abcn-b2').removeClass('fadeInUp');
  $('.large-char1').removeClass('zoomIn');
    $('.abcn-h1').removeClass('fadeInUp');
    $('.abcn-p1').removeClass('fadeInUp');
    $('.abcn-b1').removeClass('fadeInUp');
  });

$('.footerprojectmodal').click(function(){
  $('.startaprojectmodal').toggleClass('showmodal');
   $('.m-header').toggleClass('fixedpos');
  if($('.sidenavprojbg').hasClass('showmodal')){
    $.scrollify.disable();
  }else{
    $.scrollify.enable();
  }

});

$('.footercareer').click(function(){
  $('.m-header').toggleClass('fixedpos');
  $('.careermodal').toggleClass('showmodal');
 if($('.sidenavprojbg').hasClass('showmodal')){
    $.scrollify.disable();
  }else{
    $.scrollify.enable();
  }
});


// 1st slide animation
 // Anime.js characters
    $('.ml3').each(function(){
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
 $('.ml4').each(function(){
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
 $('.ml5').each(function(){
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
 $('.ml6').each(function(){
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });
 $('.ml7').each(function(){
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });


   anime.timeline({loop:true})
   
    .add({
        targets: '.ml3 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 1000,
        delay: function(el, i) {
          return 150 * (i+1)
        }
      })
      .add({
        targets: '.ml3',
        opacity: 0,
        duration: 100,
        easing: "easeOutExpo",
        delay: 1000,
    })
      .add({
        targets: '.ml4 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 2000,
        delay: function(el, i) {
          return 150 * (i+1)
        }
      })
      .add({
        targets: '.ml4',
        opacity: 0,
        duration: 500,
        easing: "easeOutExpo",
        delay: 1000,
      })
    .add({
        targets: '.ml5 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 2000,
        delay: function(el, i) {
          return 150 * (i+1)
        }
      }).add({
        targets: '.ml5',
        opacity: 0,
        duration: 500,
        easing: "easeOutExpo",
        delay: 1000,
      })
    
    .add({
        targets: '.ml6 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 2000,
        delay: function(el, i) {
          return 150 * (i+1)
        }
      }).add({
        targets: '.ml6',
        opacity: 0,
        duration: 500,
        easing: "easeOutExpo",
        delay: 1000,
      })
    
    .add({
        targets: '.ml7 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 2000,
        delay: function(el, i) {
          return 150 * (i+1)
        }
      }).add({
        targets: '.ml7',
        opacity: 0,
        duration: 500,
        easing: "easeOutExpo",
        delay: 1000,
      })
    
	
