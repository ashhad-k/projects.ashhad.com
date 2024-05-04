function handleScroll() {
    const firstSection = document.getElementById('firstsection');
    const secondsection = document.getElementById('secondsection');
    const thirdSection = document.getElementById('thirdsection');
  
    const thirdSectionRect = thirdSection.getBoundingClientRect();
  
    // Check if #thirdsection touches the top
    const isTouchingTop = thirdSectionRect.top <= 0;
  
    // Toggle the 'hidden' class based on the condition
    firstSection.classList.toggle('hidden', isTouchingTop);
    secondsection.classList.toggle('hidden', isTouchingTop);
  }
  
  window.addEventListener('scroll', handleScroll);
  
  $('.imagecard').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    loop:true,
    autoplaySpeed: 1000,
    centerMode: true,
    focusOnSelect: true,
    cssEase: 'linear',
    pauseOnHover:true,
    responsive: [
        {
            breakpoint: 991,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }
    ]
  
  
  });
  $('.sliderone').slick({
    dots: false,
    arrow:false,
    infinite: true,
    autoplaySpeed: 2500,
    speed:1000,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    pauseOnHover:false
  });
  $('.slidertwo').slick({
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    cssEase: 'linear',
    pauseOnHover: false,
    arrows: true,
    dots: true,
    centerMode: false,
    focusOnSelect: false,
    responsive: [
        {
            breakpoint: 991,
            settings: {
                arrows: true,
                centerMode: false,
                focusOnSelect: false,
                centerPadding: '40px',
                slidesToShow: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: true,
                centerMode: false,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }
    ]
  });
  function isElementInCenter(element) {
    const rect = element.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
  
    return (
        rect.left <= centerX &&
        rect.right >= centerX &&
        rect.top <= centerY
      //  rect.bottom >= centerY
    );
  }
  
  // Function to add a class to the element when it's in the center
  function addClassAndScaleIfInCenter() {
    const elements = document.querySelectorAll('.imagehead, .imagehead2');
  
    elements.forEach((element) => {
      const isInCenter = isElementInCenter(element);
  
      if (isInCenter) {
        element.classList.add('centered');
      } else {
        element.classList.remove('centered');
      }
    });
  }
  
  // Call the function on page load and when the window is resized or scrolled
  window.addEventListener('load', addClassAndScaleIfInCenter);
  window.addEventListener('resize', addClassAndScaleIfInCenter);
  window.addEventListener('scroll', addClassAndScaleIfInCenter);
  
  const menubtn = document.getElementById('mmtoggle');
  const menuopen = document.querySelector('.mobilemenu');
  function addClassOnClick() {
    menubtn.classList.toggle('clicked');
    menuopen.classList.toggle('openmenu');
    document.querySelector(".topnav").classList.toggle('sticktop');
    
  }
  menubtn.addEventListener('click', addClassOnClick);
  
  $('.linkbtn').on('click', function (e) {
    $('#mmtoggle').removeClass('clicked');;
    $('.mobilemenu').removeClass('openmenu');
    
    e.preventDefault();
  
    const target = $($(this).attr('href'));
    if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top
        }, {
            duration: 1000, // Adjust the duration (in milliseconds) as needed
            easing: 'swing'
        }); // Adjust the duration (in milliseconds) as needed
    }
  
  
  });
   
  
  document.addEventListener("DOMContentLoaded", function() {
    var bodyhold = document.querySelector("body");
    var preloader = document.getElementById("preloader");
  
    bodyhold.classList.add("onhold");
  
    window.onload = function() {
      // Add a class to initiate the fade out
      bodyhold.classList.remove("onhold");
      preloader.classList.add("hiddenloader");
      document.body.style.overflow = "auto"; // Allow scrolling after preloader is hidden
    };
  });
  
  
  
  
    let prevScrollPos = window.pageYOffset;
  
      window.onscroll = function() {
        let currentScrollPos = window.pageYOffset;
  
        if (prevScrollPos > currentScrollPos) {
          document.querySelector(".topnav").style.top = "0";
          document.querySelector(".topnav").style.background = "#0F010F";
        } else {
          document.querySelector(".topnav").style.top = "-100px"; // Adjust as needed
          document.querySelector(".topnav").style.background = "none";
        }
  
        setTimeout(() => {
          
          prevScrollPos = currentScrollPos;
        }, 1500);
      }
  
  
      
  
      /*document.addEventListener("DOMContentLoaded", function () {
        var lazyLoadSection = document.getElementById("firstsection");
        var video;
  
        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5
        };
  
        var callback = function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // Load and play the video when the section is in the viewport
                    video = document.createElement("video");  
                    video.src = "../greengroup/img/hero.webm"; // Replace with the path to your video
                    video.autoplay = true;
                    video.loop = true;
                    video.playsInline = true;
  
                    video.poster = "../greengroup/img/hero.jpg"; // Replace with the path to your poster image
  
                    lazyLoadSection.appendChild(video);
  
  
                    // Stop observing once the video is loaded
                    observer.unobserve(lazyLoadSection);
                }
            });
        };
  
        var observer = new IntersectionObserver(callback, options);
        observer.observe(lazyLoadSection);
    });
    */
  
    function addClassToElements(clickedElement) {
      // Get the ID of the clicked element
      var clickedID = clickedElement.id;
    
      // Derive the class name from the clicked ID
      var className = clickedID;
    
      // Get all elements with the derived class name
      var elements = document.querySelectorAll(' .' + className);
    
      // Add the "showbox" class to each element
      elements.forEach(function(element) {
        element.classList.add('showbox');
      });
    }
    
  
  function hidebox() {
    // Get all elements with the "showbox" class
    var elements = document.querySelectorAll('.showbox');
  
    // Remove the "showbox" class from each element
    elements.forEach(function(element) {
        element.classList.remove('showbox');
    });
  }
  
  
  Splitting();
  ScrollOut({
     targets: '[data-splitting]'
  });
   
  
  
  document.addEventListener('DOMContentLoaded', function() {
    new WOW().init();
  
    const repeatableElements = document.querySelectorAll('.repeatable-animation');
  
    const debounce = (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };
  
    const handleIntersection = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
            } else {
                entry.target.style.opacity = 0;
            }
        });
    };
  
    const observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.5,
        rootMargin: '0px 0px 150px 0px' // Adjust root margin as needed
    });
  
    repeatableElements.forEach(element => {
        observer.observe(element);
    });
  
    const handleScroll = debounce(() => {
        observer.disconnect();
        repeatableElements.forEach(element => {
            observer.observe(element);
        });
    }, 50); // Adjust debounce wait time as needed
  
    window.addEventListener('scroll', handleScroll);
  });
  
   