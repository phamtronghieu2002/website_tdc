const policysItem = document.querySelectorAll('.policys-item');
const policysContent = document.querySelector('.policys-content');

var url_string = window.location.href;
var url = new URL(url_string);
var c = url.searchParams.get('id');

const fE = document.getElementById(c);
const policysFirst = dataP.find((policys) => policys.name === c);



policysItem.forEach((item) => {
    item.onclick = (e) => {
        const itemId = item?.id;
        const target = dataP.find((data) => data.name === itemId);
    
        policysContent.innerHTML = target.content;

        policysItem.forEach((item) => {
            item.classList.remove('active');
        });
        item.classList.add('active');
    };
});

if (policysFirst && fE) {
    policysContent.innerHTML = policysFirst.content;
    fE.click();
}