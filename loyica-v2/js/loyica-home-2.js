// scrollify - > snap to link
$(function() {
          $.scrollify({
            section : ".cn",
			scrollSpeed:1200,
			sectionName : "section-name",

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
	$('.tech2').toggleClass('fadeInUpBig');
	$('.tech2a').toggleClass('fadeInUpBig');

    $("#systemsframe").addClass('removeframe');
    $("#solutionsframe").removeClass('removeframe');
     $("#p-item1").addClass('dark_bg');
     $("#p-item2").addClass('gray_bg');

    
  }, function() {
    $('#cn-tech-frame2').collapse('hide');
      $('.tech2').toggleClass('fadeInUpBig');
  $('.tech2a').toggleClass('fadeInUpBig');
  }
);



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
    $('.large-char1').toggleClass('zoomIn');
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
    $('.large-char2').toggleClass('zoomIn');
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
    $('.large-char3').toggleClass('zoomIn');
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
    
    
      
    anime.timeline({loop:true})
    .add({
        targets: '.blank_text .letter',
        opacity: [0,0],
        easing: "easeInOutQuad",
        duration: 1500,
        delay: 1500,
      })
      .add({
        targets: '.blank_text',
        opacity: 0,
        duration: 100,
        easing: "easeOutExpo",
        delay: 100,
    })  
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
        duration: 500,
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
	
	
