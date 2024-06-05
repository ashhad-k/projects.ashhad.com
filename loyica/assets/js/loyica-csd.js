// Filters 
$(document).ready(function(){

    $(".filter-button").click(function(){
        var value = $(this).attr('data-filter');
        
        if(value == "all")
        {
            //$('.filter').removeClass('hidden');
            $('.filter').show('3000');
        }
        else
        {
//            $('.filter[filter-item="'+value+'"]').removeClass('hidden');
//            $(".filter").not('.filter[filter-item="'+value+'"]').addClass('hidden');
            $(".filter").not('.'+value).hide('5000');
            $('.filter').filter('.'+value).show('5000');
            
        }
    });
    
    if ($(".filter-button").removeClass("active")) {
$(this).removeClass("active");
}
$(this).addClass("active");

});

// Filters button
document.addEventListener("DOMContentLoaded", function() {
    // Select all filter buttons
    const filterButtons = document.querySelectorAll('.filter-button');

    // Add click event listener to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove 'active' class from all filter buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add 'active' class to the clicked button
            this.classList.add('active');
        });
    });
});






// CSD Balls attached
document.addEventListener("DOMContentLoaded", function() {
    const ball = document.querySelector(".cn-hdr-ball");
    const section = document.getElementById("csd-fold2");

    function handleMouseMove(event) {
        const rect = section.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        gsap.to(ball, {
            x: x,
            y: y,
            duration: 0.1,
            ease: "power2.out"
        });
    }

    section.addEventListener("mousemove", handleMouseMove);

    ScrollTrigger.create({
        trigger: section,
        start: "center center",
        end: "top 20%",
        onEnter: function() {
            section.removeEventListener("mousemove", handleMouseMove);
        },
        onLeaveBack: function() {
            section.addEventListener("mousemove", handleMouseMove);
        }
    });
});




//// FOLD 5 - to left and right

  // Animation to move the .to-left div to the right and the .to-right div to the left
    gsap.to(".to-left", {
      x: "50%", // Moves the .to-left div to the right by its full width
      ease: "none",
      scrollTrigger: {
        trigger: ".pg-csd-8",
         start: "top center",
//           end: "bottom top",
           end: () => "+=" + document.querySelector(".to-left").scrollWidth,
         scrub: true,
    scrubDuration: 15 
      }
    });

    gsap.to(".to-right", {
      x: "-50%", // Moves the .to-right div to the left by its full width
      ease: "none",
      scrollTrigger: {
        trigger: ".pg-csd-8",
        start: "top center",
//           end: "bottom top",
          end: () => "+=" + document.querySelector(".to-right").scrollWidth,
          duration:3,
        scrub: true,
    scrubDuration: 15 
      }
    });

//////


////Mini Carousel

    gsap.to(".pg-csd-mini", {
      x: "-20%", // Moves the .to-right div to the left by its full width
      ease: "none",
      scrollTrigger: {
        trigger: ".pg-csd-fold3",
        start: "top 80%",
//           end: "bottom top",
          end: () => "+=" + document.querySelector(".pg-csd-mini").scrollWidth,
          duration:3,
        scrub: true,
    scrubDuration: 15 
      }
    });

////// Tags

   const badges = document.querySelectorAll('.pg-csd-fold6 .badge');

    badges.forEach((badge, index) => {
        gsap.from(badge, {
            
            opacity: 0,
            duration: 1,
             scrub: true,
    scrubDuration: 15,
            x: -100,
             ease: "ease-in",
            scrollTrigger: {
                trigger: badge,
                start: "top bottom", // When the top of each badge reaches 80% of the viewport height
                toggleActions: 'play pause resume reverse'
            }
        });
    });




