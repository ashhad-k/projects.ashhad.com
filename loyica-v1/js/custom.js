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

  
  
    $('.burgertop-inner').click(function(){
  $('.sidenavbg').toggleClass('showmenu');
  $('.sidenav .nav-item.animated').toggleClass('fadeInRight');
  });
  
  $('.sidenav .closeside').click(function(){
  $('.showmenu ').toggleClass('showmenu');
  $('.sidenav .nav-item.animated').toggleClass('fadeInRight');
  });
  
  $('.sidenav .nav-link').click(function(){
  $('.showmenu ').toggleClass('showmenu');
  $('.sidenav .nav-item.animated').toggleClass('fadeInRight');  
  });
  
  
  
  
  $(window).ready(function(){
    setInterval(function(){ 
      $('.main').hide()
    }, 2000);
  
    
    
    setInterval(function(){ 
        $('.animatestart').addClass("animate1")
      }, 2000);
    
      
    setInterval(function(){ 
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
        targets: '.ml3 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 500,
        delay: function(el, i) {
          return 82 * (i+1)
        }
      })
      .add({
        targets: '.ml3',
        opacity: 0,
        duration: 500,
        easing: "easeOutExpo",
        delay: 500,
    })
      .add({
        targets: '.ml4 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 500,
        delay: function(el, i) {
          return 50 * (i+1)
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
        duration: 500,
        delay: function(el, i) {
          return 50 * (i+1)
        }
      }).add({
        targets: '.ml5',
        opacity: 0,
        duration: 500,
        easing: "easeOutExpo",
        delay: 1000,
      })