// scrollify - > snap to link
$(function() {
          $.scrollify({
            section : ".cn",
			scrollSpeed:1200,
			sectionName : "section-name"

          });
        });





// 2nd slide hover items
$("#tech1").hover(
  function() {
    $('#cn-tech-frame1').collapse('show');
	$('.tech1').toggleClass('bounceInLeft');
	$('.tech1a').toggleClass('bounceInLeft');
  }, function() {
    $('#cn-tech-frame1').collapse('hide');
  }
);


$("#tech2").hover(
  function() {
    $('#cn-tech-frame2').collapse('show');
	$('.tech2').toggleClass('bounceInRight');
	$('.tech2a').toggleClass('bounceInRight');
  }, function() {
    $('#cn-tech-frame2').collapse('hide');
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

