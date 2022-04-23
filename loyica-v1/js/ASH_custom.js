var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    paginationHide : 'true',
    direction: 'vertical',
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    hashNavigation: true,
    effect: 'slide',
    keyboard: true,
    mousewheel: {
  invert: false,
                  },
    pagination: {
    el: '.swiper-pagination',
    clickable: true,
                  },

});
  
swiper.on('slideChange', function () {
    $('.swiper-slide-prev .animated').addClass('fadeInUp');
    $('.swiper-slide-next .animated').addClass('fadeInUp');
    $('.swiper-slide.swiper-slide-active .animated').removeClass('fadeInUp');
    $('.topsidelogo,.maptop,.contactbottom,.burgertop').hide();
    $('.navbar').show();    
  });


  $('.maptop-inner').click(function(){
    $('.maptop').toggleClass('showcontactpopup');
    $('.contactsection').toggleClass('showcontact');
    $('.sectionload').toggleClass('animateslide');
    $('.sectionloadborder').toggleClass('animateslideborder');
  });
  $('.contactclose').click(function(){
    $('.contactsection').toggleClass('showcontact');
    $('.sectionload').toggleClass('animateslide');
    $('.sectionloadborder').toggleClass('animateslideborder');
    $('.maptop').toggleClass('showcontactpopup');
  });
  $('.contactbottom-inner').click(function(){
    $('.contactbottom').toggleClass('showwritepopup');
    $('.writesection').toggleClass('showcontact');
    $('.sectionload').toggleClass('animateslide');
    $('.sectionloadborder').toggleClass('animateslideborder');
    $('.showcontact .animated').toggleClass('fadeInUp');  
  });
  
  $('.writeclose').click(function(){
    $('.writesection').toggleClass('showcontact');
    $('.sectionload').toggleClass('animateslide');
    $('.sectionloadborder').toggleClass('animateslideborder');
    $('.contactbottom').toggleClass('showwritepopup');
    $('.showcontact .animated').toggleClass('fadeInUp');  
  });
  
  
  
  $('.nav-link').click(function(){
    $(' .anim-trigger').toggleClass('fadeInUp');
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
  
  
  w3.includeHTML();
  
  
  
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
    
  /*
  $('.first-slide p').hide();
  doFade('.first-slide p:first');
  function doFade(elem) {
      $(elem).fadeIn(1500).delay(9000).fadeOut(250, function () {
          $(this).insertAfter($('.first-slide p:last'));
          doFade('.first-slide p:first');
      });
  }
  */
  
  swiper.on('reachBeginning', function () {
    $('.navbar').hide();
    $('.topsidelogo,.maptop,.contactbottom,.burgertop').show();
    });
    