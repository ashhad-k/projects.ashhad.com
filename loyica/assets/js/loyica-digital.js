///==== partnership promise
console.clear();

gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray(".pg-dgl-brands");

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


//



// Marquee animations
['.cn-marquee', '.cn-marquee1', '.cn-marquee2'].forEach((selector, i) => {
  gsap.timeline({
    scrollTrigger: {
      trigger: selector,
      scrub: 0.2,
      start: 'top 80%',
      markers: true,
      end: "+=300%"
    }
  }).to(`${selector} .marquee-container`, {
    x: i % 2 === 0 ? "-100%" : "100%",
    duration: 10,
    ease: "linear"
  });
});





// Timeline TREE
const line4 = document.querySelector(".line4");
const cnT1 = document.querySelector(".cn-t1");
const sectionTitle = document.querySelector(".section-title");
const tree1 = document.querySelector(".tree1");


// Animate line height when .cn-t1 reaches 50% viewport
gsap.to(line4, {
  height: "100%",
  duration: 4,
  ease: "power3.out",
  scrollTrigger: {
    trigger: cnT1,
    start: "top 55%",
    toggleActions: "play none none reverse",
    duration: 1,
    ease: "power2.out"
  }
});

// Pin only the .section-title element until .tree1 scrolls past
const trigger = gsap.timeline({
  scrollTrigger: {
    trigger: sectionTitle, // Pin the .section-title element
    start: "top top",
    end: () => `+=${tree1.offsetHeight}`, // Pin until .tree1 scrolls past
    pin: true,
    pinSpacing: false,
  },
});




//// 22 horizontal sliders 2

const scrubValue = 0.5;

let container1 = document.querySelector('.dgl-hscroll1');
let container2 = document.querySelector('.dgl-hscroll2');

const scrollBar1 = gsap.to('.scrollbar', {
  x: () => {
    return window.innerWidth - (150 + 20);
  },
  ease: "none"
});

const scrollBar2 = gsap.to('.scrollbar2', {
  x: () => {
    return window.innerWidth - (150 + 20);
  },
  ease: "none"
});

// Pin the first section
ScrollTrigger.create({
  trigger: ".pg-dgl-impact",
  start: "top top",
  end: () => "+=" + (container1.scrollWidth - window.innerWidth),
  pin: true,
  scrub: scrubValue,
  animation: scrollBar1,
  anticipatePin: 1,
  invalidateOnRefresh: true,
});

// Pin the second section
ScrollTrigger.create({
  trigger: ".pg-dgl-trs",
  start: "top top",
  end: () => "+=" + (container2.scrollWidth - window.innerWidth),
  pin: true,
  scrub: scrubValue,
  animation: scrollBar2,
  anticipatePin: 1,
  invalidateOnRefresh: true,
});

let thumbNails1 = gsap.utils.toArray(".thumbnail");
let thumbNails2 = gsap.utils.toArray(".thumbnail2");
let anchors1 = gsap.utils.toArray(".anchor");
let anchors2 = gsap.utils.toArray(".anchor2");

const updateThumbnails = (thumb, anchors, index, container) => {
  const scrollTriggerConfig = {
    trigger: container,
    start: 'top top',
    scrub: scrubValue,
    invalidateOnRefresh: true,
    onUpdate: self => {
      const wrapperBounds = container.getBoundingClientRect();
      const thumbBounds = thumb.getBoundingClientRect();
      const xPosition = thumbBounds.left - wrapperBounds.left;

      if (xPosition >= -100 && xPosition <= 700) {
        thumb.classList.add('active');
        anchors[index].classList.add('active');
      } else {
        thumb.classList.remove('active');
        anchors[index].classList.remove('active');
      }
    }
  };

  if (thumb.classList.contains('fakePin')) {
    const prevAll = (element) => {
      let result = [];
      while (element = element.previousElementSibling)
        result.push(element);
      return result;
    };

    const getTotalWidthToMove = () => {
      let totalWidthToMove = 0;
      prevAll(thumb).forEach((thumbBefore) => {
        let style = thumbBefore.currentStyle || window.getComputedStyle(thumbBefore);
        let marginRight = parseInt(style.marginRight);
        totalWidthToMove += thumbBefore.offsetWidth + marginRight;
      });
      return totalWidthToMove;
    };

    gsap.to(thumb, {
      x: () => -getTotalWidthToMove(),
      ease: "none",
      scrollTrigger: {
        ...scrollTriggerConfig,
        end: () => "+=" + getTotalWidthToMove(),
      }
    });

  } else {
    gsap.to(thumb, {
      x: () => -(container.scrollWidth),
      ease: "none",
      scrollTrigger: {
        ...scrollTriggerConfig,
        end: () => "+=" + (container.scrollWidth),
      }
    });
  }
};

// Apply updateThumbnails to both sets of thumbnails
thumbNails1.forEach((thumb, i) => updateThumbnails(thumb, anchors1, i, document.querySelector('.wrapper')));
thumbNails2.forEach((thumb, i) => updateThumbnails(thumb, anchors2, i, document.querySelector('.wrapper2')));




// Pin tabs -pg-dgl-sol
const tabs = gsap.utils.toArray(".left-content li");
const amount = tabs.length;
const rightElements = document.querySelector(".right-content");
let active;

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.cn-prism',
    start: "top top",
    end: "bottom top",
    pin: true,
    scrub: 1,
    snap: true,
    snapDirection: "y",
    markers: true
  }
});

tl.to(rightElements, {
  y: () => window.innerHeight - rightElements.scrollHeight,
   ease: "power1.inOut",
  duration: 2,
  scrub: 1
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
      duration: 2,
      scrub: 1,
      ease: "power1.inOut"
    });
  });
});

tl.to({}, {
  duration: 0.5
});




