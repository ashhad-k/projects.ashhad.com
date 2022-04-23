// scrollify

	$(function() {
  $.scrollify({
	section:".cn",
    scrollbars:false,
	interstitialSection:".header,.footer",
    easing: "easeOutExpo",
    scrollSpeed: 1500,
    offset : 0,
	  
    before:function(i,panels) {

      var ref = panels[i].attr("data-section-name");

      $(".pagination .active").removeClass("active");

      $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
    },
    afterRender:function() {
      var pagination = "<ul class=\"pagination\">";
      var activeClass = "";
      $(".panel").each(function(i) {
        activeClass = "";
        if(i===0) {
          activeClass = "active";
        }
        pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
      });

      pagination += "</ul>";

      $(".home").append(pagination);
      /*
      */
      $(".pagination a").on("click",$.scrollify.move);
    }
  });
});
	
	


//============================== Crew Actions

	 $('.pg-about .item4 .ss2 .item').click(function(e) {
        e.preventDefault();
        $('.item').removeClass('active');
        $(this).addClass('active');
    });


//==============================  Show hide Crew info

$(document).ready(function() {
	
    $('.cn3').hide();
	$('.cn3.active').show();
    $('.pg-about .item4 .ss2 .item').click(function(){
		
        var target = "." + $(this).data("target");
        $(".cn3").hide();
        $(target).fadeIn("slow");
		});
});



// COLOR CHANGE ON SCROLL
$(window).scroll(function() {
  
  // selectors
  var $window = $(window),
      $body = $('body'),
      $panel = $('.panel');
  
  // Change 33% earlier than scroll position so colour is there when you arrive.
  var scroll = $window.scrollTop() + ($window.height() / 3);
 
  $panel.each(function () {
    var $this = $(this);
    
    // if position is within range of this panel.
    // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
    // Remember we set the scroll to 33% earlier in scroll var.
    if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
          
      // Remove all classes on body with color-
      $body.removeClass(function (index, css) {
        return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
      });
       
      // Add class of currently active div
      $body.addClass('color-' + $(this).data('color'));
    }
  });    
  
}).scroll();



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
  
    
    
      
    anime.timeline({loop:true})
    .add({
        targets: '.blank_text .letter',
        opacity: [0,0],
        easing: "easeInOutQuad",
        duration: 1000,
        delay: 1000,
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
        duration: 1000,
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
        duration: 1000,
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
    
	
