
// Smooth jump-to links
$(document).ready(function() {
    $('a.nav-link').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800); // Adjust scroll speed here (in milliseconds)
        }
    });

    // Toggle animation for navbar toggle
    $(".navbar-toggle").on("click", function () {
        $(this).toggleClass("active");
    });
});

// Scroll event to add/remove class on navbar
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar'); // Ensure this matches your navbar's ID

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) { // Change 50 to your desired scroll position
            navbar.classList.add('bg-scroll');
        } else {
            navbar.classList.remove('bg-scroll');
        }
    });
    
    // Scroll event to add/remove class on navbar
window.addEventListener('scroll', () => {
  const div = document.getElementById('navbar'); // Replace 'myDiv' with your actual div ID

  if (window.scrollY >= 50) {
    div.classList.add('scrolled');
  } else {
    div.classList.remove('scrolled');
  }
});

    // BS accordion active class to head
    var accordionItems = document.querySelectorAll('.accordion-button');

    accordionItems.forEach(function (button) {
        button.addEventListener('click', function () {
            // Remove 'opened' class from all buttons
            accordionItems.forEach(function(btn) {
                btn.classList.remove('opened');
            });

            // Add 'opened' class to the clicked button if it's not already opened
            if (!button.classList.contains('collapsed')) {
                button.classList.add('opened');
            }
        });
    });
});
