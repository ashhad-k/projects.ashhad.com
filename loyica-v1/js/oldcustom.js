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
    reachBeginning: false,
    mousewheel: {
    invert: false,
                  },
    pagination: {
    el: '.swiper-pagination',
    clickable: true,
                  },
  // Responsive breakpoints
    breakpoints: {
    // when window width is <= 767px
    669: {
      spaceBetween: 0,
      freeMode: true,
      freeModeSticky: false,
    },
    320: {
      spaceBetween: 0,
      freeMode: true,
      freeModeSticky: false,
    },
  },

});
  

   $('.projectcontact').click(function(){
    $('.contactbottom').toggleClass('showwritepopup');
    $('.writesection').toggleClass('showcontact');
//  StartAnimSection
    $('.sectionload').toggleClass('animateslide');
    $('.sectionloadborder').toggleClass('animateslideborder');
    $('.showcontact .animated').toggleClass('fadeInUp');   
   });

  $('.maptop-inner').click(function(){
    $('.maptop').toggleClass('showcontactpopup');
    $('.contactsection').toggleClass('showcontact');
//  StartAnimSection
    $('.sectionload').toggleClass('animateslide');
    $('.sectionloadborder').toggleClass('animateslideborder');
  });

  $('.contactclose').click(function(){
    $('.contactsection').toggleClass('showcontact');
//  StartAnimSection
    $('.sectionload').toggleClass('animateslide');
    $('.sectionloadborder').toggleClass('animateslideborder');
    $('.maptop').toggleClass('showcontactpopup');
  });

  $('.contactbottom-inner').click(function(){
    $('.contactbottom').toggleClass('showwritepopup');
    $('.writesection').toggleClass('showcontact');
//  StartAnimSection
    $('.sectionload').toggleClass('animateslide');
    $('.sectionloadborder').toggleClass('animateslideborder');
    $('.showcontact .animated').toggleClass('fadeInUp');  
  });
  
  $('.writeclose').click(function(){
    $('.writesection').toggleClass('showcontact');
//  StartAnimSection
    $('.sectionload').toggleClass('animateslide');
    $('.sectionloadborder').toggleClass('animateslideborder');
    $('.contactbottom').toggleClass('showwritepopup');
    $('.showcontact .animated').toggleClass('fadeInUp');  
  });

$('.maptop').click(function(){
    $('.maptab nav .anim-trigger, .maptab .tab-content .anim-trigger').toggleClass('fadeInUp');
    $('.maptab .maptab-bg.anim-trigger').toggleClass('fadeInRight');
  });
  $('.contactclose').click(function(){
    $('.maptab nav .anim-trigger, .maptab .tab-content .anim-trigger').toggleClass('fadeInUp');
    $('.maptab .maptab-bg.anim-trigger').toggleClass('fadeInRight');
  });

  
  
  $('.sidenav .nav-link').click(function(){
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
    
    $(function(){

      $('#uaebtn').click(function(e){
        e.preventDefault();
          $('#nav-tab a[href="#nav-home"]').tab('show');
          $('.mapbullets a#honbtn, .mapbullets a#ukbtn').removeClass('mapactive');
          $('#uaebtn').addClass('mapactive');
          $('#maptextuae').shuffleLetters();
      })

      $('#nav-tab a[href="#nav-home').click(function(e){
        e.preventDefault();
          $('.mapbullets a#honbtn, .mapbullets a#ukbtn').removeClass('mapactive');
          $('#uaebtn').addClass('mapactive');
          $('#maptextuae').shuffleLetters();          
      })

      $('#ukbtn').click(function(e){
        e.preventDefault();
          $('#nav-tab a[href="#nav-profile"]').tab('show');
          $('.mapbullets a#honbtn, .mapbullets a#uaebtn').removeClass('mapactive');
          $('#ukbtn').addClass('mapactive');
          $('#maptextuk').shuffleLetters();          
      })

      $('#nav-tab a[href="#nav-profile"]').click(function(e){
        e.preventDefault();
          $('.mapbullets a#honbtn, .mapbullets a#uaebtn').removeClass('mapactive');
          $('#ukbtn').addClass('mapactive');
          $('#maptextuk').shuffleLetters();                    
      })


      $('#honbtn').click(function(e){
        e.preventDefault();
          $('#nav-tab a[href="#nav-contact"]').tab('show');
          $('.mapbullets a#ukbtn, .mapbullets a#uaebtn').removeClass('mapactive');
          $('#honbtn').addClass('mapactive'); 
          $('#maptexthon').shuffleLetters();         
      })

      $('#nav-tab a[href="#nav-contact"]').click(function(e){
        e.preventDefault();
          $('.mapbullets a#ukbtn, .mapbullets a#uaebtn').removeClass('mapactive');
          $('#honbtn').addClass('mapactive');
          $('#maptexthon').shuffleLetters();         
      })    
  })      
      swiper.on('reachBeginning', function () {
        $('.topsidelogo,.maptop,.contactbottom,.burgertop').show();
        $('.navbar').hide();
        });

        $('.swiper-pagination-bullet').click(function(e){
          $('.navbar-collapse.collapse').toggleClass('show');
        });

        /* TIME */
        $(function($) {
          
          var optionsGMT = {
            utc: true,
            utcOffset: 4 
          }
          $('#uaetime').jclock(optionsGMT);
    
          var optionsGST = {
            utc: true,
            utcOffset: -6
          }
          $('#hontime').jclock(optionsGST);
    
          var optionsCST = {
            utc: true,
            utcOffset: 0
          }
          $('#uktime').jclock(optionsCST);
          
        });

        /* Intro Text Load */
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
        duration: 7500,
        delay: 7500,
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
        duration: 2000,
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

      jQuery(document).ready(function(){
        function resizeForm(){
            var width = (window.innerWidth > 0) ? window.innerWidth : document.documentElement.clientWidth;
            if(width > 768){
            //  swiper.removeSlide(6);
              swiper.on('slideChange', function () {
                $('.swiper-slide-prev .animated').addClass('fadeInUp');
                $('.swiper-slide-next .animated').addClass('fadeInUp');
                $('.swiper-slide.swiper-slide-active .animated').removeClass('fadeInUp');
                $('.topsidelogo,.maptop,.contactbottom,.burgertop').hide();
                $('.navbar').show();    
              });
            } else {
            console.log('S')
            swiper.on('slideChange', function () {  
              $('.topsidelogo,.maptop,.contactbottom,.burgertop').hide();
              $('.navbar').show();    
            });  
          }    
        }
        window.onresize = resizeForm;
        resizeForm();
    });     