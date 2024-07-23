const $_ = document.querySelector.bind(document);
const $$_ = document.querySelectorAll.bind(document);
const toast_duration = 2000;

var multiOption = $$_('.multi-option');
var sidebarOptions = $$_('.sidebar-option');
var mainOption = $$_('.main-option');
var headerLeft = $_('.header-left');
var mainContent = $_('.main-content');
var loadingPage = $_('.loading-page');
var reloadBtn = $_('.reload-btn');
var menuBtn = $_('.menu-icon-btn');
var closeMenuIcon = $_('.close-menu-icon');
var sideBar = $_('.sidebar');
var opacity = $_('.opacity');
var opacityMenu = $_('.opacity-menu');
var opacityChildren = $_('.opacity-children');
var closeOpacityBtn = $_('.close-opacity-btn');
var opacityChildrenContent = $_('.opacity-children-content');
const logoutBtn = $_('.sidebar-option.logout');

const fadeInAnimate = 'animate__animated animate__fadeIn';
const ZoomInAnimate = 'animate__animated animate__zoomIn';
const slideInDownAnimate = 'animate__animated animate__slideInDown';

var nf = Intl.NumberFormat();
var controller;
const numOfRowTable = 10;
//Text
const nameGuide =
    'Sử dụng tiếng Việt có dấu, không viết tắt, tối thiểu 10 ký tự. Độ dài tối đa của tên sản phẩm là 120 ký tự (bao gồm cả khoảng trắng)';
const productCodeGuide = 'Sử dụng tiếng Việt có dấu, không viết tắt, tối thiểu 5 ký tự';
const descriptionGuide =
    ' Đối với một số mặt hàng nhất định, Người bán cần cung cấp các thông tin sau tại mục "Mô tả sản phẩm" theo quy định của Nghị định 85/2021/NĐ-CP </br> - Số chứng nhận phê duyệt kiểu </br> - Khuyến cáo </br> - Hướng dẫn sử dụng </br> - Thông số kỹ thuật </br> - Thông tin cảnh báo';
const priceGuide = 'Giá sản phẩm phải tính bằng đơn vị VNĐ';
const inventoryNumGuide = 'Cập nhật só lượng tồn kho thực tế của sản phẩm để tránh hủy/ trễ đơn hàng';
const categoryGuide =
    'Việc đăng tải sản phẩm đúng danh mục giúp người mua dễ dàng tìm thấy sản phẩm của shop khi đang tìm kiếm trong danh mục đó.';
const guideExample = 'Gợi ý thông tin';
const imageGuide = 'Để có hiển thị tốt nhất, kích thước hình ảnh không vượt quá 500x500 và dung lượng không quá 25Kb.';
const discountGuide = 'Giảm giá sản phẩm được tính theo %.';

//SELECT 2 DATA
var data = [
    {
        id: '#2c6fab',
        text: '<div class="bg-blue color-suggestion"></div>',
        html: '<div class="bg-blue color-suggestion"></div>',
        title: '',
    },
    {
        id: '#04aa6d',
        text: '<div class="bg-green color-suggestion"></div>',
        html: '<div class="bg-green color-suggestion"></div>',
        title: '',
    },
    {
        id: '#ee4d2d',
        text: '<div class="bg-orange color-suggestion"></div>',
        html: '<div class="bg-orange color-suggestion"></div>',
        title: '',
    },
];
var themeCombo = [
    {
        id: '0',
        name: 'Chủ đề xanh - Cơ bản',
        background_color: '#ffffff',
        header_background: 'null',
        footer_background: 'https://midvietnam.com/public/images/background/bg.jpg',
        main_color: '#2c6fab',
        color_menu_home: '#ffffff',
        color_letter_1: '#000000',
        color_letter_2: '#ffffff',
        color_button: '#1d5e9a',
        color_btn_muahang: '#ffffff',
        color_btn_oof: '#ffffff',
        color_hover_btn_muahang: '#5a351',
        bg_color_order_confirmation: 'rgba(248, 245, 245, 0.527)',
        color_error: '#ff623d',
        color_success: '#47d864',
        color_warn: '#ffb702',
        color_btn_cancel: '#888',
        color_letter_cart: '#8f5339',
        color_contact_shadow: '\t#F5F5F5',
        button_color_detailproduct: '#8f5339',
        active: '1',
    },
    {
        id: '1',
        name: 'Chủ đề cam - Nổi bật',
        background_color: '#ee4d2d',
        header_background: 'null',
        footer_background: 'https://midvietnam.com/public/images/background/bg.jpg',
        main_color: '#ee4d2d',
        color_menu_home: '#ffffff',
        color_letter_1: '#000000',
        color_letter_2: '#ffffff',
        color_button: '#d63c1e',
        color_btn_muahang: '#ffffff',
        color_btn_oof: '#ffffff',
        color_hover_btn_muahang: '#5a351',
        bg_color_order_confirmation: 'rgba(248, 245, 245, 0.527)',
        color_error: '#ff623d',
        color_success: '#47d864',
        color_warn: '#ffb702',
        color_btn_cancel: '#888',
        color_letter_cart: '#8f5339',
        color_contact_shadow: '\t#F5F5F5',
        button_color_detailproduct: '#8f5339',
        active: '1',
    },
    {
        id: '1',
        name: 'Chủ đề nâu',
        background_color: '#ffffff',
        header_background: 'null',
        footer_background: '',
        main_color: '#8f5339',
        color_menu_home: '#face7f',
        color_letter_1: '#3a0400',
        color_letter_2: '#ffffff',
        color_button: '#5a3513',
        color_btn_muahang: '#ffffff',
        color_btn_oof: '#5A3513',
        color_hover_btn_muahang: '#5a351',
        bg_color_order_confirmation: 'rgba(248, 245, 245, 0.527)',
        color_error: '#ff623d',
        color_success: '#47d864',
        color_warn: '#ffb702',
        color_btn_cancel: '#888',
        color_letter_cart: '#8f5339',
        color_contact_shadow: '\t#F5F5F5',
        button_color_detailproduct: '#8f5339',
        active: '1',
    },
];
// $('select').select2({
//     data: data,
//     escapeMarkup: function (markup) {
//         return markup;
//     },
//     templateResult: function (data) {
//         return data.html;
//     },
//     templateSelection: function (data) {
//         return data.text;
//     },
// });

// LEAFLET MAKER

const redMaker = new L.Icon({
    iconUrl: 'http://quocviet.intern.midvietnam.com/pj/location_tracking/img/marker-red.png',
    shadowUrl: 'http://quocviet.intern.midvietnam.com/pj/location_tracking/img/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

tinymce.PluginManager.add('add_image', function (editor, url) {
    var openDialog = function () {
        return editor.windowManager.open({
            title: 'Chèn ảnh',
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'htmlpanel', // component type
                        html: components.imageTab(),
                    },
                ],
            },
            buttons: [
                {
                    type: 'cancel',
                    text: 'Huỷ',
                },
                {
                    type: 'submit',
                    text: 'Chèn ảnh',
                    primary: true,
                },
            ],
            onCancel: function (api) {
                // console.log('cancel');
            },
            onSubmit: function (api) {
                var data = api.getData();
                /* Insert content when the window form is submitted */
                // editor.insertContent('Title: ' + data.title);
                const imageItem = $_('.image-item[is-selected="true"]');

                if (imageItem) {
                    const html = `<img src="${imageItem.querySelector('img').src}" alt='banner-img' width="743px">`;
                    editor.insertContent(html, { format: 'raw' });
                }
                api.close();
            },
        });
    };
    /* Add a button that opens a window */
    editor.ui.registry.addButton('add_image', {
        text: '+ Chèn ảnh',
        onAction: function () {
            /* Open window */
            openDialog();
        },
    });
    /* Adds a menu item, which can then be included in any menu via the menu/menubar configuration */
    editor.ui.registry.addMenuItem('add_image', {
        text: 'Add image plugin',
        onAction: function () {
            /* Open window */
            openDialog();
        },
    });
    /* Return the metadata for the help plugin */
    return {
        getMetadata: function () {
            return {
                name: 'Add image plugin',
                url: 'http://add_imageplugindocsurl.com',
            };
        },
    };
});

// DES GUIDE

const appearTimeDES = 'Thiết lập khoảng thời gian hiển thị lặp lại quảng cáo (thời gian tính bằng giây)';
const userTelegramDES =
    'User Telegram - thiết lập tài khoản Telegram dùng để nhận các thông báo quan trọng từ Page như: CV ứng viên, Đơn hàng,...';
