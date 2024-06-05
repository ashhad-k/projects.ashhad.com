
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


// -- Prism panel starts -- //

// Rotate prism on entering .cn-prism
gsap.timeline({
    scrollTrigger: {
        trigger: '.pg-hm-digital',
        scrub: 0.2,
        start: 'top 50%',
        end: "+=300%"
    }
}).to('.prism', {
    rotation: 360,
    duration: 4,
    ease: 'yoyo',
     scrub: 0.2
});

// Pin tabs
const tabs = gsap.utils.toArray(".left-content li");
const amount = tabs.length;
const rightElements = document.querySelector(".right-content");
let active;

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '.pg-hm-digital',
        start: "top top",
        end: "bottom top",
        pin: true,
        scrub: true,
        snap: true,
        snapDirection: "y",
        markers: true
    }
});

tl.to(rightElements, {
    y: () => window.innerHeight - rightElements.scrollHeight,
    ease: "ease-in",
    duration: 2,
    scrub:true
});

tabs.forEach((tab, i) => {
    const position = i / (amount - 1);
    const link = tab.querySelector("a");
    tl.add("tab-" + (i + 1), position).call(() => {
        if (active !== undefined) {
            tabs[active].classList.toggle("selected");
        }
        tab.classList.toggle("selected");
        active = i;
    }, null, position);
    link.addEventListener("click", (e) => {
        e.preventDefault();
        gsap.to(window, {
            scrollTo: {
                y: tl.scrollTrigger.start + (tl.scrollTrigger.end - tl.scrollTrigger.start) * (position / tl.duration())
            },
            duration: 1,
            ease: "power1.inOut",
            scrub:true
        });
    });
});

tl.to({}, { duration: 0.1 });



// -- Prism panel starts -- //


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


  