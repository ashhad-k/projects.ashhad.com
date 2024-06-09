

// Line 3 columns
gsap.timeline({
    scrollTrigger: {
        trigger: '.cn-3items',
        start: 'top 80%',
        end: 'top top',
        scrub: 0.5
    }
}).to('.line, .line2', {
    height: "100%",
    duration: 0.15,
    ease: "linear"
}).to('.fx1', {
    y: "-200px",
    duration: 0.15,
    opacity: 1,
    ease: "power3.inOut"
});

// Startup - 2 sides scrolling - center fixed script
const container = document.querySelector('.cn-3items');
const sideItems = container.querySelectorAll('.item1, .item3');
const centerItem = container.querySelector('.item2');

const scrollTrigger1 = gsap.timeline({
    scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        pin: centerItem,
        scrub: true
    }
});

scrollTrigger1.to(sideItems, {
    ease: "power3.inOut",
    duration: 1
}).to(centerItem, {
    pin: false,
    duration: 0.25,
    ease: "power2.out"
});

// Reveal each element in .FX2
gsap.utils.toArray('.fx2').forEach(element => {
    gsap.fromTo(element, {
        y: 200,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "top 60%",
            ease: "linear",
            scrub:true,
            toggleActions: "play reset none reverse"
        }
    });
});



// Accordion starts
let accordionTl = gsap.timeline({
  scrollTrigger: {
    invalidateOnResize: true,
    trigger: ".pg-vt-hybrid",
    pin: true, // pin the trigger element while active
    start: "top top", // when the top of the trigger hits the top of the viewport
    end: "+=1600", // end after scrolling 500px beyond the start
    scrub: true,
    markers: true,
      
  }
});

let copies = gsap.utils.toArray(".accordion-copy"),
    items = copies.map(el => el.parentNode);
accordionTl
  .from(copies, {
    stagger: {
      each: 2,
      yoyo: true,
      repeat: 1
    },
    height: 0,
    paddingBottom: 0,
    paddingTop: 0,
    opacity: 1,
    duration: 2,
    marginBottom: 0,
    ease: "power3.inOut",
     toggleActions: "play none none reverse",
  })
copies.forEach((el, i) => {
  let st = accordionTl.scrollTrigger;
  accordionTl.add(() => {
    items.forEach(el => el.classList.remove("open"));
    let activeEl = st.direction < 0 ? items[i - 1] : items[i]
    activeEl && activeEl.classList.add("open");
  }, (i * 2) || 0.001);
})


///circles 

const section = document.querySelector('.pg-vt-fold3');
const circleElements = gsap.utils.toArray('.cr1, .cr2, .cr3, .cr4, .cr5, .cr6, .cr7'); // Select all circle elements

// Pin the section
ScrollTrigger.create({
  trigger: section,
  start: "top top", // Pin from the top of the viewport
//  end: "bottom bottom", 
      end: () => "+=1200",
  pin: true
});

// Animate circle elements individually on scroll
gsap.from(circleElements, {
  y: 150, // Initial y-offset
  opacity: 0, // Start invisible
  duration: 1, // Animation duration
  ease: "power3.inOut", // Easing function
  stagger: {
    each: 0.8, // Delay between each circle animation
    from: "start" // Stagger from the beginning of the timeline
  },
  scrollTrigger: {
    trigger: section,
    start: "top top", // Start animation when the section hits the center of the viewport
    toggleActions: "play none none reverse" // Play once on scroll down, reverse on scroll up
  }
});

///


///==== partnership promise
console.clear();

gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".pg-vt-pp");

sections.forEach((section) => {
  const large = section.querySelector(".v-scroll1");
  gsap.to(large, {
    y: () => (window.innerHeight - large.clientHeight - 64),
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: section,
      pin: true,
      start: "top top",
      end: () => "+=1300",
      scrub: 0.5,
      markers: true,
      invalidateOnRefresh: true,
         toggleActions: "play none none reverse",
    }
  });
});

///==== pg vt industries
console.clear();

gsap.registerPlugin(ScrollTrigger);

const sectionsind = gsap.utils.toArray(".pg-vt-ind");

sectionsind.forEach((section) => {
  const large = section.querySelector(".pg-vt-ind .item2");
  gsap.to(large, {
    y: () => (window.innerHeight - large.clientHeight - 64),
    ease: "power3.inOut",
    scrollTrigger: {
      trigger: sectionsind,
      pin: true,
      start: "top top",
      end: () => "+=1000",
      scrub: 0.5,
      markers: true,
      invalidateOnRefresh: true,
         toggleActions: "play none none reverse",
    }
  });
});



  