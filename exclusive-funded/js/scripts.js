
// tab tree mage 
const tabLinks = document.querySelectorAll('.nav-link');
const treeImage = document.getElementById('tree-image');

tabLinks.forEach(link => {
  link.addEventListener('click', function() {
    const newImageSrc = this.dataset.image;
    treeImage.src = newImageSrc;
  });
});

///
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

