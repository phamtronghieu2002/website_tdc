const user = require('../models/User');
const content = require('../models/Content');
const tools = require('../../util/tools');

class ApiController {
    saveAgencys(req, res, next) {
        const data = req.body;
        const files = req.files;
        return res.status(200).json({   
            status: 1,
            data: data,
        });
    }
    index(req, res, next) {
        // console.log(req.data);

        return res.json({
            message: 'error',
        });
    }
    allUser(req, res, next) {
        const dbName = req.dbName;

        user.getAllUser(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                // console.log('ok');
                let rows = results.map((row) => {
                    return row;
                });
                res.status(200).json({
                    status: 1,
                    data: rows,
                });
            }
        });
    }
    updateContent(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        content.updateContent(dbName, data, (err, results, fields) => {
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
    updateService(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        content.updateService(dbName, data, (err, results, fields) => {
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

    updateRecruitment(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        content.updateRecruitment(dbName, data, (err, results, fields) => {
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

    updateNews(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        content.updateNews(dbName, data, (err, results, fields) => {
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

    addService(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        let slug;
        if (data.name) {
            slug = tools.removeAccents(data.name).toLowerCase() + '-' + Math.floor(Math.random() * 1000000);
            data.slug = slug;
        } else {
            return res.json({
                status: 0,
            });
        }
        content.addService(dbName, data, (err, results, fields) => {
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
    addNews(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;
        // data.dbName = dbName;
        const slug = tools.removeAccents(data.title).toLowerCase() + '-' + Math.floor(Math.random() * 1000000);
        data.slug = slug;

        content.addNews(dbName, data, (err, results, fields) => {
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
    addPolicys(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;
        // data.dbName = dbName;
        if (data.title) {
            const slug =
                tools.removeAccents(data.title).toLowerCase().replaceAll(' ', '-').replaceAll('/', '-') +
                '-' +
                Math.floor(Math.random() * 1000000);
            data.name = slug;
        } else {
            res.json({
                status: 0,
            });
        }
        content.addPolicys(dbName, data, (err, results, fields) => {
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
    addRecruitment(req, res, next) {
        const jsonData = req.body.data;
        const data = JSON.parse(jsonData);;
        const dbName = req.dbName;
        // data.dbName = dbName;
        const slug = tools.removeAccents(data.title).toLowerCase() + '-' + Math.floor(Math.random() * 1000000);
        data.slug = slug;

        content.addRecruitment(dbName, data, (err, results, fields) => {
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

module.exports = new ApiController();
