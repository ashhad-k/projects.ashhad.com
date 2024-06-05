 
//////
gsap.to('.xcircle', {
  ease: 'Power2.easeIn',
  duration: 0.5,
  opacity: 1,
  stagger: {
    each: -0.2
  }
})

gsap.to('.xcircle', {
  ease: 'none',
  duration: 20,
  backgroundImage: 'linear-gradient(#31384f 5%, #0f0f1c 20%, #0f0f1c 80%, #31384f)',
  scale: 2,
  stagger: {
    each: 5,
    repeat: -1,
    onRepeat() {
      const [el] = this.targets();
      el.style.zIndex = el.style.zIndex ? Number(el.style.zIndex) + 1 : 1
    }
  }
}).progress(0.05)

gsap.to('.xcircle', {
  ease: 'none',
  duration: 20,
  keyframes: {
    "80%": { opacity: 1 },
    "100%": { opacity: 0 },
  },
  stagger: {
    each: 5,
    repeat: -1,
  }
}).progress(0.05)






// Simple H Scroll 
    ScrollTrigger.create({
      trigger: ".pg-ab-fold4",
      start: "top top",  // Pin when the top of .pg-ab-fold4 touches the top of the viewport
      pin: true,
      endTrigger: ".hscroll3",
      end: () => "+=" + document.querySelector(".hscroll3").scrollWidth,
    });

    // Second ScrollTrigger to start horizontal scroll when parent div reaches 50% of viewport
    gsap.to(".hscroll3", {
      x: () => -(document.querySelector(".hscroll3").scrollWidth - document.documentElement.clientWidth),
      ease: "none",
      scrollTrigger: {
        trigger: ".pg-ab-fold4",
        start: "20% center",  // Start horizontal scrolling when the center of the viewport hits 50% of the .pg-ab-fold4
        end: () => "+=" + document.querySelector(".hscroll3").scrollWidth,
        scrub: true,
      }
    });

//// FOLD 5 - to left and right

  // Animation to move the .to-left div to the right and the .to-right div to the left
    gsap.to(".to-left", {
      x: "100%", // Moves the .to-left div to the right by its full width
      ease: "none",
      scrollTrigger: {
        trigger: ".pg-ab-fold5",
         start: "top center",
//           end: "bottom top",
           end: () => "+=" + document.querySelector(".to-left").scrollWidth,
         scrub: true,
    scrubDuration: 15 
      }
    });

    gsap.to(".to-right", {
      x: "-100%", // Moves the .to-right div to the left by its full width
      ease: "none",
      scrollTrigger: {
        trigger: ".pg-ab-fold5",
        start: "top center",
//           end: "bottom top",
          end: () => "+=" + document.querySelector(".to-right").scrollWidth,
          duration:3,
        scrub: true,
    scrubDuration: 15 
      }
    });

//////

// Create parallax effect for each column
    gsap.utils.toArray('.column').forEach((column, i) => {
      gsap.fromTo(column, 
        { y: i % 2 === 0 ? 100 : -200 }, // Initial position (alternating direction for parallax effect)
        {
          y: 50,
          ease: 'none',
          scrollTrigger: {
            trigger: '.pg-ab-team',
            start: 'top bottom', // Start when the top of the trigger hits the bottom of the viewport
            end: 'bottom top', // End when the bottom of the trigger hits the top of the viewport
            scrub: true,
          }
        }
      );
    });





