const $_ = document.querySelector.bind(document);
const $$_ = document.querySelectorAll.bind(document);

const toTopBtn = $_('.scroll-to-top');
const menuBtn = $_('.menu-icon');
const scrollPrompt = $_('.scroll-prompt');
const closeMenuBtn = $_('.close-menu-btn');
const menuMobileOpacity = $_('.menu-mobile-opacity');
const mainContent = $_('.main-content');
const html = document.documentElement;

const headerEl = document.getElementById('header-bottom');
const headerElDistanceToTop = window.pageYOffset + headerEl.getBoundingClientRect().top;

const windowWidth = window.screen.width;
const screenWidth = $(window).width();
const menuMobileWrapper = $_('.menu-mobile-wrapper');

menuBtn.onclick = (e) => {
    tools.display(menuMobileWrapper, 'flex', 'animate__fadeInLeft', 'animate__fadeOutLeft');
    tools.display(menuMobileOpacity, 'flex', 'animate__fadeIn', 'animate__fadeOut');
};
closeMenuBtn.onclick = (e) => {
    tools.display(menuMobileWrapper, 'none', 'animate__fadeOutLeft', 'animate__fadeInLeft');
    tools.display(menuMobileOpacity, 'none', 'animate__fadeOut', 'animate__fadeIn');
};
menuMobileOpacity.onclick = (e) => {
    closeMenuBtn.click();
};

toTopBtn.onclick = (e) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

$(window).scroll(function () {
    // & ($(window).scrollTop() < document.body.scrollHeight - 1000)
    const screenHeight = $(window).height();
    const topD = $(window).scrollTop();

    const measure = Math.ceil((topD / (html.offsetHeight - window.screen.height)) * 100);

    $_('.measure-scroll').style.width = measure + '%';

    let pc = topD > 50 ? 10 : topD - 40;
    if (window.screen.width <= 769) {
        pc = 60;
    }

    if (topD >= headerElDistanceToTop && topD >= 40 && topD + 200 + screenHeight < html.offsetHeight) {
        headerEl.style.height = `${60 - pc}px`;
        // console.log(pc);
        mainContent.style.marginTop = 60 - pc + 'px';
        headerEl.classList.add('fixed-header');
        tools.display(scrollPrompt, 'none', 'animate__fadeInDown', 'animate__fadeOutUp');

        tools.display(toTopBtn, 'flex', 'animate__fadeInUp', 'animate__fadeOutDown');
    } else {
        mainContent.style.marginTop = 0;
        headerEl.style.height = '60px';
        headerEl.classList.remove('fixed-header');
        if (toTopBtn.style.display === 'none') {
            return;
        }
        tools.display(toTopBtn, 'none', 'animate__fadeOutDown', 'animate__fadeInUp');
    }
});
