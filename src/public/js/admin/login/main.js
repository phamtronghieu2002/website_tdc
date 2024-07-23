const getDataAPI = function (API, params = {}) {
    const auth_token = localStorage.getItem('admin_token');
    // console.log('login');
    return axios.get(API, {
        headers: {
            authorization: 'Bearer ' + auth_token,
        },
    });
};
// const SEVER = 'http://daily.intern.midvietnam.com/admin:4012';
// const SEVER = 'https://dailyser.midvietnam.com';
// const SEVER = 'http://192.168.0.107:4012';

const auth_token = localStorage.getItem('admin_token');
if (!auth_token) {
    document.querySelector('.loading-page').style.display = 'none';
} else {
    getDataAPI(NODE_SERVER + '/auth/checklogin/admin').then((data) => {
        if (data.data.status === 1) {
            window.location = CLIENT;
            console.log('logined');
        } else {
            document.querySelector('.loading-page').style.display = 'none';
        }
    });
}

$(function () {
    $('.form-signin').submit(function (e) {
        // console.log('ok');
        e.preventDefault();
        handleSubmit('email', 'isEmail');
        handleSubmit('pass', 'isText', 5);
        if (handleSubmit('email', 'isEmail') && handleSubmit('pass', 'isText', 5)) {
            const params = {
                email: getInput('email'),
                pass: getInput('pass'),
            };
            $.post(NODE_SERVER + '/auth/login/admin', params, function (data) {
                console.log(data);
                if (data.status === 1) {
                    document.querySelector('.form-signin').style.opacity = '0';
                    document.querySelector('.successtext').innerText = 'Successful, redirecting to homepage...';
                    $('.nav').toggleClass('nav-up');
                    $('.form-signup-left').toggleClass('form-signup-down');
                    $('.success').toggleClass('success-left');
                    $('.frame').toggleClass('frame-short');
                    document.querySelector('.successtext').classList.add('cc');
                    window.location = CLIENT;
                    // var version = localStorage.getItem('version');
                    localStorage.setItem('admin_token', data.token);
                }
                if (data.status === 0) {
                    document.querySelector('.no_log').children[0].innerHTML = 'Incorrect account or password';
                }
                if (data.status === 'error db') {
                    document.querySelector('.no_log').children[0].innerHTML =
                        'Có lỗi khi đăng nhập, vui lòng thử lại sau';
                }
            });
        } else {
        }
    });
});

var pass_;
function handleEvent() {
    handleInput('email', 'isEmail');
    handleInput('pass', 'isText', 5);

    handleInput('fullname_re', 'isText', 5);
    handleInput('email_re', 'isEmail');
    handleInput('pass_re', 'isText', 5);
    handleInput('confirm_pass_re', 'isConfirmPass', 5);
}

function handleInput(id, type, lengthRule) {
    if (type === 'isEmail') {
        const input = document.querySelector(`#${id}`);
        if (input) {
            input.onblur = (e) => {
                if (!input.value.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                    input.classList.add('illegal');
                    input.placeholder = 'Trường bắt buộc';
                }
            };
            input.onfocus = (e) => {
                // document.querySelector('.no_re').children[0].innerText = '';
                document.querySelector('.no_log').children[0].innerText = '';
                input.classList.remove('illegal');
                input.placeholder = '';
            };
        }
    }

    if (type === 'isText') {
        const input = document.querySelector(`#${id}`);
        if (input) {
            input.onblur = (e) => {
                if (input.value === '' || input.value.length < lengthRule) {
                    input.classList.add('illegal');
                    input.placeholder = 'Trường bắt buộc';
                } else {
                    pass_ = input.value;
                }
            };
            input.onfocus = (e) => {
                input.classList.remove('illegal');
                input.placeholder = '';
                // document.querySelector('.no_re').children[0].innerText = '';
                document.querySelector('.no_log').children[0].innerText = '';
            };
        }
    }

    if (type === 'isConfirmPass') {
        const input = document.querySelector(`#${id}`);
        if (input) {
            input.onblur = (e) => {
                if (input.value !== pass_ || input.value.length < lengthRule) {
                    input.classList.add('illegal');
                    input.placeholder = 'Trường bắt buộc';
                }
            };
            input.onfocus = (e) => {
                input.classList.remove('illegal');
                input.placeholder = '';
                document.querySelector('.no_re').children[0].innerText = '';
                document.querySelector('.no_log').children[0].innerText = '';
            };
        }
    }
}

function handleSubmit(id, type, lengthRule) {
    const input = document.querySelector(`#${id}`);
    if (type === 'isEmail') {
        if (!input.value.toLowerCase().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            input.classList.add('illegal');
            input.placeholder = 'Trường bắt buộc';
            return false;
        }
    }

    if (type === 'isText') {
        if (input.value === '' || input.value.length < lengthRule) {
            input.classList.add('illegal');
            input.placeholder = 'Trường bắt buộc';
            return false;
        } else {
            pass_ = input.value;
        }
    }

    if (type === 'isConfirmPass') {
        if (input.value !== pass_ || input.value.length < lengthRule) {
            input.classList.add('illegal');
            input.placeholder = 'Trường bắt buộc';
            return false;
        }
    }
    return true;
}
function getInput(id) {
    return document.querySelector(`#${id}`).value;
}

handleEvent();
