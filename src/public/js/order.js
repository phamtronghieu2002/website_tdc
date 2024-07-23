tools.renderOrderView();

const DOMAIN = window.location.protocol + '//' + window.location.hostname;
const NODE_SERVER = DOMAIN + '';
const ORDER_API = NODE_SERVER + '/order/add';

const paymentButton = $_('.payment-button');
if (paymentButton) {
    paymentButton.onclick = (e) => {
        const orderForm = $_('.order-form');
        let inputInfor;
        let isValid = true;
        if (orderForm) {
            inputInfor = orderForm.querySelectorAll('.required-infor');
        }
        inputInfor.forEach((input) => {
            const value = input.value;
            const name = input.name;
            if (name === 'note') {
                return;
            }
            if (name === 'phone_number') {
                if (value.length != 10) {
                    input.classList.add('invalid');
                    isValid = false;
                }
                return;
            }
            if (name === 'email') {
                if (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    input.classList.add('invalid');
                    isValid = false;
                }
                return;
            }

            if (value.length < 5) {
                input.classList.add('invalid');
                isValid = false;
            }
        });

        if (!isValid) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        tools__.confirm('show', 'Xác nhận đặt hàng', () => {
            const body = {};
            inputInfor.forEach((input) => {
                const value = input.value;
                const name = input.name;
                body[name] = value;
            });

            let cart = JSON.parse(localStorage.getItem('cart'));
            const products = cart
                .map((pr) => {
                    return `${pr.id}$${pr.amount}`;
                })
                .join('*');
            body.products = products;
            body.total_money = cart.reduce((total, pr) => {
                return total + Number(pr.amount) * Number(pr.price - (pr.price * pr.discount) / 100);
            }, 0);

            // console.log(body);
            tools.postData(ORDER_API, body).then((feedback) => {
                if (feedback.data.status === 1) {
                    tools__.displayOpacity('hidden');
                    showToast('Đặt hàng thành công', 'success', 'Đơn hàng dã được đặt', 2000);
                    tools.renderOrderViewSuccess();
                } else {
                    tools__.displayOpacity('hidden');
                    showToast('Có lỗi', 'error', 'Có lỗi khi đặt hàng', 2000);
                }
            });
        });
    };
}
