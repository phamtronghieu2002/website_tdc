

// carousel certificert
try {
    var swiper = new Swiper('.mySwiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 80,
        slidesPerGroup: 1,
        zoom: true,
        autoplay: {
            delay: 1500,
            disableOnInteraction: false,
        },
        coverflowEffect: {
            rotate: 45,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
} catch (error) {
    console.log(error);
}


//carousel agent
try {
  var owl = $('.owl-carousel');
  var direction = 'next'; // hướng mặc định là 'next'

  owl.owlCarousel({
    margin: 0,
    nav: false,
    responsiveClass: true,
    dots: false,
    autoplay: false, // Tắt autoplay vì chúng ta sẽ tự điều khiển
    loop: false, // Tắt loop để có thể kiểm tra vị trí
    slideTransition: 'linear',
    autoplayTimeout: 1000, // thời gian chờ giữa các lần chuyển slide
    autoplaySpeed: 20000, // tốc độ chuyển slide
    navText: [
      "<i class='fa fa-chevron-left'></i>",
      "<i class='fa fa-chevron-right'></i>",
    ],
    responsive: {
      0: {
        items: 3,
        nav: true,
      },
      767: {
        items: 5,
        nav: true,
      },
    },
  });

  function autoplayCarousel() {
    setInterval(function() {
      if(direction === 'next') {
        owl.trigger('next.owl.carousel');
      } else {
        owl.trigger('prev.owl.carousel');
      }
    }, 2000); // Thời gian giữa các lần trượt, bạn có thể điều chỉnh
  }

  owl.on('translated.owl.carousel', function(event) {
    var itemCount = event.item.count; // Số lượng item
    var currentIndex = event.item.index; // Index hiện tại

    if(currentIndex === (itemCount - event.page.size)) { // Nếu là slide cuối cùng
      direction = 'prev';
    } else if(currentIndex === 0) { // Nếu là slide đầu tiên
      direction = 'next';
    }
  });

  autoplayCarousel();
} catch (error) {
    console.log("error >>", error); 
}
$('[data-fancybox="gallery"]').fancybox({});

// VIDEO
document.getElementById('play-btn').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('thumb-nail-video').style.display = 'none';
    document.getElementById('video').play();
});
//VIDEO
let video = document.getElementById('video');
let thumbNail = document.getElementById('thumb-nail-video');
let observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                // Khi video không còn hiển thị trong viewport
                video.pause();
                thumbNail.style.display = 'flex';
            }
        });
    },
    {
        threshold: 0,
    },
);

observer.observe(video);
// add animation certificert
//phần tử chẵn
const slide_item_even = $('.swiper-wrapper .swiper-slide:nth-child(2n) a');
const slide_item_odd = $('.swiper-wrapper .swiper-slide:nth-child(2n+1) a');

slide_item_even.attr('data-aos', 'fade-right');
slide_item_odd.attr('data-aos', 'fade-left');
slide_item_even.attr('data-aos-duration', '1000');
slide_item_odd.attr('data-aos-duration', '1000');

// handle introduce-category
const service1 = $('.single-service1');
const service2 = $('.single-service2');
const contentService1 =service1.next('.accordion-body');
const contentService2 =service2.next('.accordion-body');

const secImages = $('.introduce-category .sec-images img');

// contentService1.hide();
contentService2.hide();
service1.click(function () {
    $(this)
    .find('i.fi-br-angle-up, i.fi-br-angle-down')
    .toggleClass('fi-br-angle-up fi-br-angle-down');
    contentService1.slideToggle()
    contentService2.hide()
    secImages.attr("src","/static/_assets/images/categories/camnghidinh.jpg");
    secImages.animate({
        opacity: 1,
      },1000);
   
    
});
service2.click(function () {

    contentService2.slideToggle()
    contentService1.hide()
    secImages.attr("src","/static/_assets/images/categories/camhanhtrinh.jpg");
    $(this)
    .find('i.fi-br-angle-up, i.fi-br-angle-down')
    .toggleClass('fi-br-angle-up fi-br-angle-down');
    secImages.animate({
        opacity: 1,
      },1000);
   
 

});

// handle couter up
try {

  const counterUp = window.counterUp.default

  const callback = entries => {
    entries.forEach( entry => {
      const el = entry.target
      if ( entry.isIntersecting && ! el.classList.contains( 'is-visible' ) ) {
        counterUp( el, {
          duration: 2000,
          delay: 20,
        } )
        el.classList.add( 'is-visible' )
      }
    } )
  }
  
  const IO = new IntersectionObserver( callback, { threshold: 1 } )
  
  document.querySelectorAll('.countfect').forEach(el => {
    IO.observe(el)
})
        
} catch (error) {
    console.log(error);
}

//handle email sections
const formEmail = $('.Subscribe-form')
const btnSubmit = formEmail.find('button[type="submit"]');
const inputEmail = formEmail.find('input[type="email"]');
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const loader  = $('.loader');
function validateEmail(email) {
  return emailPattern.test(email);
}
btnSubmit.click( async() =>{
 
    const email = inputEmail.val();
    if(validateEmail(email)){
     try {
      loader.show();
      await axios.post('/api/email', {email})

      toastr.success('Đăng ký nhận tin thành công !!.', 'Success!')
      inputEmail.val('');
      loader.hide();
     }
      catch (error) {
        console.log(error);
        toastr.error('Đăng ký nhận tin thất bại !!.', 'Inconceivable!')
     }
    }else{
      toastr.error('Email không đúng định dạng !!.', 'Inconceivable!')
    }
});
AOS.init();
