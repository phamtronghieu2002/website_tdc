$('.product-images-slider').flexslider({
    animation: 'slide',
    controlNav: 'thumbnails',
});

const flexSlider = $_('.slides');
const imgSList = flexSlider.querySelectorAll('img');

imgSList.forEach((img) => {
    img.style.position = 'relative';
    tools.imageZoom(img, 'img-zoom-area');
});
