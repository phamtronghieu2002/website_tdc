const user = require('../models/User');
const auth_token = require('../../util/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv');
dotenv.config();

// bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//     console.log(hash);
// });

// console.log(process.env.JWT_KEY);
class AuthController {
    index(req, res, next) {
        res.json({
            message: 'error',
        });
    }

    // register(req, res, next) {
    //     const dataUser = req.body;

    //     if (!dataUser.fullname || !dataUser.email || !dataUser.pass) {
    //         return res.status(200).json({
    //             status: 'error',
    //         });
    //     }
    //     user.getUserByEmail(dataUser.email, (err, results, fields) => {
    //         if (err) {
    //             // console.log(err);
    //             return res.json({
    //                 status: 0,
    //             });
    //         } else {
    //             if (results.length === 0) {
    //                 user.addUser(dataUser, (err, results, fields) => {
    //                     return res.status(200).json({
    //                         status: 1,
    //                     });
    //                 });
    //             } else {
    //                 return res.status(200).json({
    //                     status: 2,
    //                 });
    //             }
    //         }
    //     });
    // }
    login(req, res, next) {
        const dataUser = req.body;
        const dbName = req.dbName;
        // dataUser.dbName = dbName;
        // console.log(dataUser);
        if (!dataUser.email || !dataUser.pass) {
            return res.status(200).json({
                status: 'error',
            });
        }
        user.getUserByEmail(dbName, dataUser, (err, results, fields) => {
            if (err) {
                return res.status(200).json({
                    status: 'error db',
                });
            } else {
                if (results.length === 1) {
                    // var hash = '$2y$10$Rxf1xqaois1ziYzFkOVjM.lrs2BKtYpVDsgxcyR488rGo/g9i70wq';
                    var hash = results[0].pass;
                    hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');
                    bcrypt.compare(dataUser.pass, hash, function (err, rs) {
                        // console.log(hash);
                        // console.log(dataUser.pass);
                        // console.log(rs);
                        if (rs) {
                            const accessToken = jwt.sign({ id: results[0].id, code: 'code' }, process.env.JWT_KEY);
                            //set cookies
            
                            return res.status(200).json({
                                status: 1,
                                userData: {
                                    user_id: results[0].id,
                                    fullname: results[0].fullname,
                                    email: results[0].email,
                                    phoneNumber: results[0].phone_number,
                                    address: results[0].address,
                                },
                                permission: results[0].permission_id,
                                token: accessToken,
                            });
                        } else {
                            return res.status(200).json({
                                status: 0,
                            });
                        }
                    });
                } else {
                    return res.status(200).json({
                        status: 0,
                    });
                }
            }
        });
    }

    adminAuth(req, res, next) {
        const dataUser = req.body;
        const dbName = req.dbName;
        // dataUser.dbName = dbName;
        // console.log(dataUser);
        if (!dataUser.email || !dataUser.pass) {
            return res.status(200).json({
                status: 'error',
            });
        }
        user.getUserByEmail(dbName, dataUser, (err, results, fields) => {
            if (err) {
                return res.status(200).json({
                    status: 'error db',
                });
            } else {
                if (results.length === 1) {
                    // var hash = '$2y$10$Rxf1xqaois1ziYzFkOVjM.lrs2BKtYpVDsgxcyR488rGo/g9i70wq';

                    if (![-1, 0, 1, 2, 3].includes(results[0].permission_id)) {
                        return res.status(200).json({
                            status: 0,
                        });
                    }

                    var hash = results[0].pass;
                    hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');
                    bcrypt.compare(dataUser.pass, hash, function (err, rs) {
                        if (rs) {
                            const accessToken = jwt.sign({ id: results[0].id, code: 'code' }, process.env.JWT_KEY);
                            return res.status(200).json({
                                status: 1,
                                userData: {
                                    user_id: results[0].id,
                                    fullname: results[0].fullname,
                                    email: results[0].email,
                                    phoneNumber: results[0].phone_number,
                                    address: results[0].address,
                                },
                                permission: results[0].permission_id,
                                token: accessToken,
                            });
                        } else {
                            return res.status(200).json({
                                status: 0,
                            });
                        }
                    });
                } else {
                    return res.status(200).json({
                        status: 0,
                    });
                }
            }
        });
    }
    checkLogin(req, res, next) {
        const data = req.data;
        const dbName = req.dbName;
        // data.dbName = dbName;
        // console.log(data);
        user.getUserById(dbName, data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                return res.status(200).json({
                    status: 1,
                    permission_id: results[0].permission_id,
                });
            }
        });
    }
    changePass(req, res, next) {
        const dataUser = req.body;
        const dbName = req.dbName;
        // console.log(dataUser);
        if (!dataUser.email || !dataUser.oldPass || !dataUser.newPass) {
            return res.status(200).json({
                status: 'error',
            });
        }
        user.getUserByEmail(dbName, dataUser, (err, results, fields) => {
            if (err) {
                return res.status(200).json({
                    status: 'error db',
                });
            } else {
                if (results.length === 1) {
                    // var hash = '$2y$10$Rxf1xqaois1ziYzFkOVjM.lrs2BKtYpVDsgxcyR488rGo/g9i70wq';

                    // if (![-1, 0, 1, 2, 3].includes(results[0].permission_id)) {
                    //     return res.status(200).json({
                    //         status: 0,
                    //     });
                    // }

                    var hash = results[0].pass;
                    hash = hash.replace(/^\$2y(.+)$/i, '$2a$1');
                    bcrypt.compare(dataUser.oldPass, hash, function (err, rs) {
                        if (rs) {
                            bcrypt.hash(dataUser.newPass, saltRounds, function (err, hash) {
                                dataUser.hash = hash;
                                user.changePass(dbName, dataUser, (err, results, fields) => {
                                    if (err) {
                                        return res.status(200).json({
                                            status: 'error db',
                                        });
                                    } else {
                                        return res.status(200).json({
                                            status: 1,
                                        });
                                    }
                                });
                            });
                        } else {
                            return res.status(200).json({
                                status: 2,
                            });
                        }
                    });
                } else {
                    return res.status(200).json({
                        status: 0,
                    });
                }
            }
        });
    }

    getConfig(req, res, next) {
        const dbName = req.dbName;
        // const data = {};
        // data.dbName = dbName;

        user.getConfig(dbName, (err, results, fields) => {
            let rows = results.map((row) => {
                return row;
            });
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                return res.status(200).json({
                    status: 1,
                    data: rows,
                });
            }
        });
    }

    updateConfig(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        user.updateConfig(dbName, data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                return res.status(200).json({
                    status: 1,
                });
            }
        });
    }
}

module.exports = new AuthController();
