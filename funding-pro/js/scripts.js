// AOS
AOS.init({
    offset: 100,
    duration: 500,
    easing: 'ease-in-out',
    delay: 100,
});

AOS.init({
  disable: function() {
    var maxWidth = 1024;
    return window.innerWidth < maxWidth;
  }
});


// apply class when user scrolled navigation
$(document).ready(function() {
  var prevScrollPos = $(window).scrollTop();
  $(window).scroll(function() {
    var currentScrollPos = $(window).scrollTop();
    if (prevScrollPos < currentScrollPos) {
      $("#nav1").addClass("scrolled-down");
    } else {
      $("#nav1").removeClass("scrolled-down");
    }
    prevScrollPos = currentScrollPos;
  });
});




// prices 
const priceMapping = {
  'btn-2_5k': { price0: 10, price1: 10 },
  'btn-5k': { price0: 34, price1: 20 },
  'btn-10k': { price0: 67, price1: 30 },
  'btn-25k': { price0: 167, price1: 100 },
  'btn-50k': { price0: 277, price1: 200 },
  'btn-100k': { price0: 577, price1: 500 }
};

function updatePricesAndButtons(buttonId) {
  // Get the button ID without the tab suffix
  const cleanButtonId = buttonId.replace('-tab2', '');
  
  // Update prices in both tabs
  document.getElementById('price0').textContent = `$${priceMapping[cleanButtonId].price0}`;
  document.getElementById('price1').textContent = `$${priceMapping[cleanButtonId].price1}`;
  document.getElementById('price0-tab2').textContent = `$${priceMapping[cleanButtonId].price0}`;
  document.getElementById('price1-tab2').textContent = `$${priceMapping[cleanButtonId].price1}`;

  // Update button states in both tabs
  document.querySelectorAll('.btn-outline-primary').forEach(button => {
    button.classList.remove('active');
    if (button.id === cleanButtonId || button.id === `${cleanButtonId}-tab2`) {
      button.classList.add('active');
    }
  });

  // Ensure button state is consistent between tabs
  document.getElementById(cleanButtonId).classList.add('active');
  document.getElementById(`${cleanButtonId}-tab2`).classList.add('active');
}

document.querySelectorAll('.btn-outline-primary').forEach(button => {
  button.addEventListener('click', () => {
    updatePricesAndButtons(button.id);
  });
});

$('a[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
  const activeButtonId = document.querySelector('.btn-outline-primary.active').id;
  updatePricesAndButtons(activeButtonId);
});

