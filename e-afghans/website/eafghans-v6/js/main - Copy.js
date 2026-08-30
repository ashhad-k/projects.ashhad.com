
// Check if the device width is greater than 768px
if (window.innerWidth > 768) {
  // Initialize AOS only for larger screens
  AOS.init({
     duration: 1200,
  });
} else {
  // Optionally, you can remove AOS attributes on mobile if already in HTML
  document.querySelectorAll('[data-aos]').forEach(el => {
    el.removeAttribute('data-aos');
  });
}

// aos
//AOS.init({
//  duration: 1200,
//})




// tab to dropdown
  function switchTab(select) {
    const target = select.value;
    document.querySelector('.tab-pane.active').classList.remove('active', 'show');
    document.querySelector(target).classList.add('active', 'show');
    
    // Sync dropdown with active tab for larger screens
    const tabs = document.querySelectorAll('.nav-link');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[data-bs-target="${target}"]`).classList.add('active');
  }

//

// tab to link ---- EANABLE  if Tabs void 
//function switchTab(select) {
//  window.location.href = select.value;
//}


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


////// MARQUE
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


//// URL HASH --- working
document.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash;

  if (hash) {
    // Split the hash by "/" to get primary and secondary tabs
    const [primaryTabId, secondaryTabId] = hash.substring(1).split("/");

    // Activate the primary tab if it exists
    const primaryTabButton = document.querySelector(`button[data-bs-target="#${primaryTabId}"]`);
    if (primaryTabButton) {
      const primaryTab = new bootstrap.Tab(primaryTabButton);
      primaryTab.show();

      // Activate the secondary tab if it exists
      if (secondaryTabId) {
        const secondaryTabButton = document.querySelector(`button[data-bs-target="#${secondaryTabId}"]`);
        if (secondaryTabButton) {
          const secondaryTab = new bootstrap.Tab(secondaryTabButton);
          secondaryTab.show();
        }
      }
    }
  }

  // Optional: Update URL when switching tabs
  document.querySelectorAll('#primary-tab-list .nav-link, #passport-secondary-tabs .nav-link, #aoid-secondary-tabs .nav-link').forEach(tabLink => {
    tabLink.addEventListener('shown.bs.tab', function (event) {
      const primaryTarget = document.querySelector('#primary-tab-list .nav-link.active').getAttribute('data-bs-target').substring(1);
      const secondaryTarget = document.querySelector(`#${primaryTarget} .nav-tabs .nav-link.active`).getAttribute('data-bs-target').substring(1);
      history.replaceState(null, null, `#${primaryTarget}/${secondaryTarget}`);
    });
  });
});


/// url hash new --- 
document.addEventListener("DOMContentLoaded", function () {
  const hash = window.location.hash;

  if (hash) {
    // Split the hash by "/" to get primary and secondary tabs
    const [primaryTabId, secondaryTabId] = hash.substring(1).split("/");

    // Activate the primary tab if it exists
    const primaryTabButton = document.querySelector(`button[data-bs-target="#${primaryTabId}"]`);
    if (primaryTabButton) {
      const primaryTab = new bootstrap.Tab(primaryTabButton);
      primaryTab.show();

      // Activate the secondary tab if it exists
      if (secondaryTabId) {
        const secondaryTabButton = document.querySelector(`button[data-bs-target="#${primaryTabId} .nav-link[data-bs-target='#${secondaryTabId}']"]`);
        if (secondaryTabButton) {
          const secondaryTab = new bootstrap.Tab(secondaryTabButton);
          secondaryTab.show();
        }
      }
    }
  }

  // Optional: Update URL when switching tabs
  document.querySelectorAll('#services-tab-list .nav-link, #passport-submenu-tab-list .nav-link').forEach(tabLink => {
    tabLink.addEventListener('shown.bs.tab', function (event) {
      const primaryTarget = document.querySelector('#services-tab-list .nav-link.active').getAttribute('data-bs-target').substring(1);
      const secondaryTarget = document.querySelector(`#${primaryTarget} .nav-pills .nav-link.active`).getAttribute('data-bs-target').substring(1);
      history.replaceState(null, null, `#${primaryTarget}/${secondaryTarget}`);
    });
  });
});
