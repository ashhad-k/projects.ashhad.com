// AOS
AOS.init({
    offset: 100,
    duration: 500,
    easing: 'ease-in-out',
    delay: 100,
});




// tab tree mage 
const tabLinks = document.querySelectorAll('.nav-link');
const treeImage = document.getElementById('tree-image');

tabLinks.forEach(link => {
  link.addEventListener('click', function() {
    const newImageSrc = this.dataset.image;
    treeImage.src = newImageSrc;
  });
});


/// change tabs to Dropdown for mobile 
document.addEventListener('DOMContentLoaded', function () {
    function activateTab(targetTab) {
        // Activate tab
        var tabLink = document.getElementById(targetTab);
        var tab = new bootstrap.Tab(tabLink);
        tab.show();

        // Change image
        var targetImage = tabLink.getAttribute('data-image');
        document.getElementById('tree-image').setAttribute('src', targetImage);
    }

    function updateDropdownTitle(newTitle) {
        document.querySelector('.dropdown-toggle').textContent = newTitle;
    }

    // Handle nav link click
    document.querySelectorAll('.nav-link').forEach(function (navLink) {
        navLink.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default action
            var targetTab = this.getAttribute('id');
            activateTab(targetTab);
        });
    });

    // Handle dropdown item click
    document.querySelectorAll('.dropdown-item').forEach(function (dropdownItem) {
        dropdownItem.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default action
            var targetTab = this.getAttribute('data-target-tab');
            var newTitle = this.textContent;
            activateTab(targetTab);
            updateDropdownTitle(newTitle);
        });
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
    // Update prices in both tabs
    document.getElementById('price0').textContent = `$${priceMapping[buttonId.replace('-tab2', '')].price0}`;
    document.getElementById('price1').textContent = `$${priceMapping[buttonId.replace('-tab2', '')].price1}`;
    document.getElementById('price0-tab2').textContent = `$${priceMapping[buttonId.replace('-tab2', '')].price0}`;
    document.getElementById('price1-tab2').textContent = `$${priceMapping[buttonId.replace('-tab2', '')].price1}`;

    // Update button states in both tabs
    document.querySelectorAll('.list-group.plus button').forEach(button => {
      button.classList.remove('active');
      if (button.id === buttonId.replace('-tab2', '') || button.id === buttonId) {
        button.classList.add('active');
      }
    });

    // Ensure button state is consistent between tabs
    document.getElementById(buttonId.replace('-tab2', '')).classList.add('active');
    document.getElementById(`${buttonId.replace('-tab2', '')}-tab2`).classList.add('active');
  }

  document.querySelectorAll('.list-group.plus button').forEach(button => {
    button.addEventListener('click', () => {
      updatePricesAndButtons(button.id);
    });
  });

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    const activeButtonId = document.querySelector('.list-group.plus button.active').id;
    updatePricesAndButtons(activeButtonId);
  });
 
