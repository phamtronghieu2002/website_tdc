//handle show menu when scroll
const sticky_header = $("#sticky-header");
const menu_mobile = $(".offcanvas-start");

const ToggleMenuMobile = (isOpen) => {

    isOpen ?  menu_mobile.addClass("show") : menu_mobile.removeClass("show");
}

window.addEventListener("scroll", function () {
  var header = document.getElementById("header");
  if (window.scrollY > 50) {
    sticky_header.addClass("sticky-menu");
  } else {
    sticky_header.removeClass("sticky-menu");
  }
});

// active navbar
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
// Check if the link's href matches the current path
if (link.getAttribute('href') === currentPath) {
    // Add the 'active' class to the matching link
    link.classList.add('active');
}
});


