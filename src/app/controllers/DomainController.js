const user = require('../models/User');
const content = require('../models/Content');
const domain = require('../models/Domain');
const tools = require('../../util/tools');

class ADomainController {
    index(req, res, next) {
        // console.log(req.data);

        return res.json({
            message: 'error',
        });
    }
    allDomain(req, res, next) {
        domain.getAllInforDomain((err, results, fields) => {
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
    updateDomain(req, res, next) {
        const data = req.body;
        // console.log(data);
        domain.updateDomain(data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                res.status(200).json({
                    status: 1,
                });
            }
        });
    }
    addDomain(req, res, next) {
        const data = req.body;
        domain.addDomain(data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                res.status(200).json({
                    status: 1,
                });
            }
        });
    }
}

module.exports = new ADomainController();
