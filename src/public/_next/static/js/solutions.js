$(document).ready(function() {
    const smallScreenWidth = 768; // Ví dụ: 768px là ngưỡng cho màn hình nhỏ
    
    function checkScreenSize() {
        if (window.innerWidth <= smallScreenWidth) {
            $('.fade1').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                asNavFor: '.slider-nav'
            });
            $('.slider-nav').slick({
                slidesToShow: 1.71,
                slidesToScroll: 1,
                asNavFor: '.fade1',
                dots: true,
                centerMode: true,
                focusOnSelect: true
            });
        } else {
            $('.fade1').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: true,
                fade: true,
                asNavFor: '.slider-nav'
            });
            $('.slider-nav').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                asNavFor: '.fade1',
                dots: true,
                centerMode: true,
                focusOnSelect: true
            });
        }
    }

    // Gọi hàm kiểm tra kích thước màn hình khi tải trang
    checkScreenSize();

    // Bắt sự kiện thay đổi kích thước cửa sổ
    window.addEventListener('resize', checkScreenSize);
});
