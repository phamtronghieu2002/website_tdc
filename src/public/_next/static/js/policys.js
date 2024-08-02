const policysItem = document.querySelectorAll('.policys-item');
const policysContent = document.querySelector('.policys-content');
const policysItemMobile = document.getElementById('policys-item-mobile');
var url_string = window.location.href;
var url = new URL(url_string);

var c = url.search

const fE = document.getElementById(c);

const policysFirst = dataP.find((policys) => policys.name === c);

if (policysFirst && fE) {
    policysContent.innerHTML = policysFirst.content;
    fE.classList.add('active');
}

policysItem.forEach((item) => {
    item.onclick = function(e) {
        console.log("item", item);
        const itemId = this.getAttribute('id');
        console.log("itemId", itemId);
        const target = dataP.find((data) => data.name === itemId);

        const field =  `content_${lang == "vi" ? "" : "en"}`;

    policysContent.innerHTML = target[field];

        policysItem.forEach((item) => {
            item.classList.remove('active');
        });
        item.classList.add('active');
    };
});
policysItemMobile.addEventListener('change', (e) => {

    const itemId = e.target.value;
    console.log("itemId", itemId);
    const target = dataP.find((data) => data.name === itemId);
    console.log("target", target);
    
    const field =  `content_${lang == "vi" ? "" : "en"}`;

    policysContent.innerHTML = target[field];
});
