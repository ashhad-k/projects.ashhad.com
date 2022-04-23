
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
 $('.ml7').each(function(){
      $(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
    });


   anime.timeline({loop:true})
   
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
        duration: 100,
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
    
    .add({
        targets: '.ml7 .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 2000,
        delay: function(el, i) {
          return 150 * (i+1)
        }
      }).add({
        targets: '.ml7',
        opacity: 0,
        duration: 500,
        easing: "easeOutExpo",
        delay: 1000,
      })
    
    