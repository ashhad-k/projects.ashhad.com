$(function(){

// Left Menu Script
$('.leftWidgetMain .leftMenu ul li a').click(function(){
    $(this).parent('li').find('div.leftSubItems').slideToggle();
    $(this).toggleClass('active') 
});

      var slider_width = $('.leftWidgetMain').width();//get width automaticly
    $('.leftMenuBtn').click(function() {
      if($(this).css("margin-left") == slider_width+"px" && !$(this).is(':animated'))
      {
          $('.leftWidgetMain,.leftMenuBtn').animate({"margin-left": '-='+slider_width});
      }
      else
      {
          if(!$(this).is(':animated'))//perevent double click to double margin
          {
              $('.leftWidgetMain,.leftMenuBtn').animate({"margin-left": '+='+slider_width});
          }
      }


    });
// Left Menu Script


$('.taskSlider').slick({
     infinite: true,
     arrows: false,
     dots: true,
     autoplay: false,
  });


$('.formSlides').slick({
     infinite: true,
     arrows: false,
     dots: true,
     autoplay: false,
  });


$('#date').datepicker();


$('#timepicker, #timepicker1').timepicker({
  timeFormat: "hh:mm:ss",
  showMillisec: false,
  showMicrosec: false,
});  






	$('.tabsubMenu ul li a').click(function(){
		$('.tabsubMenu ul li a').removeClass("active");
		$(this).addClass("active");
	});

    $('#calendar, #calendar1').fullCalendar({
        header: {
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        defaultDate: '2019-09-14',
        editable: true,
        eventLimit: true, 
    });




//--------------Main Function End
});






$(window).scroll(function() {    
    var scroll = $(window).scrollTop();
    if (scroll >= 50) {
        $("header").addClass("fixed");
    } else {
        $("header").removeClass("fixed");
    }

});
