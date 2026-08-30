

/////// JS for prism container 

// Rotate prism on entering .cn-prism
gsap.timeline({
    scrollTrigger: {
        trigger: '.pg-hm-digital',
        scrub: 0.2,
        start: 'top 50%',
        end: "bottom top"
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
        scrub: 0.2,
        snap: true,
        snapDirection: "y",
        markers: true
    }
});

tl.to(rightElements, {
    y: () => window.innerHeight - rightElements.scrollHeight,
    ease: "ease-in",
    duration: 2,
     scrub: 0.2,
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

tl.to({}, { duration: 1 });

