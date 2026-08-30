 

 $(function(){
  'use strict';

  var options = {
    debug: true,
        prefetch: true,
        cacheLength: 2,
       
        anchors: 'a',

    onStart: {
      duration: 250, // Duration of our animation
      render: function ($container) {
        // Add your CSS animation reversing class
        $container.addClass('is-exiting');

        // Restart your animation
        smoothState.restartCSSAnimations();
      }
    },
    onReady: {
      duration: 0,

      render: function ($container, $newContent) {
        // Remove your CSS animation reversing class
        $container.removeClass('is-exiting');

        // Inject the new content
        $container.html($newContent);
        
      },
    },
    onAfter: function($container, $newContent)  {
      $.scrollify.enable();
      if ($('.container1').hasClass('home')) {
          $.getScript("js/stats.min.js");
           $.getScript("js/starfield.js");
            $.getScript("js/loyica-home.js");
      }
      if ($('.container').hasClass('about')) {
               $.getScript("js/loyica-about.js");
               $.getScript("js/stats.min.js");
                $.getScript("js/starfield.js");
             
             aboutus_callsly();
              // $("script[src='en.js']").remove()
             
        }
        if ($('.container3').hasClass('work')) {
            $.scrollify.disable();
            $.getScript("js/stats.min.js");
            $.getScript("js/starfield.js");
             
            
              
        }
      // onReady( $('script[src]:not([async]):not([defer])', $newContent));


    }
  },
  smoothState = $('#main').smoothState(options).data('smoothState');
 

  
});

 function aboutus_callsly(){

        

          var $faces  = $('#basic');
          var $slidee = $faces.children('ul').eq(0);
          var $wrap   = $faces.parent();

          var options = {
            horizontal: 1,
            itemNav: 'centered',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
           

            activatePageOn: 'click',
            speed: 300,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,
          };
         
          var frame = new Sly($faces, options);
          frame.on("active", function(e, itemIndex) {
             
              $('#currentitem').text(itemIndex+1);
          });
           
          // Initiate Sly instance
          frame.init();
       
         $('#totalitems').text(frame.items.length);
 }
 