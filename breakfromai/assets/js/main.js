// AOS
AOS.init({
    offset: 100,
    duration: 500,
    easing: 'ease-in-out',
    delay: 100,
});


//// Gsap
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollTrigger.normalizeScroll(true);
  let smoother = ScrollSmoother.create({
    smooth: 2,
    effects: true,
    normalizeScroll: true, 
  });


//// Smooth Jump to
  document.querySelectorAll('.menuItem a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        gsap.to(window, {
          duration: 0.5,
          scrollTo: { y: targetElement, offsetY: 70 },
          ease: "power3.out"  // Ease function for smooth scrolling
        });
      }
    });
  });

// navbar class
document.addEventListener("DOMContentLoaded", function() {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      start: 'top -1px', // start trigger just above the top
      onEnter: () => document.querySelector('.navbar').classList.add('scrolled'),
      onLeaveBack: () => document.querySelector('.navbar').classList.remove('scrolled'),
    });
  });


// Fold 1
gsap.to("#fold1 .m1", { // Target the element within #fold1
  backgroundPositionX: "-50%", // Move background image 50% to the left
  ease: "none",
  scrollTrigger: {
    trigger: "#fold1", // Trigger animation when #fold1 enters viewport
    start: "top bottom", // Start animation when top of #fold1 reaches bottom of viewport
    end: "bottom top",  // End animation when bottom of #fold1 reaches top of viewport
    scrub: 1,           // Smooth animation throughout #fold1 visibility
  }
});




// Fold 2 focus girl
gsap.to(["#fold2 .lhs", "#fold2 .rhs"],{
  x: "0%", // Initial position: 100% off-screen to the left
  ease: "none",
  scrollTrigger: {
    trigger: "#fold2",
    start: "top bottom",
    end: "center center", // Adjust end here if needed
    scrub: 1,
  }
});


// fold 3 pricing
gsap.to(["#fold3 .lhs","#fold3 .thread"], { // Target both elements
  y: "-30%", // Move elements 50% down (adjust for desired parallax effect)
  ease: "none", // Linear ease for simplicity (experiment with others)
  scrollTrigger: {
    trigger: "#fold3",
    start: "top bottom",
    end: "bottom top",
    scrub: true, // Enable smooth scrubbing throughout #fold3 visibility
  }
});


// Fold 5
gsap.to(["#fold5 .to-right"],{
  x: "80%", // Initial position: 100% off-screen to the left
  ease: "none",
  scrollTrigger: {
    trigger: "#fold5",
    start: "top bottom",
    end: "bottom bottom", // Adjust end here if needed
    scrub: 1,
  }
});
gsap.to(["#fold5 .to-left"],{
  x: "-80%", // Initial position: 100% off-screen to the left
  ease: "none",
  scrollTrigger: {
    trigger: "#fold5",
    start: "top bottom",
    end: "bottom bottom", // Adjust end here if needed
    scrub: 1,
  }
});

//// range slider
 
     var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    var cards = document.querySelectorAll(".card3.danger");

    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        output.innerHTML = this.value;
        cards.forEach(function(card) {
            card.style.filter = `blur(${slider.value}px)`;
        });
    }

    
// fold6 CTA

gsap.to(["#fold6 .arrow2"], { 
  y: "300px",
  ease: "none", 
  scrollTrigger: {
    trigger: "#fold6",
    start: "top bottom",
    end: "bottom top",
    scrub: true, 
  }
});

gsap.to(".fold6.cta1", { // Target the element within #fold1
  backgroundPositionX: "-50%", // Move background image 50% to the left
  ease: "none",
  scrollTrigger: {
    trigger: ".fold6", // Trigger animation when #fold1 enters viewport
    start: "top bottom", // Start animation when top of #fold1 reaches bottom of viewport
    end: "bottom top",  // End animation when bottom of #fold1 reaches top of viewport
    scrub: 1,           // Smooth animation throughout #fold1 visibility
  }
});

gsap.to(".fold6 .cat2", { // Target the element within #fold1
  x: "0%", // Move background image 50% to the left
  ease: "none",
  scrollTrigger: {
    trigger: ".fold6", // Trigger animation when #fold1 enters viewport
    start: "top bottom", // Start animation when top of #fold1 reaches bottom of viewport
    end: "center center",  // End animation when bottom of #fold1 reaches top of viewport
    scrub: 1,           // Smooth animation throughout #fold1 visibility
  }
});
