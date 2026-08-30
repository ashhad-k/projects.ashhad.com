
//-----------------------
// SECTION RELATED GSAP   
//-----------------------

// MORPHING    
//start
const down = 'M1807,213.5H113C271.3,87.5,606.6,0,918.8,0S1619.8,87.5,1807,213.5z'; //  
//end
const center = 'M1807,213.5H113c173.7-1.4,493.6-0.9,805.7-0.9S1533.8,213.4,1807,213.5z'; // 

ScrollTrigger.create({
    trigger: '.hm1',
    start: 'top 60%',
    toggleActions: 'play none none none',
    onEnter: self => {
        const velocity = self.getVelocity();
        const variation = velocity / 10000;

        const morphTimeline = gsap.timeline({ paused: true });

        morphTimeline.fromTo('#bouncy-path', {
            morphSVG: down
        }, {
            duration: 1,
            morphSVG: center,
            ease: `elastic.out(${1 + variation}, ${1 - variation})`,
            overwrite: 'true',
        });

        morphTimeline.play();
    }
});

// Mouse yoyo
gsap.to('.mouse-icon', {
    y: 20,
    duration: 1,
    yoyo: true,
    repeat: -1,
    ease: "power1.inOut"
});

// Pin and panel with a class .sticky-panel
gsap.utils.toArray(".sticky-panel").forEach((panel, i) => {
    ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false
    });
});


// pg hm hero
gsap.to(".home-hero1", {
    backgroundSize: "300%", // Final size
    opacity:0.5,
    scrollTrigger: {
        trigger: ".home-hero1",
        start: "top top", // Start animation when the top of .home-hero1 hits the top of the viewport
        end: "bottom top", // End animation when the bottom of .home-hero1 hits the top of the viewport
        scrub: true // Smooth animation linked to the scroll position
    }
});

// pg-hm-fold2
// Animation code
gsap.to(".pg-hm-fold2", {
    backgroundSize: "300%", // Final size
    backgroundRotate:"90",
    scrollTrigger: {
        trigger: ".pg-hm-fold2",
        start: "top bottom", // Start animation when the top of .pg-hm-fold2 hits the bottom of the viewport
        end: "bottom top", // End animation when the top of .pg-hm-fold2 hits the top of the viewport
        scrub: true // Smooth animation linked to the scroll position
    }
});


// -- Prism panel starts -- //
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Rotate prism on entering .pg-hm-digital
    gsap.timeline({
        scrollTrigger: {
            trigger: '.pg-hm-digital',
            scrub: 0.2,
            start: 'top 50%',
            end: 'bottom top'
        }
    }).to('.prism', {
        rotation: 360,
        duration: 4,
        ease: 'none'
    });

    // Pin tabs and manage tab switching
    const tabs = gsap.utils.toArray(".left-content li");
    const rightElements = gsap.utils.toArray(".right-element");
    let active = 0;

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.pg-hm-digital',
            start: 'top top',
            end: 'bottom top',
            pin: true,
            scrub: 0.2,
            snap: {
                snapTo: 1 / (tabs.length - 1),
                duration: { min: 0.2, max: 0.8 }, // Adjust snap duration
                ease: 'power1.inOut',
                delay: 0.5 // Add a small delay to avoid snapping too quickly
            },
            markers: true
        }
    });

    // Set initial state
    gsap.set(rightElements, { autoAlpha: 0 });
    gsap.set(rightElements[0], { autoAlpha: 1 });

    // Loop through each tab and set up the animations
    tabs.forEach((tab, i) => {
        const position = i / (tabs.length - 1);

        // Add label at each position for snapping
        tl.add("tab-" + (i + 1), position);

        tl.to({}, {
            duration: 0.1,
            onStart: () => {
                // Hide previous content
                if (active !== undefined) {
                    gsap.to(rightElements[active], { autoAlpha: 0 });
                    tabs[active].classList.remove("selected");
                }
                // Show current content
                gsap.to(rightElements[i], { autoAlpha: 1 });
                tabs[i].classList.add("selected");
                active = i;
            },
            onReverseComplete: () => {
                // Handle backward scrolling
                if (active !== undefined) {
                    gsap.to(rightElements[active], { autoAlpha: 0 });
                    tabs[active].classList.remove("selected");
                }
                gsap.to(rightElements[i], { autoAlpha: 1 });
                tabs[i].classList.add("selected");
                active = i;
            }
        }, position);
    });

    // Add click event listener to tabs
    tabs.forEach((tab, i) => {
        const position = i / (tabs.length - 1);
        tab.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            gsap.to(window, {
                scrollTo: {
                    y: tl.scrollTrigger.start + (tl.scrollTrigger.end - tl.scrollTrigger.start) * position,
                    autoKill: true // Ensure it smoothly scrolls to the target position
                },
                duration: 0.5, // Adjust duration for a smoother and quicker scroll
                ease: 'power2.inOut',
                onComplete: () => {
                    // Ensure correct tab content is shown after scroll
                    gsap.to(rightElements, { autoAlpha: 0 });
                    gsap.to(rightElements[i], { autoAlpha: 1 });
                    tabs.forEach(tab => tab.classList.remove('selected'));
                    tabs[i].classList.add('selected');
                    active = i;
                }
            });
        });
    });
});



// -- Prism panel END -- //


// Line 3 columns section
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
            toggleActions: "play none none reverse"
        }
    });
});


// Success Stories
const masterTimeline = gsap.timeline();
const targetDiv = document.querySelector("#s-casestudies .pg-hm-success");

['.line-h1', '.line-h2', '.line-h3'].forEach((selector, i) => {
    const lineAnimation = gsap.timeline();
    lineAnimation.set(targetDiv, { className: `pg-hm-success s-cs-bg${i + 1}` });
    lineAnimation.fromTo(selector, {
        width: "0%",
        backgroundColor: "#FF5C00",
         ease: "linear",
         duration: 2,
          scrub: 0.2
        
    }, {
        width: "100%",
//        backgroundColor: "white",
        background:"#ffffff",
         ease: "linear",
        duration: 2,
       scrub: true
    });
    masterTimeline.add(lineAnimation);
});

masterTimeline.play();

ScrollTrigger.create({
    trigger: "#s-casestudies",
    start: "top top",
    end: "+=100%",
    pin: true,
    pinSpacing: false,
    animation: masterTimeline,
    scrub: true
});





// mouse on ball small
//var $box = $('#mouse');
//function moveBox (e) { 
//  TweenMax.to( $box, 1.8, {
//    css: { left: e.pageX, top: e.pageY },
//    ease: "easeInOut"});
//}
//$(window).on('mousemove', moveBox);


  