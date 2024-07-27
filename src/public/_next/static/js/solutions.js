$('.fade').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
    
});



$('.slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.fade',
    dots: true,
    centerMode: true,
    focusOnSelect: true
});


// Định nghĩa chiều rộng màn hình nhỏ
const smallScreenWidth = 768; // Ví dụ: 768px là ngưỡng cho màn hình nhỏ

// Hàm để kiểm tra kích thước màn hình
function checkScreenSize() {
  if (window.innerWidth <= smallScreenWidth) {
    alert('Màn hình nhỏ hơn hoặc bằng 768px');
    $('.slider-nav').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: '.fade',
        dots: true,
        centerMode: true,
        focusOnSelect: true
    });
  } else {
 
  }
}

// Gọi hàm kiểm tra kích thước màn hình khi tải trang
checkScreenSize();

// Bắt sự kiện thay đổi kích thước cửa sổ
window.addEventListener('resize', checkScreenSize);

console.log(data[0].images);
