const searchIcon = $_('.search-icon');
const productAddBtn = $$_('.add-to-cart');
const numOfCart = $$_('.num-of-cart');
const cartPreview = $_('.cart-preview');
var currentLocation = window.location.origin;
const toastDuration = 2000;

const appData = {};

// API defined
const mainData = '/api/maindata/all';

tools.renderCartPreview();
fetch(currentLocation + mainData)
    .then((data) => data.json())
    .then((data) => {
        appData.mainData = data;
        tools.handleAppEvent.addCart(appData.mainData);
        tools.handleAppEvent.removeCart(appData.mainData);
    });

const allInput = $$_('input, textarea');

allInput.forEach((input) => {
    input.onfocus = (e) => {
        input.classList.remove('invalid');
    };
});

searchIcon.onclick = (e) => {
    searchIcon.classList.add('active');
    const searchInput = searchIcon.querySelector('input');
    searchInput.focus();
    $_('.search-btn').onclick = (e) => {};
    searchInput.onblur = (e) => {
        setTimeout(() => {
            searchIcon.classList.remove('active');
        }, 100);
    };
};

var myModal = new bootstrap.Modal(document.getElementById('modalMain'), {
    keyboard: false,
});
const didShowAd = localStorage.getItem('isShowAd');
if (!didShowAd) {
    setTimeout(() => {
        myModal.show();
        localStorage.setItem('isShowAd', true);
    }, 1000);
}
