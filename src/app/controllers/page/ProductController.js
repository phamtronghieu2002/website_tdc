const pageInterface = require('../../models/PageInterface');

class ProductController {
    index(req, res, next) {
        // console.log(req.data);
        const dbName = req.dbName;
        const inforBasicPage = req.inforBasicPage;
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }
        const template_id = inforBasicPage.companyInfor.information[0].template_id || '';

        pageInterface.getDataProductPage(dbName, (err, results, fields) => {
            if (err) {
                return res.render('error', {
                    title: 'ERROR',
                    active: 1,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                });
            } else {
                const productRows = results[0].map((row) => {
                    return row;
                });
                const categoryRows = results[1].map((row) => {
                    return row;
                });
                const advRows = results[2].map((row) => {
                    return row;
                });

                const advArr = advRows[0].multi_banner.split('*');

                const filterProduct = [];
                const featuredProducts = productRows.filter((product) => Number(product.featured) === 1);
                // console.log(featuredProducts);
                // filterProduct.push({
                //     id: 0,
                //     name: 'SẢN PHẨM NỔI BẬT',
                //     products: featuredProducts,
                // });

                categoryRows.forEach((category) => {
                    const products = productRows.filter(
                        (product) => Number(product.category_id) === Number(category.id),
                    );
                    products.forEach((product) => (product.cateName = category.name));
                    if (products.length === 0) {
                        return;
                    }
                    filterProduct.push({
                        ...category,
                        products: products,
                    });
                });
                // console.log(filterProduct);
                // console.log(advArr);
                return res.render('product' + template_id, {
                    layout: 'main' + template_id,
                    title: 'Sản phẩm',
                    style: 'product' + template_id,
                    active: 1,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    featuredProducts: featuredProducts,
                    products: productRows,
                    category: categoryRows,
                    filterProduct: filterProduct,
                    adv: advArr,
                });
            }
        });
    }
    search(req, res, next) {
        // console.log(req.data);
        const dbName = req.dbName;
        const q = req.query.q;

        // console.log(q);
        const inforBasicPage = req.inforBasicPage;
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }
        const template_id = inforBasicPage.companyInfor.information[0].template_id || '';

        pageInterface.getDataSearchPage(dbName, q, (err, results, fields) => {
            if (err) {
                return res.render('error', {
                    title: 'ERROR',
                    active: 1,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                });
            } else {
                const productRows = results[0].map((row) => {
                    return row;
                });

                const categoryRows = results[1].map((row) => {
                    return row;
                });
                const advRows = results[2].map((row) => {
                    return row;
                });

                const advArr = advRows[0].multi_banner.split('*');

                const filterProduct = [];
                // const featuredProducts = productRows.filter((product) => Number(product.featured) === 1);
                // // console.log(featuredProducts);
                // filterProduct.push({
                //     id: 0,
                //     name: 'SẢN PHẨM NỔI BẬT',
                //     products: featuredProducts,
                // });
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
                let keyword = `Kết quả tìm kiếm cho '${q}'`;
                if (!productRows.length) {
                    keyword = `Không có kết quả tìm kiếm nào cho '${q}'`;
                }
                // console.log(advArr);
                return res.render('search' + template_id, {
                    title: 'Sản phẩm',
                    layout: 'main' + template_id,
                    style: 'product' + template_id,
                    active: 1,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    products: productRows,
                    category: categoryRows,
                    filterProduct: filterProduct,
                    adv: advArr,
                    q: keyword,
                });
            }
        });
    }
    slug(req, res, next) {
        const dbName = req.dbName;
        const inforBasicPage = req.inforBasicPage;
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }

        const slug = req.params.slug;
        pageInterface.getDataProductDetailPage(dbName, slug, (err, results, fields) => {
            if (err) {
                return res.render('error', {
                    title: 'ERROR',
                    active: 1,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                });
            } else {
                const productRows = results[0].map((row) => {
                    return row;
                });

                const categoryRows = results[1].map((row) => {
                    return row;
                });

                if (productRows.length === 0) {
                    return res.render('error', {
                        title: 'ERROR',
                        active: 1,
                        root: inforBasicPage.root,
                        companyInfor: inforBasicPage.companyInfor,
                    });
                }
                const imgListString = productRows[0].product_images;
                let imgList = imgListString.split('*');
                if (imgList[0] !== '') {
                    imgList = [productRows[0].thumbnail, ...imgList];
                } else {
                    imgList = [productRows[0].thumbnail];
                }

                const category = categoryRows.find((cate) => cate.id == productRows[0].category_id);
                return res.render('productDetail', {
                    title: productRows[0].title,
                    style: 'productDetail',
                    active: 1,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    product: productRows[0],
                    category: category,
                    imgList: imgList,
                });
            }
        });
    }
}

module.exports = new ProductController();
