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
});
	
	
//============================== Owl Carousel for Crew 

$(function(){
var owl = $('.owl-carousel');
owl.owlCarousel({
//  autoplay: 1000,
	
  items:4,
  onInitialized  : counter, //When the plugin has initialized.
  onTranslated : counter //When the translation of the stage has finished.
});

function counter(event) {
   var element   = event.target;         // DOM element, in this example .owl-carousel
    var items     = event.item.count;     // Number of items
    var item      = event.item.index + 1;     // Position of the current item
  $('#counter').html("item "+item+" of "+items)
}
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
