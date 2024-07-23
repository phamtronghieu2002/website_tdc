const pageInterface = require('../../models/PageInterface');

class HomeController {
    index(req, res, next) {
        // console.log(req.data);
        const dbName = req.dbName;
        const inforBasicPage = req.inforBasicPage;
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }

        const template_id = inforBasicPage.companyInfor.information[0].template_id || '';
 
        pageInterface.getDataHomePage(dbName, (err, results, fields) => {
            if (err) {
                return res.render('error', {
                    title: 'ERROR',
                    active: 1,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                });
            } else {
                const contentRows = results[0].map((row) => {
                    return row;
                });

                const productRows = results[1].map((row) => {
                    return row;
                });

                const categoryRows = results[2].map((row) => {
                    return row;
                });

                const filterProduct = [];

                categoryRows.forEach((category) => {
                    const products = productRows.filter(
                        (product) => Number(product.category_id) === Number(category.id),
                    );
                    if (products.length === 0) {
                        return;
                    }
                    filterProduct.push({
                        ...category,
                        products: products,
                    });
                });

                // console.log(filterProduct);
           
                return res.render('home' + template_id, {
                    layout: 'main' + template_id,
                    title: 'TDC: Giám sát hành trình 5G-GPS',
                    style: 'home' + template_id,
                    active: 0,
                    content: contentRows,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    filterProduct: filterProduct,
                });
            }
        });
    }

    guide(req, res, next) {
        // console.log(req.data);
        const dbName = req.dbName;
        const inforBasicPage = req.inforBasicPage;
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }

        const template_id = inforBasicPage.companyInfor.information[0].template_id || '';

        pageInterface.getDataHomePage(dbName, (err, results, fields) => {
            if (err) {
                return res.render('error', {
                    title: 'ERROR',
                    active: 1,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                });
            } else {
                const contentRows = results[0].map((row) => {
                    return row;
                });

                const productRows = results[1].map((row) => {
                    return row;
                });

                const categoryRows = results[2].map((row) => {
                    return row;
                });

                const filterProduct = [];

                categoryRows.forEach((category) => {
                    const products = productRows.filter(
                        (product) => Number(product.category_id) === Number(category.id),
                    );
                    if (products.length === 0) {
                        return;
                    }
                    filterProduct.push({
                        ...category,
                        products: products,
                    });
                });

                // console.log(filterProduct);

                // return res.render('home' + template_id, {
                //     layout: 'doc' + template_id,
                //     title: 'TDC: Hướng dẫn kích hoạt thiết bị',
                //     style: 'home' + template_id,
                //     active: 0,
                //     PDFFile:
                //         'https://taixecongnghe.com/static/doc/pdf/Huong-dan-kich-hoat-thiet-bi-giam-sat-hanh-trinh.pdf',
                // });
            }
        });
    }

    grandOpeningEvent(req, res, next) {
        // console.log(req.data);
        const dbName = req.dbName;
        const inforBasicPage = req.inforBasicPage;
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }

        const template_id = inforBasicPage.companyInfor.information[0].template_id || '';
 
        pageInterface.getDataHomePage(dbName, (err, results, fields) => {
            if (err) {
                return res.render('error', {
                    title: 'ERROR',
                    active: 1,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                });
            } else {
                const contentRows = results[0].map((row) => {
                    return row;
                });

                const productRows = results[1].map((row) => {
                    return row;
                });

                const categoryRows = results[2].map((row) => {
                    return row;
                });

                const filterProduct = [];

                categoryRows.forEach((category) => {
                    const products = productRows.filter(
                        (product) => Number(product.category_id) === Number(category.id),
                    );
                    if (products.length === 0) {
                        return;
                    }
                    filterProduct.push({
                        ...category,
                        products: products,
                    });
                });

                // console.log(filterProduct);

                return res.render('openningEvent' + template_id, {
                    layout: 'event' + template_id,
                    title: 'TDC: Xác nhận tham gia sự kiện khi trương',
                    style: 'openningEvent' + template_id,
                    active: 0,
                    PDFFile:
                        'https://taixecongnghe.com/static/doc/pdf/Huong-dan-kich-hoat-thiet-bi-giam-sat-hanh-trinh.pdf',
                });
            }
        });
    }
}

module.exports = new HomeController();
