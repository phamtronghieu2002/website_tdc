
// variables
const headerSectionSolutions = document.querySelector('.header-section-solutions')
const Components = {
    province: () => {
        return `
 <select class="form-select" name="province_id"
                                                    data-gtm-form-interact-field-id="2">
                                                    <option value="0" selected="" disabled="">Khu vực</option>
                                                    <option value="101">Hà&nbsp;Nội</option>
                                                    <option value="701">TP&nbsp;Hồ&nbsp;Chí&nbsp;Minh</option>
                                                    <option value="501">Đà&nbsp;Nẵng</option>
                                                    <option value="805">An&nbsp;Giang</option>
                                                    <option value="717">Bà&nbsp;Rịa&nbsp;-&nbsp;Vũng&nbsp;Tàu</option>
                                                    <option value="207">Bắc&nbsp;Cạn</option>
                                                    <option value="221">Bắc&nbsp;Giang</option>
                                                    <option value="821">Bạc&nbsp;Liêu</option>
                                                    <option value="223">Bắc&nbsp;Ninh</option>
                                                    <option value="811">Bến&nbsp;Tre</option>
                                                    <option value="507">Bình&nbsp;Định</option>
                                                    <option value="711">Bình&nbsp;Dương</option>
                                                    <option value="707">Bình&nbsp;Phước</option>
                                                    <option value="715">Bình&nbsp;Thuận</option>
                                                    <option value="823">Cà&nbsp;Mau</option>
                                                    <option value="815">Cần&nbsp;Thơ</option>
                                                    <option value="203">Cao&nbsp;Bằng</option>
                                                    <option value="605">Đắc&nbsp;Lắc</option>
                                                    <option value="606">Đắk&nbsp;Nông</option>
                                                    <option value="301">Điện&nbsp;Biên</option>
                                                    <option value="713">Đồng&nbsp;Nai</option>
                                                    <option value="803">Đồng&nbsp;Tháp</option>
                                                    <option value="603">Gia&nbsp;Lai</option>
                                                    <option value="201">Hà&nbsp;Giang</option>
                                                    <option value="111">Hà&nbsp;Nam</option>
                                                    <option value="405">Hà&nbsp;Tĩnh</option>
                                                    <option value="107">Hải&nbsp;Dương</option>
                                                    <option value="103">Hải&nbsp;Phòng</option>
                                                    <option value="816">Hậu&nbsp;Giang</option>
                                                    <option value="305">Hòa&nbsp;Bình</option>
                                                    <option value="109">Hưng&nbsp;Yên</option>
                                                    <option value="511">Khánh&nbsp;Hòa</option>
                                                    <option value="813">Kiên&nbsp;Giang</option>
                                                    <option value="601">Kon&nbsp;Tum</option>
                                                    <option value="302">Lai&nbsp;Châu</option>
                                                    <option value="703">Lâm&nbsp;Đồng</option>
                                                    <option value="209">Lạng&nbsp;Sơn</option>
                                                    <option value="205">Lào&nbsp;Cai</option>
                                                    <option value="801">Long&nbsp;An</option>
                                                    <option value="113">Nam&nbsp;Định</option>
                                                    <option value="403">Nghệ&nbsp;An</option>
                                                    <option value="117">Ninh&nbsp;Bình</option>
                                                    <option value="705">Ninh&nbsp;Thuận</option>
                                                    <option value="217">Phú&nbsp;Thọ</option>
                                                    <option value="509">Phú&nbsp;Yên</option>
                                                    <option value="407">Quảng&nbsp;Bình</option>
                                                    <option value="503">Quảng&nbsp;Nam</option>
                                                    <option value="505">Quảng&nbsp;Ngãi</option>
                                                    <option value="225">Quảng&nbsp;Ninh</option>
                                                    <option value="409">Quảng&nbsp;Trị</option>
                                                    <option value="819">Sóc&nbsp;Trăng</option>
                                                    <option value="303">Sơn&nbsp;La</option>
                                                    <option value="709">Tây&nbsp;Ninh</option>
                                                    <option value="115">Thái&nbsp;Bình</option>
                                                    <option value="215">Thái&nbsp;Nguyên</option>
                                                    <option value="401">Thanh&nbsp;Hoá</option>
                                                    <option value="411">Thừa&nbsp;Thiên&nbsp;-&nbsp;Huế</option>
                                                    <option value="807">Tiền&nbsp;Giang</option>
                                                    <option value="211">Tuyên&nbsp;Quang</option>
                                                    <option value="817">Trà&nbsp;Vinh</option>
                                                    <option value="809">Vĩnh&nbsp;Long</option>
                                                    <option value="219">Vĩnh&nbsp;Phúc</option>
                                                    <option value="213">Yên&nbsp;Bái</option>
                                                </select>
`
    },
    headerSection: (data) => {
        return data.map(item => `
                 <div class="col-md-6 col-lg-4">
                    <div class="single-service-style2 wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1500ms"
                        style="visibility: visible; animation-duration: 1500ms; animation-delay: 300ms;">
                        <div class="img-box"><img alt="service" loading="lazy" width="auto" height="120"
                                decoding="async" data-nimg="1" class="h-h-100"
                                src="/static/images/interface/${item.thumbnail}" style="color: transparent;"></div>
                        <div class="boxer">
                            <div class="single-service-content">
                                <h3>${item.name}</h3>
                                <p>${item.description}.</p>
                            </div>
                        </div>
                        <div class="downPage">
                            <a href='#section-solution-${item.id}'><i class="fa-solid fa-angles-down"></i></a>
                        </div>
                    </div>
                </div>
            `).join('')
    },
    mainSection: (data) => {
        return data.map(item => `
              <section id="section-solution-${item.id}" class="solution">
        <div class="container">
            <div class="solution-banner">
                <img src="/static/images/interface/${item.banner}"
                    alt="">
            </div>
            <div class="product row mt-5">
                <div class="col-lg-6 mb-5">
                  <div class="slider-product">
                        <div class=" slider fade1">
                            ${item.images.map(item => `
                                 
                              <div style="height: 350px;">
                                <img src="/static/images/solutions/${item}" alt="Ảnh SP">
                            </div>
                             `
        ).join('')}
                   
                        </div>
                        <div class="slider slider-nav">
                            ${item.images.map(item => `
                                  <div> 
                            <img class="d-block"
                            src="/static/images/solutions/${item}"
                            alt="Ảnh SP">
                            </div>
                             `).join('')}
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home"
                                aria-selected="true"> <i class="fa-solid fa-code"></i> TÍNH NĂNG  </button>
                            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile"
                                aria-selected="false"> <i class="fa-sharp fa-solid fa-gears"></i> THÔNG SỐ KỸ THUẬT</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home" role="tabpanel"
                            aria-labelledby="nav-home-tab" tabindex="0">
                                    <div class="content">
                                        ${item.content}
                                    </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"
                            tabindex="0">
                            <div class="solution-des">
                                    <div class="content">
                                       ${item.technum} 
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                                        <div class="support-btn">
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#form-support">
                                ĐĂNG KÝ TƯ VẤN
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="form-support" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">a
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Đăng ký nhận tư vấn</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="modal-item"> <input class="form-control" type="text"
                                                    placeholder="Nhập họ tên" name="fullname">
                                            </div>
                                            <div class="modal-item"> <input class="form-control" type="text"
                                                    placeholder="Nhập số điện thoại  " name="phone">
                                            </div>
                                            <div class="modal-item">
                                                    ${Components.province()}
                                            </div>
                                            <div class="modal-item"><textarea class="form-control" type="text"
                                                    placeholder="Nhập lời nhắn" name="message"
                                                    data-gtm-form-interact-field-id="3"></textarea></div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary">Gửi</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
    </section>
       `).join('')
    }
}
const renderHeaderSection = () => {

    headerSectionSolutions.innerHTML = Components.headerSection(Datasolutions)

}

const renderMainSection = () => {
    const mainSectionSolutions = document.querySelector('.main-section-solutions')
    mainSectionSolutions.innerHTML = Components.mainSection(Datasolutions)
    $(document).ready(function () {
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
                    focusOnSelect: true,
                    vertical: true
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
                    focusOnSelect: true,

                });
            }
        }

        // Gọi hàm kiểm tra kích thước màn hình khi tải trang
        checkScreenSize();

        // Bắt sự kiện thay đổi kích thước cửa sổ
        window.addEventListener('resize', checkScreenSize);
    })
}
renderHeaderSection()
renderMainSection()
