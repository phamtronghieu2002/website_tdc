var nf = Intl.NumberFormat();
const tools = {
    postData: function (API, body) {
        // const auth_token = localStorage.getItem('admin_token');
        return axios.request({
            method: 'POST',
            url: API,
            headers: {
                // 'Content-Type': 'multipart/form-data',
                // authorization: 'Bearer ' + auth_token,
            },
            data: body,
        });
    },
    handleAppEvent: {
        addCart: function (data) {
            const productAddBtns = $$_('.add-to-cart');

            productAddBtns.forEach((addBtn) => {
                addBtn.onclick = (e) => {
                    const prID = addBtn.getAttribute('data-product');
                    const productTaget = data.products.find((product) => product.id == prID);
                    tools.addToCart(productTaget);
                };
            });
        },
        removeCart: function (data) {
            const productRemoveBtn = $$_('.remove-to-cart');

            productRemoveBtn.forEach((removeBtn) => {
                removeBtn.onclick = (e) => {
                    e.stopPropagation();
                    const prID = removeBtn.getAttribute('data-product');
                    let cart = JSON.parse(localStorage.getItem('cart'));
                    const productTaget = cart.find((product) => product.id == prID);
                    tools.removeToCart(productTaget);
                };
            });

            const productRemoveJOBtn = $$_('.remove-to-cart-j-o');
            if (productRemoveJOBtn.length) {
                productRemoveJOBtn.forEach((btn) => {
                    btn.onclick = (e) => {
                        const prID = btn.getAttribute('data-product');
                        const productTaget = data.products.find((product) => product.id == prID);
                        tools.removeJOToCart(productTaget);
                    };
                });
            }
        },
    },
    renderOrderViewSuccess: function () {
        $_('.order-wrapper').innerHTML = `
            <div class='no-cart-review'>
                <span>ĐẶT HÀNG THÀNH CÔNG</span>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
<circle style="fill:#25AE88;" cx="25" cy="25" r="25"/>
<polyline style="fill:none;stroke:#FFFFFF;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;" points="
	38,15 22,33 12,25 "/>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>

                <a href='/san-pham'>
                    <div class='back-to-product-page'>QUAY TRỞ LẠI TRANG SẢN PHẨM</div>
                </a>
            
            <div>
            `;
    },
    renderOrderView: function () {
        let cart = JSON.parse(localStorage.getItem('cart'));
        const orderView = $_('.main-order-infor');
        if (!orderView) {
            return;
        }
        if (!cart || !cart.length) {
            $_('.order-wrapper').innerHTML = `
            <div class='no-cart-review'>
                <span>Chưa có sản phẩm nào trong giỏ hàng !<span>
                <a href='/san-pham'>
                    <div class='back-to-product-page'>QUAY TRỞ LẠI TRANG SẢN PHẨM</div>
                </a>
            
            <div>
            `;
        }

        orderView.innerHTML = `
        <div class='table-cart-infor-total-wrapper'>
        <table class='table-cart-infor-total'>
            <thead>
                <tr>
                    <th>Sản phẩm</th>  
                    <th>Tạm tính</th>  
                </tr>
            </thead>
            <tbody>
                ${cart
                    .map((pr) => {
                        return `
                    <tr>
                        <td>${pr.title} <b>x ${pr.amount}</b></td>
                        <td>${nf.format(Number(pr.amount) * Number(pr.price - (pr.price * pr.discount) / 100))} ₫</td>
                    </tr>
                    `;
                    })
                    .join('')}
                <tr class='hr-order'>
                    <td colspan="2"><div></div></td>
                </tr>
                <tr>
                    <td>Tạm tính: </td>
                    <td>${nf.format(
                        cart.reduce((total, pr) => {
                            return total + Number(pr.amount) * Number(pr.price - (pr.price * pr.discount) / 100);
                        }, 0),
                    )} ₫</td>
                </tr>

                <tr>
                    <td>Giao hàng: </td>
                    <td>Toàn quốc</td>
                </tr>

                <tr>
                    <td>Tổng: </td>
                    <td>${nf.format(
                        cart.reduce((total, pr) => {
                            return total + Number(pr.amount) * Number(pr.price - (pr.price * pr.discount) / 100);
                        }, 0),
                    )} ₫</td>
                </tr>
            </tbody>
        </table>

            <div class='payment-button'>
                ĐẶT HÀNG      
            </div>
       
        </div>
        `;
    },
    renderCarView: function () {
        // console.log('rerender view');
        let cart = JSON.parse(localStorage.getItem('cart'));
        const cartView = $_('.cart-infor');
        const paymentInfor = $_('.payment-infor');
        if (!cartView || !paymentInfor) {
            return;
        }
        cartView.innerHTML = '';
        paymentInfor.innerHTML = '';
        if (cart && cart.length) {
            numOfCart.forEach((cart_) => {
                cart_.children[0].innerText = cart.length;
            });
            cartView.innerHTML = `

            <table class='table-cart-infor'>
                <thead>
                    <tr>
                        <th  class='hidden-mobile' style='padding-left: 5px;'>Hình ảnh Sản phẩm</th>
                        <th style='padding-left: 5px;'>Tên sản phẩm</th>
                        <th class='hidden-mobile'>Đơn giá</th>
                        <th>Số lượng</th>
                        <th class='hidden-mobile'>Thành tiền</th>
                        <th class='hidden-mobile'>Xoá</th>
                    </tr>
                </thead>
                <tbody>
                ${cart
                    .map((pr) => {
                        return `
                    <tr>
                        <td class='hidden-mobile'>
                            <div class='product-infor'>
                               
                                
                                <div class='product-image'>
                                    <img alt='product-image' src='${pr.thumbnail}' />
                                </div>
                                
                            </div>                     
                        </td>
                        <td>
                        <div class='product-infor'> 
                        
                        <a href='/san-pham/${pr.slug}'>
                        <div class='infor-mobile '>
                        <div class='product-image pc-hidden'>
                        <img alt='product-image' src='${pr.thumbnail}' />
                    </div>
                    <p class='product-name'>
                                        ${pr.title}
                                    </p>
                        </div>
                                    
                                    <p class='product-code'>
                                        Mã sản phẩm: ${pr.product_code}
                                    </p>
                                    <div class='price-mobile pc-hidden'>Đơn giá: 
                                    ${nf.format(Number(pr.price - pr.price * (Number(pr.discount) / 100)))} ₫</div>
                                   
                                </a>
                        </div>
                        </td>
                        <td class='hidden-mobile'>
                            ${
                                Number(pr.discount)
                                    ? `<p class='discount-price'>${nf.format(Number(pr.price))} ₫</p>`
                                    : ''
                            }
                            <p>${nf.format(Number(pr.price - pr.price * (Number(pr.discount) / 100)))} ₫</p>
                        </td>
                        <td>
                            <div class='product-amount-wrapper'>
                                <button class='edit-amount-btn remove-to-cart-j-o' data-product='${pr.id}'>-</button>
                                <input disabled type='number' class='product-amount' value='${pr.amount}' />
                                <button class='edit-amount-btn add-to-cart' data-product='${pr.id}'>+</button>
                            </div>
                            <div class='pc-hidden remove-to-cart' data-product='${pr.id}'>
                            Xoá
                            </div>
                        </td>
                        <td class='temporary-price hidden-mobile'>${nf.format(
                            Number(pr.amount) * Number(pr.price - pr.price * (Number(pr.discount) / 100)),
                        )} ₫</td>
                        <td class='hidden-mobile'>
                        <div class='remove-to-cart-wrapper'>
                            <div class='remove-to-cart' data-product='${pr.id}'>
                            <i class="fas fa-trash"></i>
                            </div>
                            
                    </div>
                        </td>
                        </tr>
                        
                        `;
                    })
                    .join('')}
                </tbody>
            </table>

            `;

            paymentInfor.innerHTML = `
            <div class='table-cart-infor-total-wrapper'>
          

            <div>Tổng tiền thanh toán: <b>${nf.format(
                cart.reduce((total, pr) => {
                    return total + Number(pr.amount) * Number(pr.price - (pr.price * pr.discount) / 100);
                }, 0),
            )} ₫</b></div>

            <a href='/thanh-toan'>
                <div class='payment-button'>
                    Tiến hành thanh toán
                </div>
            </a>
            </div>
            `;
        } else {
            numOfCart.forEach((cart) => {
                cart.children[0].innerText = 0;
            });
            const cartWrapper = $_('.cart-wrapper');
            cartWrapper.innerHTML = `
            <div class='no-cart-review'>
                <span>Chưa có sản phẩm nào trong giỏ hàng !<span>
                <a href='/san-pham'>
                    <div class='back-to-product-page'>QUAY TRỞ LẠI TRANG SẢN PHẨM</div>
                </a>
            
            <div>
            `;
        }
        // let data = JSON.parse(localStorage.getItem('cart'));
        tools.handleAppEvent.removeCart(appData.mainData);
        tools.handleAppEvent.addCart(appData.mainData);
    },
    renderCartPreview: function () {
        let cart = JSON.parse(localStorage.getItem('cart'));

        cartPreview.innerHTML = '';
        if (cart && cart.length) {
            numOfCart.forEach((cart_) => {
                cart_.children[0].innerText = cart.length;
            });
            // console.log('ok');
            cartPreview.innerHTML = `

                <div class='cart-product-list'>
                ${cart
                    .map((pr) => {
                        return `
                    <div class='cart-product-group'>
                        <div class='cart-product-image'>
                            <img alt='product-item-cart-img' src= ${pr.thumbnail}>
                        </div>
                        <div class='pr-name-preview'><p>${pr.title}</p></div>
                        <div><span>SL: ${pr.amount}</span></div>
                        <div><span>${nf.format(
                            Number(pr.amount) * Number(pr.price - pr.price * (Number(pr.discount) / 100)),
                        )} ₫</span></div>

                        <div class='remove-to-cart' data-product='${pr.id}'>Xoá</div>
                    </div>
                    `;
                    })
                    .join('')}
                    
                </div>
                <div class='cart-action'>
                    <div>Tổng cộng: <b>${nf.format(
                        cart.reduce((total, pr) => {
                            return total + Number(pr.amount) * Number(pr.price - (pr.price * pr.discount) / 100);
                        }, 0),
                    )} ₫</b></div>
                    <a  class="cart-action-item" href="/gio-hang">
                        <div>XEM GIỎ HÀNG</div>
                    </a>
                    
                    <a  class="cart-action-item" href="/thanh-toan">
                        <div>THANH TOÁN</div>
                    </a>
                </div>
            `;
        } else {
            numOfCart.forEach((cart) => {
                cart.children[0].innerText = 0;
            });
            cartPreview.innerHTML = `<div class='no-cart'><span>Chưa có sản phẩm nào trong giỏ hàng !<span><div>`;
        }
        tools.handleAppEvent.removeCart(appData.mainData);
    },
    addToCart: function (product) {
        if (!product) {
            return;
        }
        let cart = JSON.parse(localStorage.getItem('cart'));
        product.description = '';
        product.description_all = '';
        product.amount = 1;
        if (!cart) {
            cart = [{ ...product }];
        } else {
            const isExist = cart.find((pr) => pr.id == product.id);
            if (!isExist) {
                cart.push(product);
            } else {
                cart.forEach((pr) => {
                    if (pr.id == product.id) {
                        pr.amount = Number(pr.amount) + 1;
                    }
                });
            }
            const isCartPage = $_('.cart-infor');
            if (!isCartPage) {
                const showContent = `
                
                <a href='/gio-hang'><div class='toast__cart-btn'>XEM GIỎ HÀNG <i class="fas fa-long-arrow-alt-right"></i></div><a>
            `;
                showToast('Đã thêm một sản phẩm vào giỏ', 'success', showContent, toastDuration);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        tools.renderCarView();
        tools.renderCartPreview();
    },
    removeToCart: function (product) {
        if (!product) {
            return;
        }
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            return;
        } else {
            let prIndex;
            cart.forEach((pr, index) => {
                if (pr.id == product.id) {
                    prIndex = index;
                }
            });

            if (prIndex == undefined) {
                return;
            } else {
                cart.splice(prIndex, 1);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        tools.renderCartPreview();
        tools.renderCarView();
    },

    removeJOToCart: function (product) {
        if (!product) {
            return;
        }
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) {
            return;
        } else {
            let prIndex;
            cart.forEach((pr, index) => {
                if (pr.id == product.id) {
                    prIndex = index;
                }
            });

            if (prIndex == undefined) {
                return;
            } else {
                if (Number(cart[prIndex].amount) == 1) {
                    return;
                }
                cart[prIndex].amount = Number(cart[prIndex].amount) - 1;
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        tools.renderCartPreview();
        tools.renderCarView();
    },
    display: function (element, type, animateAdd, amimateRemove) {
        if (type !== 'none') {
            element.style.display = type;
            element.classList.add('animate__animated');
            element.classList.add(animateAdd);
            element.classList.remove(amimateRemove);
            return;
        } else {
            setTimeout(() => {
                element.style.display = 'none';
            }, 300);
            element.classList.add('animate__animated');
            element.classList.add(animateAdd);
            element.classList.remove(amimateRemove);
            return;
        }
    },
    imageZoom: function (imgID, resultID) {
        let img, lens, result, cx, cy;
        img = imgID;
        result = document.getElementById(resultID);
        /*create lens:*/
        lens = document.createElement('DIV');
        lens.setAttribute('class', 'img-zoom-lens');
        /*insert lens:*/
        img.parentElement.insertBefore(lens, img);
        /*calculate the ratio between result DIV and lens:*/

        /*set background properties for the result DIV:*/
        /*execute a function when someone moves the cursor over the image, or the lens:*/
        lens.addEventListener('mousemove', moveLens);
        img.addEventListener('mousemove', moveLens);
        /*and also for touch screens:*/
        lens.addEventListener('touchmove', moveLens);
        img.addEventListener('touchmove', moveLens);

        // img.addEventListener("mouseleave", leaveLens);
        lens.addEventListener('mouseleave', leaveLens);
        function fadeInAnimate(element, displayStyle = 'block') {
            element.style.display = displayStyle;

            element.classList.remove('animate__fadeOut');
            element.classList.add('animate__animated');
            element.classList.add('animate__fadeIn');
        }
        function fadeOutAnimate(element) {
            element.classList.remove('animate__fadeIn');
            element.classList.add('animate__fadeOut');
            element.style.display = 'none';

            // setTimeout(() => {
            // }, 100);
        }
        function leaveLens() {
            // result.style.display = "none";
            // console.log("leave - out");
            fadeOutAnimate(result);
            lens.style.display = 'none';
        }
        function moveLens(e) {
            let screenWidth = screen.width;
            if (screenWidth <= 412) {
                return;
            }

            lens.style.display = 'block';
            // result.style.display = "block";
            fadeInAnimate(result);
            let pos, x, y;
            cx = result.offsetWidth / lens.offsetWidth;
            cy = result.offsetHeight / lens.offsetHeight;
            result.style.backgroundImage = "url('" + img.src + "')";

            result.style.backgroundSize = img.width * cx + 'px ' + img.height * cy + 'px';

            /*prevent any other actions that may occur when moving over the image:*/
            e.preventDefault();
            /*get the cursor's x and y positions:*/
            pos = getCursorPos(e);
            /*calculate the position of the lens:*/
            x = pos.x - lens.offsetWidth / 2;
            y = pos.y - lens.offsetHeight / 2;
            // console.log(x + "   :   " + y);
            /*prevent the lens from being positioned outside the image:*/
            // console.log(img.width);
            if (x > img.width - lens.offsetWidth) {
                x = img.width - lens.offsetWidth;
            }
            if (x < 0) {
                x = 0;
            }
            if (y > img.height - lens.offsetHeight) {
                y = img.height - lens.offsetHeight;
            }
            if (y < 0) {
                y = 0;
            }
            /*set the position of the lens:*/
            lens.style.left = x + 'px';
            lens.style.top = y + 'px';
            /*display what the lens "sees":*/
            // console.log(x);
            // console.log("-" + x * cx + "px -" + y * cy + "px");
            // result.style.backgroundColor = `#${Math.floor(Math.random() * 1000)}`;
            result.style.backgroundPosition = '-' + x * cx + 'px -' + y * cy + 'px';
        }
        function getCursorPos(e) {
            var a,
                x = 0,
                y = 0;
            e = e || window.event;
            /*get the x and y positions of the image:*/
            a = img.getBoundingClientRect();
            /*calculate the cursor's x and y coordinates, relative to the image:*/
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return { x: x, y: y };
        }
    },
};
