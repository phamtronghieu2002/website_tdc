const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const user = require('../../app/models/User');
require('dotenv').config();

const auth_token = {
    get: function (pms) {
        return function (req, res, next) {
            const authorizationHeaders = req.headers['authorization'];
            // console.log(authorizationHeaders);
            // console.log(headers);
            if (authorizationHeaders) {
                const token = authorizationHeaders.split(' ')[1];
                jwt.verify(token, process.env.JWT_KEY, (err, data) => {
                    // console.log(data);
                    const dbName = req.dbName;

                    user.getUserById(dbName, data, (err, results, fields) => {
                        if (err) {
                            res.json({
                                status: 0,
                            });
                        } else {
                            if (!results[0]) {
                                return res.status(200).json({
                                    status: 0,
                                });
                            }
                            const user_id = results[0].permission_id;
                            const isValid = pms.includes(user_id);
                            // console.log(user_id);
                            if (!isValid) {
                                return res.status(200).json({
                                    status: 0,
                                });
                            } else {
                                req.data = data;
                                next();
                            }
                        }
                    });
                });
            } else {
                return res.status(200).json({
                    status: 0,
                });
            }
        };
        // const token = authorizationHeaders;
        // console.log(token, process.env.JWT_KEY);
    },
    post: function (pms) {
        return function (req, res, next) {
            const authorizationBody = req.headers['authorization'];
            // const token = authorizationHeaders.split(' ')[1];

            // console.log(token, process.env.JWT_KEY);
            if (authorizationBody) {
                const token = authorizationBody.split(' ')[1];
                // console.log(token);
                jwt.verify(token, process.env.JWT_KEY, (err, data) => {
                    // console.log(data);
                    const dbName = req.dbName;

                    // console.log(dbName);
                    user.getUserById(dbName, data, (err, results, fields) => {
                        if (err) {
                            res.json({
                                status: 0,
                            });
                        } else {
                            const user_id = results[0].permission_id;

                            const isValid = pms.includes(user_id);
                            // console.log(isValid);
                            if (!isValid) {
                                return res.status(200).json({
                                    status: 0,
                                });
                            } else {
                                req.data = data;
                                next();
                            }
                        }
                    });
                });
            } else {
                return res.status(200).json({
                    status: 0,
                });
            }
        };
    },
};
module.exports = auth_token;
