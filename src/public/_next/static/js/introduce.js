$(document).ready(function () {
    $('.sec-images').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 2000
    });
    AOS.init({
        once: false // Chạy một lần
    });
});
