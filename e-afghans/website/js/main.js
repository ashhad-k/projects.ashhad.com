
//
 const fixedTopDiv = document.querySelector('.fixed-top');

    window.addEventListener('scroll', () => {
      // Check if the page has been scrolled 50px or more
      if (window.scrollY > 50) {
        fixedTopDiv.classList.add('scrolled');
      } else {
        fixedTopDiv.classList.remove('scrolled');
      }
    });

//
const marquee = document.getElementById('marquee');

// Set the initial speed
let speed = 5; // Speed in seconds
marquee.style.animationDuration = `${speed}s`;

// Function to slow down the speed
function slowDown() {
    speed += 1; // Increase speed duration
    marquee.style.animationDuration = `${speed}s`;
}

// Event listeners for mouse enter and leave
marquee.addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused'; // Pause on hover
});

marquee.addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running'; // Resume on mouse leave
    slowDown(); // Slow down the speed
});