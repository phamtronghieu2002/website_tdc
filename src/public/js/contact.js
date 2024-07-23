const map = L.map('contact-map').setView([cI.address[0].lat, cI.address[0].lng], 10);
const tiles = L.tileLayer('https://mt2.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var marker = L.marker([cI.address[0].lat, cI.address[0].lng]).addTo(map);
const popupContent = `

<h4>${cI.information[0].name}</h4> 
<p><i class="bi bi-geo-alt-fill"></i> ${cI.address[0].location}</p>
<p><i class="bi bi-telephone-fill"></i> ${cI.phones[0].phone}</p>
<p><i class="bi bi-envelope-fill"></i> ${cI.emails[0].email}</p>
`;
marker.bindPopup(popupContent).openPopup();

const submitBtn = $_('.submit-btn');
if (submitBtn) {
    submitBtn.onclick = (e) => {
        e.preventDefault();
        const contactForm = $_('.contact-form');
        const inputE = contactForm.querySelectorAll('input, textarea');
        const body = {};
        let isValid = true;
        inputE.forEach((input) => {
            const keyName = input.name;
            const value = input.value;
            if (!value) {
                input.classList.add('invalid');
                isValid = false;
                return;
            }
            if (keyName === 'email') {
                if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    input.classList.add('invalid');
                    isValid = false;
                }
                return;
            }
            if (keyName === 'phone_number') {
                if (!value || value.length < 9 || value.length > 11) {
                    input.classList.add('invalid');
                    isValid = false;
                    return;
                }
            }

            body[keyName] = value;
        });
        if (isValid == true) {
            console.log(body);
            axios.post('https://taixecongnghe.com/order/contact', body).then((data) => {});
        }
    };
}
