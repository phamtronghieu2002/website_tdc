
// variables
const headerSectionSolutions = document.querySelector('.header-section-solutions')
const Components = {
    province: () => {
        return `
 <select class="form-select select-province" name="province_id" data-gtm-form-interact-field-id="2">
    <option value="0" disabled="">Khu vực</option>
    <option value="101" selected>Hà Nội</option>
    <option value="701">TP Hồ Chí Minh</option>
    <option value="501">Đà Nẵng</option>
    <option value="805">An Giang</option>
    <option value="717">Bà Rịa - Vũng Tàu</option>
    <option value="207">Bắc Cạn</option>
    <option value="221">Bắc Giang</option>
    <option value="821">Bạc Liêu</option>
    <option value="223">Bắc Ninh</option>
    <option value="811">Bến Tre</option>
    <option value="507">Bình Định</option>
    <option value="711">Bình Dương</option>
    <option value="707">Bình Phước</option>
    <option value="715">Bình Thuận</option>
    <option value="823">Cà Mau</option>
    <option value="815">Cần Thơ</option>
    <option value="203">Cao Bằng</option>
    <option value="605">Đắc Lắc</option>
    <option value="606">Đắk Nông</option>
    <option value="301">Điện Biên</option>
    <option value="713">Đồng Nai</option>
    <option value="803">Đồng Tháp</option>
    <option value="603">Gia Lai</option>
    <option value="201">Hà Giang</option>
    <option value="111">Hà Nam</option>
    <option value="405">Hà Tĩnh</option>
    <option value="107">Hải Dương</option>
    <option value="103">Hải Phòng</option>
    <option value="816">Hậu Giang</option>
    <option value="305">Hòa Bình</option>
    <option value="109">Hưng Yên</option>
    <option value="511">Khánh Hòa</option>
    <option value="813">Kiên Giang</option>
    <option value="601">Kon Tum</option>
    <option value="302">Lai Châu</option>
    <option value="703">Lâm Đồng</option>
    <option value="209">Lạng Sơn</option>
    <option value="205">Lào Cai</option>
    <option value="801">Long An</option>
    <option value="113">Nam Định</option>
    <option value="403">Nghệ An</option>
    <option value="117">Ninh Bình</option>
    <option value="705">Ninh Thuận</option>
    <option value="217">Phú Thọ</option>
    <option value="509">Phú Yên</option>
    <option value="407">Quảng Bình</option>
    <option value="503">Quảng Nam</option>
    <option value="505">Quảng Ngãi</option>
    <option value="225">Quảng Ninh</option>
    <option value="409">Quảng Trị</option>
    <option value="819">Sóc Trăng</option>
    <option value="303">Sơn La</option>
    <option value="709">Tây Ninh</option>
    <option value="115">Thái Bình</option>
    <option value="215">Thái Nguyên</option>
    <option value="401">Thanh Hoá</option>
    <option value="411">Thừa Thiên Huế</option>
    <option value="807">Tiền Giang</option>
    <option value="211">Tuyên Quang</option>
    <option value="817">Trà Vinh</option>
    <option value="809">Vĩnh Long</option>
    <option value="219">Vĩnh Phúc</option>
    <option value="213">Yên Bái</option>
</select>
`
    },
    headerSection: (data) => {
     
        let descField;
        let nameField;
        if(lang === 'vi'){
            descField    =`description`
            nameField    =`name`
        }else{

         descField =`description_${lang}`
         nameField =`name_${lang}`
        }

        return data.map(item => `
                 <div class="col-md-6 col-lg-4">
                    <div class="single-service-style2 wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1500ms"
                        style="visibility: visible; animation-duration: 1500ms; animation-delay: 300ms;">
                        <div class="img-box">
                        <img alt="service" loading="lazy" width="auto" height="120"
                                decoding="async" data-nimg="1" class="h-h-100"
                                src="/static/images/interface/${item.thumbnail}" style="color: transparent;"></div>
                        <div class="boxer">
                            <div class="single-service-content">
                                <h3>${item[nameField]}</h3>
                                <p>${item[descField]}.</p>
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
                let contentField;
                let technumField;
                if(lang === 'vi'){
                    contentField    =`content`
                    technumField    =`technum`
                }else{
                    contentField    =`content_${lang}`
                    technumField    =`technum_${lang}`
                }
        return data.map(item => `
              <section id="section-solution-${item.id}" class="solution">
        <div class="container">
            <div class="solution-banner">
                <img src="/static/images/interface/${item.banner}"
                    alt="">
            </div>
            <div class="product row mt-5 mb-5">
                <div class="col-lg-6 mb-2">
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
                            <img class="d-block sub_thumb"
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
                                data-bs-target="#nav-home-${item.id}" type="button" role="tab" aria-controls="nav-home-${item.id}"
                                aria-selected="true" data-lang="solutions_tinhnang"> <i class="fa-solid fa-code"></i> TÍNH NĂNG  </button>
                            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-profile-${item.id}" type="button" role="tab" aria-controls="nav-profile-${item.id}"
                                aria-selected="false" data-lang="solutions_thongso"> <i class="fa-sharp fa-solid fa-gears"></i> THÔNG SỐ KỸ THUẬT</button>
                        </div>
                    </nav>
                    <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-home-${item.id}" role="tabpanel"
                            aria-labelledby="nav-home-tab" tabindex="0">
                                    <div class="content">
                                        ${item[contentField]}
                                    </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="nav-profile-${item.id}" role="tabpanel" aria-labelledby="nav-profile-tab"
                            tabindex="0">
                            <div class="solution-des">
                                    <div class="content">
                                       ${item[technumField]} 
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                                        <div class="support-btn">
                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                                data-bs-target="#form-support" data-lang="solutions_dangky">
                                ĐĂNG KÝ TƯ VẤN
                            </button>
                            <!-- Modal -->
                            <div class="modal fade" id="form-support" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel" data-lang="solutions_tuvan">Đăng ký nhận tư vấn</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="modal-item">
                                                 <input class="form-control fullname" type="text" placeholder="Nhập họ tên" name="fullname">
                                            </div>
                                            <div class="modal-item"> 
                                                <input class="form-control phonenumber" type="text"
                                                    placeholder="Nhập số điện thoại  " name="phonenumber">
                                            </div>
                                              <div class="modal-item"> 
                                                <input
                                                hidden
                                                value="${item.name}"
                                                class="form-control  care" type="text"
                                                 >
                                            </div>
                                            <div class="modal-item">
                                                ${Components.province()}
                                            </div>
                                            <div class="modal-item"><textarea class="form-control message" type="text"
                                                    placeholder="Nhập lời nhắn" name="message"
                                                    data-gtm-form-interact-field-id="3"></textarea></div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary btn_register_solution" data-lang="solutions_gui">Gửi</button>
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

let currentLocation ="";

function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
}

async function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  try {
    const res = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=vi`);
    console.log(res.data.city);
    currentLocation = res.data.city;
    return currentLocation;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function updateLocation() {
  try {
    const position = await getLocation();
    await showPosition(position);
    console.log("currentLocation inside updateLocation >>", currentLocation);
  } catch (error) {
    console.error(error.message);
  }
}

// Gọi hàm updateLocation và chờ nó hoàn thành
updateLocation().then(() => {


    $('#form-support').one('shown.bs.modal', function () {
        if(currentLocation){
            $('.select-province').css("display", "none");
        }
        const btn_save_register = $('.btn_register_solution')
        btn_save_register.click(async () => {
            const username = $('.fullname').val()
            const phonenumber = $('.phonenumber').val()
            const message = $('.message').val()
            const care = $('.care').val()
            let province = $('.select-province option:selected').text()
            console.log("province >>", province);
            
            if(currentLocation){
                province = currentLocation;
            }
            if (!username || !phonenumber  || !province) {
                toastr.error('Vui lòng điển đủ thông tin !!.', 'fail!')
                return
            } else {
                try {
                    
    
                    const res = await axios.post("/api/registerSolution", {
                        username,
                        phonenumber,
                        message,
                        province,
                        care
                        
                    }
                    )
                    console.log(res.data);
                    if(res.data.status===1){
                        toastr.success('Nhận tư vấn thành công !!.', 'thành công!')
    
                    }
    
                } catch (error) {
                    toastr.error('Gửi lỗi vui lòng thử lại !!.', 'fail!')
                    console.log(error);
                }
            }
    
    
        })
    
    });
    
    
});



