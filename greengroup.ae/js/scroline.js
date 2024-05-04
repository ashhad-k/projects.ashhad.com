
document.addEventListener("DOMContentLoaded", function() {

const line = document.getElementById("section__line"),
lineWrapper = document.getElementById("section__wrapper");
gsap.set(line, {transformOrigin: "left top"})
gsap.fromTo(line, {
 scaleX: 0,
}, {
    scrollTrigger: {
        trigger: line,
        start: "center 85%",
        end: "+=100%",
        markers: true,
        scrub: true,
    },
    scaleX: 1,
}); 
})
