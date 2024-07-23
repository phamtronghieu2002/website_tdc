const product = require('../models/Product');
const pageInterface = require('../models/PageInterface');
const tools = require('../../util/tools');

const auth_token = require('../../util/auth');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
// const upload = require('../../util/upload/file/image');
const multer = require('multer');

dotenv.config();

// console.log(process.env.JWT_KEY);
class ProductController {
    index(req, res, next) {
        res.json({
            message: 'error',
        });
    }
    update(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        product.update(dbName, data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                // console.log('ok');
                res.status(200).json({
                    status: 1,
                });
            }
        });
    }

    updateCategory(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        // console.log(dbName);
        product.updateCategory(dbName, data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                // console.log('ok');
                res.status(200).json({
                    status: 1,
                });
            }
        });
    }

    add(req, res, next) {
        const data = req.body;
        let slug;
        if (data.title) {
            slug =
                tools.removeAccents(data.title).toLowerCase().replaceAll(' ', '-').replaceAll('/', '-') +
                '-' +
                Math.floor(Math.random() * 1000000);
            data.slug = slug;
        } else {
            res.json({
                status: 0,
            });
        }
        // data.thumbnail = process.env.SERVER_DOMAIN + 'product/' + req.file.filename;
        if (!data.product_images) {
            return res.json({
                status: 3,
            });
        }
        const dbName = req.dbName;

        product.add(dbName, data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                // pageInterface.addImage(data.thumbnail, (err, results, fields) => {});
                // console.log('ok');
                res.status(200).json({
                    status: 1,
                    // imgUrl: data.thumbnail,
                });
            }
        });
    }
    addCategory(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        product.addCategory(dbName, data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                // console.log('ok');
                res.status(200).json({
                    status: 1,
                });
            }
        });
    }
    sortCategory(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        product.sortCategory(dbName, data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                // console.log('ok');
                res.status(200).json({
                    status: 1,
                });
            }
        });
    }

    // no Auth
    getAllDataOfP(req, res, next) {
        const dbName = req.dbName;

        product.getAllDataOfP(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const productRows = results[0].map((row) => {
                    return row;
                });
                const categoryRows = results[1].map((row) => {
                    return row;
                });

                res.status(200).json({
                    status: 1,
                    products: productRows,
                    category: categoryRows,
                });
            }
        });
    }
    getNews(req, res, next) {
        const dbName = req.dbName;

        pageInterface.getNews(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const newsResult = results.map((row) => {
                    return row;
                });

                res.status(200).json({
                    status: 1,
                    data: newsResult,
                });
            }
        });
    }
    getProductAdmin(req, res, next) {
        const dbName = req.dbName;

        product.getProductAdmin(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const productRows = results.map((row) => {
                    return row;
                });

                res.status(200).json(productRows);
            }
        });
    }
    getAllCategory(req, res, next) {
        const dbName = req.dbName;

        product.getAllCategory(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const cateRows = results.map((row) => {
                    return row;
                });

                res.status(200).json(cateRows);
            }
        });
    }
    changeImage(req, res, next) {
        const dbName = req.dbName;

        product.changeImage(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                let imgRows = results.map((row) => {
                    return row;
                });

                imgRows = imgRows.map((img) => {
                    if (img.description) {
                        const img_news = img.description.replaceAll(
                            'https://dailyser.midvietnam.com',
                            'https://daily3.intern.midvietnam.com',
                        );
                        return { id: img.id, img: img_news };
                    }
                });

                imgRows.forEach((img) => {
                    if (img) {
                        product.updateImage(dbName, img, (err, results, fields) => {});
                    }
                });
                res.status(200).json(imgRows);
            }
        });
    }
}

module.exports = new ProductController();
