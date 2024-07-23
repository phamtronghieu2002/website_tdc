//handle scroll to top
const btn_scroll_to_top =$('.scroll-top');

btn_scroll_to_top.click(function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});
window.addEventListener("scroll", function () {

    if (window.scrollY > 100) {
        btn_scroll_to_top.addClass("open");
    } else {
        btn_scroll_to_top.removeClass("open");
    }
  });
  

//preloader
const preloader = $('#preloader');
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        preloader.hide();
    }, 700);
});
  
//init AOS
AOS.init();
