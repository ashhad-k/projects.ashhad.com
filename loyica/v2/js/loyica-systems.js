// scrollify

	$(function() {
  $.scrollify({
	section:".cn",
    scrollbars:true,
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

      // For Gallery Work-Start
          var $faces  = $('#forcecentered');
          var $slidee = $faces.children('ul').eq(0);
          var $wrap   = $faces.parent();
              var li_wrap = $slidee.find('li');
               var windowWidth = $(window).width()/2;
               var windowHeight =$(window).height()/2;
               li_wrap.css({'width':windowWidth  ,'height':windowHeight+100 });
          var options = {
            horizontal: 1,
            itemNav: 'forceCentered',
            smart: 1,
            activateMiddle: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 1,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            speed: 900,
            elasticBounds: 1,
            easing: 'easeInOutQuad',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
            swingSpeed: 0.3,

            // Buttons
            prev: $wrap.find('.prev'),
            next: $wrap.find('.next')
          };

          var frame = new Sly($faces, options);
          frame.on("active", function(e, itemIndex) {
             $('#currentitem').text(itemIndex+1);
             
              
          });

          frame.on('load move', function(eventName) {
    
             
        
          });

          frame.on('moveStart', function(eventName) { 

            li_wrap.toggleClass('short');
              
              
          });
          frame.on('moveEnd', function(eventName) { 

            li_wrap.removeClass('short');

           
          
          });

            frame.on('change', function(eventName) { 
 
        
          
          });
          // Initiate Sly instance
          frame.init();
          // For Gallery Work-End
});
	
	
