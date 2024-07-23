const confirmBtn = document.querySelector('.confirm-btn');
const inputForm = document.querySelectorAll('.form-control');
const thankLetterWrapper = document.querySelector('.thank-letter-wrapper');
const loader = document.querySelector('.loader');
const confirmOption = document.querySelector('.confirm-option');
const optionWrapper = document.querySelector('.option-wrapper');
const ftcoSection = document.querySelector('.ftco-section');

confirmBtn.onclick = (e) => {
    let isValid = true;
    const body = {};
    inputForm.forEach((input) => {
        const value = input?.value;
        const key = input?.name;

        if (!value) {
            isValid = false;
            input.classList.add('invalid');
            input.onfocus = (e) => {
                input.classList.remove('invalid');
            };
        } else {
            body[key] = value;
        }
    });

    if (isValid) {
        loader.style.display = 'flex';
        axios
            .post('https://taixecongnghe.com/order/event', body)
            .then((fb) => {
                loader.style.display = 'none';
                if (fb?.data?.status == 1) {
                    thankLetterWrapper.style.display = 'flex';
                }
            })
            .catch((error) => {
                loader.style.display = 'none';
            });
    }
};

confirmOption.onclick = (e) => {
    optionWrapper.style.display = 'none';
    ftcoSection.style.display = 'block';
};

const map = L.map('contact-map').setView([10.863779, 106.739802], 13);
const tiles = L.tileLayer('https://mt2.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var marker = L.marker([10.863779, 106.739802]).addTo(map);
const popupContent = `

<p><b>Tech Driver Crop</b></p> 
<p><i class="bi bi-geo-alt-fill"></i> 49 đường số 3 KDC Thăng Long Home, 563 Tô Ngọc Vân, Phường Tam Phú, Tp. Thủ Đức, Tp. Hồ Chí Minh</p>
<p><i class="bi bi-telephone-fill"></i> 0899.662.662</p>
<p><i class="bi bi-envelope-fill"></i> sale.tdcorp@gmail.com</p>
`;
marker.bindPopup(popupContent).openPopup();
