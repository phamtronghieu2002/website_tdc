const order = require('../models/Order');
const auth_token = require('../../util/auth');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// console.log(process.env.JWT_KEY);
class OrderController {
    index(req, res, next) {
        res.json({
            message: 'error',
        });
    }
    getAllContact(req, res, next) {
        const dbName = req.dbName;

        order.getAllContact(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const contactResult = results.map((row) => {
                    return row;
                });

                res.status(200).json({
                    status: 1,
                    data: contactResult,
                });
            }
        });
    }
    getAllContactEvent(req, res, next) {
        const dbName = req.dbName;

        order.getAllContactEvent(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const contactResult = results.map((row) => {
                    return row;
                });

                res.status(200).json({
                    status: 1,
                    data: contactResult,
                });
            }
        });
    }
    allOrder(req, res, next) {
        const dbName = req.dbName;

        // data.dbName = dbName;

        order.getAllOrder(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    data: 'noresult',
                });
            } else {
                let orderRows = results[0].map((row) => {
                    return row;
                });
                let productRows = results[1].map((row) => {
                    return row;
                });

                const result = orderRows.map((order) => {
                    const products = order.products.split('*');
                    if (!order.products) {
                        return { ...order, products: [[0, 0, 0]] };
                    }
                    const prArr = products.map((pr) => {
                        const prInfor = pr.split('$');
                        const prId = Number(prInfor[0]);
                        const prAmount = Number(prInfor[1]);

                        const prTarget = productRows.find((product) => product.id == prId);
                        delete prTarget.description;
                        delete prTarget.description_all;
                        const prPrice = Number(prTarget.price - (prTarget.price * prTarget.discount) / 100);

                        return [prTarget.id, prAmount, prPrice];
                    });
                    return { ...order, products: prArr };
                });

                res.status(200).json({
                    status: 1,
                    data: result,
                });
            }
        });
    }
    getAllOrder(req, res, next) {
        const dbName = req.dbName;

        // data.dbName = dbName;

        order.allOrder(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    data: 'noresult',
                });
            } else {
                let rows = results.map((row) => {
                    return row;
                });

                const idList = [];
                const resultss = [];
                rows.forEach((row) => {
                    if (!idList.includes(row.id)) {
                        row.products = [[row.product_id, row.num, row.price]];
                        idList.push(row.id);
                        resultss.push(row);
                    } else {
                        resultss.forEach((results) => {
                            if (results.id === row.id) {
                                results.products.push([row.product_id, row.num, row.price]);
                            }
                        });
                    }
                });
                // console.log(resultss);

                res.status(200).json({
                    status: 1,
                    data: resultss,
                });
            }
        });
    }
    filter(req, res, next) {
        const body = req.body;
        const dbName = req.dbName;
        // body.dbName = dbName;
        order.filter(dbName, body, (err, results, fields) => {
            if (err) {
                res.json({
                    data: 'noresult',
                });
            } else {
                let orderRows = results[0].map((row) => {
                    return row;
                });
                let productRows = results[1].map((row) => {
                    return row;
                });

                const result = orderRows.map((order) => {
                    const products = order.products.split('*');
                    if (!order.products) {
                        return { ...order, products: [[0, 0, 0]] };
                    }
                    const prArr = products.map((pr) => {
                        const prInfor = pr.split('$');
                        const prId = Number(prInfor[0]);
                        const prAmount = Number(prInfor[1]);

                        const prTarget = productRows.find((product) => product.id == prId);
                        delete prTarget.description;
                        delete prTarget.description_all;
                        const prPrice = Number(prTarget.price - (prTarget.price * prTarget.discount) / 100);

                        return [prTarget.id, prAmount, prPrice];
                    });
                    return { ...order, products: prArr };
                });

                res.status(200).json({
                    status: 1,
                    data: result,
                });
            }
        });
    }
    add(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;
        console.log(data);
        order.add(dbName, data, (err, results, fields) => {
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

    contactEvent(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;
        console.log(data);
        order.contactEvent(dbName, data, (err, results, fields) => {
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

    addContact(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;
        console.log(data);
        order.addContact(dbName, data, (err, results, fields) => {
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
    update(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        // data.dbName = dbName;
        // console.log(data);
        order.update(dbName, data, (err, results, fields) => {
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
}

module.exports = new OrderController();
