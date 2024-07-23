const tools = {
    checkLogin: function () {
        const auth_token = localStorage.getItem('admin_token');
        if (!auth_token) {
            window.location = LOGIN_PAGE;
        } else {
            controller = new AbortController();
            console.log(NODE_SERVER + '/auth/checklogin');
            return tools.getDataAPI(NODE_SERVER + '/auth/checklogin').then((data) => {
                if (data.data.status === 1) {
                    loadingPage.style.display = 'none';
                    return data.data;
                } else {
                    window.location = LOGIN_PAGE;
                }
            });
        }
    },
    getDataAPI: function (API, params = {}, cancel = true) {
        const auth_token = localStorage.getItem('admin_token');

        // console.log(controller);
        if (controller && cancel) {
            // console.log('abort');
            controller.abort();
        }
        controller = new AbortController();

        let requestConfig = {
            signal: controller.signal,
            headers: {
                authorization: 'Bearer ' + auth_token,
            },
        };
        if (!cancel) {
            requestConfig = {
                headers: {
                    authorization: 'Bearer ' + auth_token,
                },
            };
        }
        // console.log(auth_token);
        return axios.get(API, requestConfig).catch((error) => {
            console.log('Cancel Request');
        });
    },
    postData: function (API, body) {
        const auth_token = localStorage.getItem('admin_token');
        return axios.request({
            method: 'POST',
            url: API,
            headers: {
                // 'Content-Type': 'multipart/form-data',
                authorization: 'Bearer ' + auth_token,
            },
            data: body,
        });
    },
    getData: function (api) {
        if (controller) {
            // console.log('abort');
            controller.abort();
        }
        controller = new AbortController();
        return new Promise((resolve, reject) => {
            fetch(api, { signal: controller.signal })
                .then(function (data) {
                    return data.json();
                })
                .then(function (data) {
                    if (data.feedback == 0) {
                        resolve();
                    }
                    resolve(data);
                });

            // setTimeout(() => reject(), 10000);
        });
    },
    displayOpacity: function (type, title = 'Title', size = 'small') {
        const mainAnimate = {
            out: 'animate__zoomOut',
            in: 'animate__zoomIn',
        };
        if (type === 'show') {
            opacity.style.display = 'flex';
            opacity.querySelector('.opacity-children-title').children[0].innerHTML = title;
            if (size === 'small') {
                opacityChildren.style.minWidth = '300px';
                opacityChildren.style.maxWidth = '1000px';
                opacityChildren.style.maxHeight = '80%';
                opacityChildren.style.minHeight = 'unset';
                opacityChildren.style.height = 'unset';
            }
            if (size === 'normal-l1') {
                opacityChildren.style.minWidth = '40%';
                opacityChildren.style.maxWidth = '60%';
                opacityChildren.style.maxHeight = '65%';
                opacityChildren.style.minHeight = '65%';
                opacityChildren.style.height = 'unset';
            }
            if (size === 'normal') {
                opacityChildren.style.minWidth = '60%';
                opacityChildren.style.maxWidth = '90%';
                opacityChildren.style.maxHeight = '70%';
                opacityChildren.style.minHeight = '80%';
                opacityChildren.style.height = 'unset';
            }
            if (size === 'big') {
                opacityChildren.style.minWidth = '95%';
                opacityChildren.style.maxWidth = '95%';
                opacityChildren.style.maxHeight = '95%';
                opacityChildren.style.minHeight = '80%';
                opacityChildren.style.height = 'unset';
            }
            if (size === 'full') {
                opacityChildren.style.minWidth = '100%';
                opacityChildren.style.maxWidth = '100%';
                opacityChildren.style.maxHeight = '100%';
                opacityChildren.style.minHeight = '100%';
                opacityChildren.style.height = 'unset';
                opacityChildren.classList.add('black-bg');
            }
        }
        if (type === 'hidden') {
            opacityChildren.classList.remove(mainAnimate.in);
            opacityChildren.classList.add(mainAnimate.out);
            opacity.classList.remove('animate__fadeIn');
            opacity.classList.add('animate__fadeOut');
            setTimeout(() => {
                opacity.style.display = 'none';
                opacityChildren.classList.add(mainAnimate.in);
                opacityChildren.classList.remove(mainAnimate.out);
                opacity.classList.add('animate__fadeIn');
                opacity.classList.remove('animate__fadeOut');
                opacityChildrenContent.innerHTML = '';
                opacityChildren.classList.remove('black-bg');
                opacityChildren.style.minWidth = '300px';
                opacityChildren.style.maxWidth = '90%';
                opacityChildren.style.maxHeight = 'unset';
                opacityChildren.style.minHeight = 'unset';
                opacityChildren.style.height = 'unset';
            }, 300);
            // opacity.style.display = 'none';

            // const confirm = $_('.confirm-ui');
            // confirm.children[1].onclick = (e) => {};
        }
    },
    confirm: function (callback, content = '', confirmText = 'Đồng ý') {
        opacityChildrenContent.innerHTML = components.confirm(content, confirmText);
        const confirm = $_('.confirm-ui');
        confirm.children[0].onclick = (e) => {
            closeOpacityBtn.click();
        };
        confirm.children[1].onclick = (e) => {
            const isRight = callback();
            if (!isRight) {
                opacityChildrenContent.innerHTML = components.loader();
            }
        };
    },
    confirml2: function (callback, title = 'Title', content = '', confirmText = 'Đồng ý') {
        const opacityL2 = document.createElement('div');
        opacityL2.classList.add('opacityl2');

        opacityL2.innerHTML = `
        <div class='children-opacityl2'>
            <div class='opacity-children-title'>
                <h3>${title}</h3> 
                <span class="close-opacityl2-btn close-opacity-btn"><i class="close"></i></span>
            </div>
            <div class='opacityl2-children'>
                ${content} 
                
            <div class = 'confirm-ui'>
                <button class='cancel-btn-opacityl2'>Huỷ</button>
                <button class='submit-btn-opacityl2'>${confirmText}</button>
            </div>
            </div>
        </div>
        `;

        document.body.appendChild(opacityL2);
        $_('.close-opacityl2-btn').onclick = (e) => {
            opacityL2.remove();
        };
        $_('.submit-btn-opacityl2').onclick = (e) => {
            callback();
            $_('.close-opacityl2-btn').click();
        };
        $_('.cancel-btn-opacityl2').onclick = (e) => {
            $_('.close-opacityl2-btn').click();
        };
    },
    handleNameGuide: function (dataName) {
        switch (dataName) {
            case 'title': {
                return ['Tên sản phẩm', nameGuide];
            }
            case 'price': {
                return ['Giá sản phẩm', priceGuide];
            }
            case 'inventory_num': {
                return ['Kho hàng', inventoryNumGuide];
            }
            case 'description': {
                return ['Mô tả sản phẩm', descriptionGuide];
            }
            case 'product_code': {
                return ['Mã sản phẩm', productCodeGuide];
            }
            case 'discount': {
                return ['Giảm giá', discountGuide];
            }
            // case 'image': {
            //     return ['Hình ảnh sản phẩm', imageGuide];
            // }
        }
    },
    handleIndexingEdit: function (indexing, type = 'indexing') {
        if (type === 'indexing') {
            switch (indexing) {
                case 'title': {
                    return 'tên sản phẩm';
                }
                case 'price': {
                    return 'giá sản phẩm';
                }
                case 'inventory_num': {
                    return 'kho hàng';
                }
            }
        }
        if (type === 'title') {
            switch (indexing) {
                case 'title': {
                    return ['Tên', 'text'];
                }
                case 'price': {
                    return ['Giá', 'number'];
                }
                case 'inventory_num': {
                    return ['Kho hàng', 'number'];
                }
            }
        }
    },
    setValueInputEdit: function (indexing, producInfor) {
        let value;
        let type;
        switch (indexing) {
            case 'title': {
                value = producInfor.title;
                type = 'text';
                break;
            }
            case 'price': {
                value = producInfor.price;
                type = 'number';
                break;
            }
            case 'inventory_num': {
                value = producInfor.inventory_num;
                type = 'number';
                break;
            }
        }

        document.getElementById('update-value-input').value = value;
        document.getElementById('update-value-input').type = type;
    },
    sortData: function (data_, sortName, type) {
        const data = [...data_];
        let sortData = [];
        if (type === 's2b') {
            sortData = data.sort(function (a, b) {
                // console.log(a[sortName]);
                // console.log(typeof a[sortName]);
                if (typeof a[sortName] === 'number') {
                    // console.log(typeof data[0].price);
                    if (a[sortName] < b[sortName]) {
                        return -1;
                    }
                    if (a[sortName] > b[sortName]) {
                        return 1;
                    }
                    return 0;
                } else {
                    // console.log(a[sortName].toString().toLowerCase());
                    if (a[sortName].toString().toLowerCase() < b[sortName].toString().toLowerCase()) {
                        return -1;
                    }
                    if (a[sortName].toString().toLowerCase() > b[sortName].toString().toLowerCase()) {
                        return 1;
                    }
                    return 0;
                }
            });
        }

        if (type === 'b2s') {
            sortData = data.sort(function (a, b) {
                if (typeof a[sortName] === 'number') {
                    if (a[sortName] > b[sortName]) {
                        return -1;
                    }
                    if (a[sortName] < b[sortName]) {
                        return 1;
                    }
                    return 0;
                } else {
                    // console.log(a[sortName].toString().toLowerCase());
                    if (a[sortName].toString().toLowerCase() > b[sortName].toString().toLowerCase()) {
                        return -1;
                    }
                    if (a[sortName].toString().toLowerCase() < b[sortName].toString().toLowerCase()) {
                        return 1;
                    }
                    return 0;
                }
            });
        }

        if (type === 'normal') {
            sortData = data;
        }
        return sortData;
    },
    updateSortTable: function (sortData, productTbody, component) {
        if (productTbody) {
            productTbody.innerHTML = sortData
                .map((product, index) => {
                    return components[component](product, index);
                })
                .join('');
        }
    },
    updateSortTablebyTitle: function (thTitles, thTitle, products, productTbody, sortName, component) {
        if (!thTitle.className.includes('sort-s2b') && !thTitle.className.includes('sort-b2s')) {
            thTitles.forEach((e) => {
                e.classList.remove('sort-s2b');
                e.classList.remove('sort-b2s');
            });
            thTitle.classList.add('sort-s2b');
            const sortData = tools.sortData(products, sortName, 's2b');

            // console.log(sortData);
            tools.updateSortTable(sortData, productTbody, component);
        } else if (thTitle.className.includes('sort-s2b')) {
            thTitle.classList.remove('sort-s2b');
            thTitle.classList.add('sort-b2s');
            const sortData = tools.sortData(products, sortName, 'b2s');
            tools.updateSortTable(sortData, productTbody, component);
        } else if (thTitle.className.includes('sort-b2s')) {
            thTitle.classList.remove('sort-b2s');
            tools.updateSortTable(products, productTbody, component);
        }
        // console.log(thTitle.className);
    },
    setEnterEvent: function (element, callback) {
        element.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                // console.log($_('.confirm-ui'));
                callback();
            }
        });
    },
    productFilter: function (products, body) {
        let searchResults = [];
        const dataProducts = [...products];

        //product name flilter
        searchResults = dataProducts.filter((data) => {
            if (!body.productName) {
                return true;
            } else {
                const isAll = body.productName.find((product) => Number(product) === 0);
                if (isAll) return true;
                const isMatch = body.productName.find((product) => Number(product) === Number(data.id));
                return isMatch;
            }
        });
        //category filter
        searchResults = searchResults.filter((data) => {
            if (!body.categoryName) {
                return true;
            } else {
                const isAll = body.categoryName.find((product) => Number(product) === 0);
                if (isAll) return true;
                const isMatch = body.categoryName.find((product) => Number(product) === Number(data.category_id));
                return isMatch;
            }
        });
        //price filter
        searchResults = searchResults.filter((data) => {
            const productPrice = Number(data.price);
            if (body.maxPrice) {
                return productPrice <= body.maxPrice && productPrice >= body.minPrice;
            } else {
                return productPrice >= body.minPrice;
            }
        });

        //seller filter
        searchResults = searchResults.filter((data) => {
            const productSold = Number(data.sold);
            if (body.maxSold) {
                return productSold <= body.maxSold && productSold >= body.minSold;
            } else {
                return productSold >= body.minSold;
            }
        });

        return searchResults;
    },
    readURL: function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.readAsDataURL(input.files[0]);
        }
    },
    handleTimeDDMMYY: function (date) {
        d = new Date(date);
        var h = d.getHours();
        h < 10 ? (h = '0' + h) : (h = h);
        var m = d.getMinutes();
        m < 10 ? (m = '0' + m) : (m = m);
        var s = d.getSeconds();
        s < 10 ? (s = '0' + s) : (s = s);
        var day = d.getDate();
        day < 10 ? (day = '0' + day) : (day = day);
        var mo = d.getMonth() + 1;
        mo < 10 ? (mo = '0' + mo) : (mo = mo);
        var y = d.getFullYear();
        // return h + ':' + m + ':' + s + ' ' + day + '/' + mo + '/' + y;
        return y + '-' + mo + '-' + day;
    },
    handleTime: function (date) {
        d = new Date(date);
        var h = d.getHours();
        h < 10 ? (h = '0' + h) : (h = h);
        var m = d.getMinutes();
        m < 10 ? (m = '0' + m) : (m = m);
        var s = d.getSeconds();
        s < 10 ? (s = '0' + s) : (s = s);
        var day = d.getDate();
        day < 10 ? (day = '0' + day) : (day = day);
        var mo = d.getMonth() + 1;
        mo < 10 ? (mo = '0' + mo) : (mo = mo);
        var y = d.getFullYear();
        // return h + ':' + m + ':' + s + ' ' + day + '/' + mo + '/' + y;
        return day + '/' + mo + '/' + y;
    },
    handleTimeFull: function (date) {
        d = new Date(date);
        var h = d.getHours();
        h < 10 ? (h = '0' + h) : (h = h);
        var m = d.getMinutes();
        m < 10 ? (m = '0' + m) : (m = m);
        var s = d.getSeconds();
        s < 10 ? (s = '0' + s) : (s = s);
        var day = d.getDate();
        day < 10 ? (day = '0' + day) : (day = day);
        var mo = d.getMonth() + 1;
        mo < 10 ? (mo = '0' + mo) : (mo = mo);
        var y = d.getFullYear();
        // return h + ':' + m + ':' + s + ' ' + day + '/' + mo + '/' + y;
        return day + '/' + mo + '/' + y + '  ' + h + ':' + m + ':' + s;
    },
    getCurrDay: function (pre = 0) {
        var date = new Date();

        var day = date.getDate() - pre;
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;

        var today = year + '-' + month + '-' + day;
        return today;
    },
    handleStatusOrder: function (input) {
        if (input == 0) {
            return 'huỷ';
        }
        if (input == 2) {
            return 'xác nhận';
        }
        if (input == 3) {
            return 'giao';
        }
    },
    handleProductOrder: function (productIdList) {
        // console.log(productIdList);
        // console.log(app.data.products);
        return productIdList
            .map((productId) => {
                const productTarget = app.data.products.find((product) => product.id === productId[0]);
                // console.log(productTarget);
                if (!productTarget) {
                    return 'Sản phẩm không tồn tại!';
                }
                return `<div class='product-name-order-wrapper'><span>-&nbsp</span> <p class='product-name'><b><span class='blue'>x${productId[1]}</span> ${productTarget.title}</b></p></div>`;
            })
            .join('');
    },
    handleProductExport: function (productIdList) {
        return productIdList
            .map((productId) => {
                const productTarget = app.data.products.find((product) => product.id === productId[0]);
                return `${productTarget.title}`;
            })
            .join(', ');
    },
    handleProductOrderDetail: function (productIdList) {
        // console.log(productIdList);
        // console.log(app.data.products);
        return productIdList
            .map((productId) => {
                const productTarget = app.data.products.find((product) => product.id === productId[0]);
                if (!productTarget) {
                    return 'Sản phẩm không tồn tại!';
                }
                return `<div class='product-title-table'>
                <div class='product-infor-action-order'><b style='margin-right: 5px'><span class='blue'>x${
                    productId[1]
                }</span></b>
                <div class='product-thumbnail-table'>
                    <img src='${productTarget.thumbnail}'></img>
                </div>
                <div>
                    <p class='product-name-table-l1'>${productTarget.title}</p>
                    <p>Mã SP: ${productTarget.product_code}</p>
                </div>
                <div class='edit-product-icon' indexing = 'title'><i class="fas fa-pen"></i></div> </div>
                <b style='margin-right: 5px'><span class='blue'> = ${nf.format(
                    productId[2] * Number(productId[1]),
                )} đ</span></b>
            </div>`;
            })
            .join('');
    },
    handleProductStatus: function (status) {
        if (Number(status) === 0) {
            return 'Đang bán';
        }
        if (Number(status) === 1) {
            return 'Đang ẩn';
        }
    },
    handleProductFeatured: function (status) {
        if (Number(status) === 0) {
            return 'Không';
        }
        if (Number(status) === 1) {
            return 'Có';
        }
    },
    handleOrderNote: function (input) {
        if (input !== '') {
            return input;
        }
        return 'Không có ghi chú';
    },
    handleOrderStatus: function (input) {
        const status = Number(input);
        if (status === 0) {
            return `<p >Đã huỷ</p>`;
        }
        if (status === 1) {
            return `<p class='orange'>Chờ xác nhận</p>`;
        }
        if (status === 2) {
            return `<p class="blue">Đã xác nhận</p>`;
        }
        if (status === 3) {
            return `<p class="green">Đã giao</p>`;
        }
    },
    handleOrderStatusExport: function (input) {
        const status = Number(input);
        if (status === 0) {
            return `Đã huỷ`;
        }
        if (status === 1) {
            return `Chờ xác nhận`;
        }
        if (status === 2) {
            return `Đã xác nhận`;
        }
        if (status === 3) {
            return `Đã giao`;
        }
    },
    handleActionProduct: function (productId, action) {
        const productTarget = app.data.products.find((product) => Number(product.id) === Number(productId));
        if (action === 'close') {
            return [
                `ẩn bán sản phẩm ${productTarget.title}`,
                'Sản phẩm khi ẩn sẽ ngay lập tức ẩn hiển thị trên trang bán hàng!',
                ['hidden', 1],
            ];
        }
        if (action === 'open') {
            return [
                `hiện bán sản phẩm ${productTarget.title}`,
                'Sản phẩm khi hiển sẽ ngay lập tức hiển thị trên trang bán hàng!',
                ['hidden', 0],
            ];
        }
        if (action === 'delete') {
            return [
                `xoá sản phẩm ${productTarget.title}`,
                'Sản phẩm khi xoá sẽ không được khôi phục bằng trang admin!',
                ['deleted', 0],
            ];
        }
    },
    handleTabTable: function (data, tab) {
        const chunkData = tools.chunkArray(data, numOfRowTable);
        return chunkData[tab];
    },
    chunkArray: function (myArray, chunk_size) {
        var index = 0;
        var arrayLength = myArray.length;
        var tempArray = [];

        for (index = 0; index < arrayLength; index += chunk_size) {
            myChunk = myArray.slice(index, index + chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }

        return tempArray;
    },
    export2ExelFormat: function (data, title, header, fileName = 'report', sheetName = 'report') {
        let myData = data;
        let myHeader = [];
        let myFooter = ['Thống kê bởi MID Việt Nam'];

        if (!myData || myData.length === 0) {
            console.error('Dữ liệu trống');
            return;
        }
        // console.log('exportToExcel', myData);

        if (title !== '') {
            myHeader = header;
            exportToExcelPro(fileName, sheetName, title, myHeader, myFooter, [
                { width: 5 },
                { width: 15 },
                { width: 30 },
                { width: 20 },
                { width: 30 },
                { width: 30 },
                { width: 20 },
                { width: 20 },
                { width: 30 },
                { width: 30 },
                { width: 20 },
            ]);
            return;
        }

        async function exportToExcelPro(fileName, sheetName, report, myHeader, myFooter, widths) {
            if (!myData || myData.length === 0) {
                console.error('Không có Data');
                return;
            }
            // console.log('exportToExcel', myData);

            const wb = new ExcelJS.Workbook();
            const ws = wb.addWorksheet(sheetName);
            const columns = myHeader?.length;
            const title = {
                border: true,
                money: false,
                height: 50,
                font: { size: 12, bold: false, color: { argb: '000000' } },
                alignment: { horizontal: 'center', vertical: 'middle' },
                fill: {
                    type: 'pattern',
                    pattern: 'solid', //darkVertical
                    fgColor: {
                        argb: 'FFFFFF',
                    },
                },
            };
            const header = {
                border: true,
                money: false,
                height: 45,
                font: { size: 11.5, bold: false, color: { argb: 'FFFFFF' } },
                alignment: { horizontal: 'center', vertical: 'middle' },
                fill: {
                    type: 'pattern',
                    pattern: 'solid', //darkVertical
                    fgColor: {
                        argb: '00B0F0',
                    },
                },
            };
            const data = {
                border: true,
                money: true,
                height: 0,
                font: { size: 11.5, bold: false, color: { argb: '000000' } },
                alignment: null,
                fill: null,
            };
            const footer = {
                border: true,
                money: true,
                height: 70,
                font: { size: 15, bold: true, color: { argb: '000000' } },
                alignment: null,
                fill: {
                    type: 'pattern',
                    pattern: 'solid', //darkVertical
                    fgColor: {
                        argb: 'FFFFFF',
                    },
                },
            };
            if (widths && widths.length > 0) {
                ws.columns = widths;
            }

            report.forEach((report) => {
                row = addRow(ws, [report], title);
                mergeCells(ws, row, 1, columns);
            });

            addRow(ws, myHeader, header);
            // console.log('wb', wb);
            myData.forEach((row) => {
                addRow(ws, Object.values(row), data);
            });
            // console.log('myFooter', myFooter);

            // row = addRow(ws, myFooter, footer);
            // mergeCells(ws, row, 1, columns);

            const buf = await wb.xlsx.writeBuffer();
            saveAs(new Blob([buf]), `${fileName}.xlsx`);
        }

        function addRow(ws, data, section) {
            const borderStyles = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
            const row = ws.addRow(data);
            // console.log('addRow', section, data);
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                if (section?.border) {
                    cell.border = borderStyles;
                }
                if (section?.money && typeof cell.value === 'number') {
                    cell.alignment = { vertical: 'middle' };
                }
                if (section?.alignment) {
                    cell.alignment = section.alignment;
                } else {
                    cell.alignment = { vertical: 'middle' };
                }
                if (section?.font) {
                    cell.font = section.font;
                }
                if (section?.fill) {
                    cell.fill = section.fill;
                }
            });
            if (section?.height > 0) {
                row.height = section.height;
            }
            return row;
        }

        function mergeCells(ws, row, from, to) {
            // console.log(
            // 	'mergeCells',
            // 	row,
            // 	from,
            // 	to,
            // 	row.getCell(from)._address,
            // 	row.getCell(to)._address
            // );
            ws.mergeCells(`${row.getCell(from)._address}:${row.getCell(to)._address}`);
        }

        function columnToLetter(column) {
            var temp,
                letter = '';
            while (column > 0) {
                temp = (column - 1) % 26;
                letter = String.fromCharCode(temp + 65) + letter;
                column = (column - temp - 1) / 26;
            }
            return letter;
        }
    },

    handleDateFileName: function (date) {
        d = new Date(date);
        var h = d.getHours();
        h < 10 ? (h = '0' + h) : (h = h);
        var m = d.getMinutes();
        m < 10 ? (m = '0' + m) : (m = m);
        var s = d.getSeconds();
        s < 10 ? (s = '0' + s) : (s = s);
        var day = d.getDate();
        day < 10 ? (day = '0' + day) : (day = day);
        var mo = d.getMonth() + 1;
        mo < 10 ? (mo = '0' + mo) : (mo = mo);
        var y = d.getFullYear();
        return day + '-' + mo + '-' + y;
    },
    config: {
        tinymceInit: function (selector, height = '300') {
            tinymce.init({
                selector: selector,
                plugins: 'image code add_image link visualblocks',
                toolbar:
                    'undo redo | forecolor backcolor | add_image link| bold italic | alignleft aligncenter alignright alignjustify | outdent indent | code',
                /* enable title field in the Image dialog*/
                fontsize_formats: '8pt 9pt 10pt 11pt 12pt 14pt 18pt 24pt 30pt 36pt 48pt 60pt 72pt 96pt',
                image_title: true,
                /* enable automatic uploads of images represented by blob or data URIs*/
                automatic_uploads: true,
                // inline: true,
                relative_urls: false,
                remove_script_host: false,
                convert_urls: true,
                /*
                  URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
                  images_upload_url: 'postAcceptor.php',
                  here we add custom filepicker only to Image dialog
                */
                file_picker_types: 'image',
                extended_valid_elements: 'i[class]',
                /* and here's our custom image picker*/
                file_picker_callback: function (cb, value, meta) {
                    var input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');

                    /*
                    Note: In modern browsers input[type="file"] is functional without
                    even adding it to the DOM, but that might not be the case in some older
                    or quirky browsers like IE, so you might want to add it to the DOM
                    just in case, and visually hide it. And do not forget do remove it
                    once you do not need it anymore.
                  */

                    input.onchange = function () {
                        var file = this.files[0];

                        var reader = new FileReader();
                        reader.onload = function () {
                            /*
                        Note: Now we need to register the blob in TinyMCEs image blob
                        registry. In the next release this part hopefully won't be
                        necessary, as we are looking to handle it internally.
                      */
                            var id = 'blobid' + new Date().getTime();
                            var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                            var base64 = reader.result.split(',')[1];
                            var blobInfo = blobCache.create(id, file, base64);
                            blobCache.add(blobInfo);

                            /* call the callback and populate the Title field with the file name */
                            cb(blobInfo.blobUri(), { title: file.name });
                        };
                        console.log(file);
                        reader.readAsDataURL(file);
                    };

                    input.click();
                },
                // content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                height: height,
            });
        },
        imageWrapperUI: function () {
            return tools.getDataAPI(IMAGES_API, {}, false).then((feedback) => {
                // console.log(feedback.data.data);
                const imgData = feedback.data.data;
                app.data.image = imgData;
            });
        },
    },
    insertAfter: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },
    handlePermission: function (permission_id) {
        switch (permission_id) {
            case 1:
                return 'Admin';
            case 2:
                return 'Kế toán';
            case 3:
                return 'Designer';
            case -1:
                return 'MANAGER';
        }
    },
    handleDomainStatus: function (status) {
        if (status == 0) {
            return '<span class="green" style="font-weight: 600;">Đang hoạt động</span>';
        }
        if (status == 1) {
            return '<span class="orange" style="font-weight: 600;">Vô hiệu hoá</span>';
        }
    },
    reDefiniteVar: function () {
        multiOption = $$_('.multi-option');
        sidebarOptions = $$_('.sidebar-option');
        mainOption = $$_('.main-option');
        headerLeft = $_('.header-left');
        mainContent = $_('.main-content');
        loadingPage = $_('.loading-page');
        reloadBtn = $_('.reload-btn');
        opacity = $_('.opacity');
        opacityChildren = $_('.opacity-children');
        closeOpacityBtn = $_('.close-opacity-btn');
        opacityChildrenContent = $_('.opacity-children-content');
    },
    onloadImage: function (e) {
        // console.log(e.target.offsetHeight + ' : ' + e.target.offsetWidth);
        e.target.classList.remove('loading_img');
    },
};

// <div class="add-image-wrapper">
//     <input data-name="image" type="file" accept="image/*" id="upload-image" style="display: none" />
//     <div class="plus-alt-wrapper" onclick="handleEvent.uploadImage(event)">
//         <span>Thêm hình ảnh</span>
//     </div>
// </div>;
