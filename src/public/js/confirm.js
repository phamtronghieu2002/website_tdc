const opaElement = document.createElement('div');
opaElement.style.display = 'none';
opaElement.classList.add('opacity');
opaElement.classList.add('animate__animated');
opaElement.innerHTML = `<div class="opacity-children animate__animated animate__zoomIn">
<div class="opacity-children-title">
<h3></h3>
<span class="close-opacity-btn">
<i class="close"></i>
</span>
</div>
<div class="opacity-children-content"></div>
</div>`;
document.body.insertBefore(opaElement, document.body.firstChild);

const opacity = $_('.opacity');
// console.log(opacity);
const opacityChildren = $_('.opacity-children');
const closeOpacityBtn = $_('.close-opacity-btn');
const opacityChildrenContent = $_('.opacity-children-content');

closeOpacityBtn.onclick = (e) => {
    tools__.displayOpacity('hidden');
};
opacity.onclick = (e) => {
    closeOpacityBtn.click();
};
opacityChildren.onclick = (e) => {
    e.stopPropagation();
};
const tools__ = {
    confirm: function (type, title, callback, callback1) {
        tools__.displayOpacity(type, title, tools__.confirmUI());
        // opacityChildrenContent.innerHTML =
        const confirm = $_('.confirm-ui');
        confirm.children[0].onclick = (e) => {
            if (callback1) {
                callback1();
            }

            closeOpacityBtn.click();
        };
        confirm.children[1].onclick = (e) => {
            opacityChildrenContent.innerHTML = tools__.loader();
            callback();
        };
    },

    displayOpacity: function (type, title = 'Title', children = '', head = 'confirm') {
        if (type === 'show') {
            opacity.classList.add('animate__fadeIn');
            opacity.classList.remove('animate__fadeOut');
            opacity.style.display = 'flex';
            opacity.querySelector('.opacity-children-title').children[0].innerHTML = title;
            opacityChildrenContent.innerHTML = children;
            // console.log(head);
            if (head === 'advertisement') {
                opacityChildren.style.backgroundColor = '#00000000';
                closeOpacityBtn.classList.add('advertisement-close-btn');
                // opacityChildren.style.minWidth = "900px";
                opacityChildren.style.maxWidth = '900px';
                opacityChildren.style.maxHeight = '90%';
            }
        }
        if (type === 'hidden') {
            opacity.classList.remove('animate__fadeIn');
            opacity.classList.add('animate__fadeOut');
            opacityChildren.classList.remove('animate__zoomIn');
            opacityChildren.classList.add('animate__zoomOut');
            closeOpacityBtn.classList.remove('advertisement-close-btn');

            setTimeout(() => {
                opacity.style.display = 'none';
                opacityChildren.classList.add('animate__zoomIn');
                opacityChildren.classList.remove('animate__zoomOut');
                opacityChildrenContent.innerHTML = '';
                opacityChildren.style.backgroundColor = '#ffffff';
                opacityChildren.style.minWidth = '300px';
                opacityChildren.style.maxWidth = '90%';
                opacityChildren.style.maxHeight = 'unset';
                opacityChildren.style.minHeight = 'unset';
                opacityChildren.style.height = 'unset';
                // opacity.classList.add("animate__fadeIn");
                // opacity.classList.remove("animate__fadeOut");
            }, 100);
        }
    },
    loader: function () {
        return `
        <div class="loader-element">
        <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
     width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
  <path fill="#000" d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z">
    <animateTransform attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 25 25"
      to="360 25 25"
      dur="0.6s"
      repeatCount="indefinite"/>
    </path>
  </svg>
        </div>
        `;
    },
    confirmUI: function (note = '', confirmText = 'Đồng ý') {
        return `
            <div class='confirm-note'>${note}</div>
            <div class = 'confirm-ui'>
                <button>Huỷ</button>
                <button>${confirmText}</button>
            </div>
        `;
    },
};
// document.getElementById('btn').onclick = (e) => {
//     tools__.confirm('show', 'Title', () => {
//         console.log('ok');
//         tools__.displayOpacity('hidden');
//     });
// };
