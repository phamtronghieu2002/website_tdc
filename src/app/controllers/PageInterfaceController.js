const user = require('../models/User');
const pageInterface = require('../models/PageInterface');
const removeFile = require('../../util/removefile');
var fs = require('fs');
var appRoot = require('app-root-path');

class PageInterfaceController {
    index(req, res, next) {
        // console.log(req.data);

        return res.json({
            message: 'error',
        });
    }
    allImage(req, res, next) {
        const dbName = req.dbName;

        pageInterface.allImage(dbName, (err, results, fields) => {
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
    fixAllImage(req, res, next) {
        const dbName = req.dbName;

        pageInterface.fixAllImage(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                // console.log('ok');
                let rows = results.map((row) => {
                    return row;
                });
                rows.forEach((img) => {
                    const url = img?.thumbnail;
                    const id = img?.id;
                    const newUrl = url?.replace('daily3.intern.midvietnam.com', 'taixecongnghe.com');
                    console.log(newUrl);
                    pageInterface.fixAllImageUpdate(dbName, { id, newUrl }, () => {});
                });
                // res.status(200).json({
                //     status: 1,
                //     data: rows,
                // });
            }
        });
    }
    getCv(req, res, next) {
        const dbName = req.dbName;

        pageInterface.getRecruitmentAll(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                // console.log('ok');
                let recruitmentRows = results.map((row) => {
                    return row;
                });

                pageInterface.getCv(dbName, (err, results, fields) => {
                    if (err) {
                        res.json({
                            status: 0,
                        });
                    } else {
                        // console.log('ok');
                        let cvRows = results.map((row) => {
                            return row;
                        });
                        // console.log(cvRows);
                        cvRows.forEach((cv) => {
                            const recruitmentTarget = recruitmentRows.find(
                                (recruitment) => Number(recruitment.id) === Number(cv.recruitment_id),
                            );
                            cv.recruitment = recruitmentTarget;
                        });

                        res.status(200).json({
                            status: 1,
                            data: cvRows,
                        });
                    }
                });
            }
        });
    }
    themeUpdate(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        pageInterface.themeUpdate(dbName, data, (err, results, fields) => {
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
    updateAdvertisement(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        pageInterface.updateAdvertisement(dbName, data, (err, results, fields) => {
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
    uploadImage(req, res, next) {
        const data = req.body;
        // console.log(req.file);
        // console.log(req.file);
        const dbName = req.dbName;

        if (req.file) {
            // data.image = process.env.SERVER_DOMAIN + 'interface/' + req.file.filename;
            // data.image = 'https://' + req.reqDomain + '/static/images/interface/' + req.file.filename;
            data.image = '/static/images/interface/' + req.file.filename;
        }
        // console.log(data);
        pageInterface.uploadImage(dbName, data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                // console.log('ok');
                res.status(200).json({
                    status: 1,
                    imgUrl: data.image,
                });
            }
        });
    }
    deleteImage(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;
        // const path_ = appRoot + '/src/public/images/interface/' + data.path;

        const id_List = Object.keys(data);
        const path_List = id_List.map((id) => appRoot + '/src/public/images/' + data[id]);

        // console.log(id_List);
        // console.log(path_List);

        removeFile(path_List, id_List, (error, success) => {
            if (success.length === 0) {
                return res.json({
                    status: 0,
                });
            }
            pageInterface.deleteImage(dbName, success, (err, results, fields) => {
                if (error.length !== 0) {
                    res.json({
                        status: 0,
                    });
                } else {
                    res.status(200).json({
                        status: 1,
                    });
                }
            });
        });
    }
    seoInforUpdate(req, res, next) {
        const dbName = req.dbName;
        const data = req.body;

        pageInterface.seoUpdate(dbName, data, (err, results, fields) => {
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
    inforUpdate(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        if (req.file) {
            data.logo = '/static/images/logo/' + req.file.filename;
        }
        // console.log(data);
        pageInterface.basicInforUpdate(dbName, data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                if (req.file) {
                    pageInterface.addImage(dbName, data, (err, results, fields) => {});
                }
                pageInterface.adressUpdate(dbName, data, (err, results, fields) => {
                    if (err) {
                        res.json({
                            status: 0,
                        });
                    } else {
                        pageInterface.emailUpdate(dbName, data, (err, results, fields) => {
                            if (err) {
                                res.json({
                                    status: 0,
                                });
                            } else {
                                pageInterface.phoneUpdate(dbName, data, (err, results, fields) => {
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
                        });
                    }
                });
            }
        });
    }

    getHomeView(req, res, next) {
        const dbName = req.dbName;

        pageInterface.getDataHomePage(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const cateRows = results[0].map((row) => {
                    return row;
                });

                res.status(200).json(cateRows);
            }
        });
    }
    getTheme(req, res, next) {
        const dbName = req.dbName;

        pageInterface.getTheme(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const themeRows = results.map((row) => {
                    return row;
                });

                res.status(200).json(themeRows);
            }
        });
    }
    getMainInforMation(req, res, next) {
        const dbName = req.dbName;

        pageInterface.getMainInforMation(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const inforRows = results[0].map((row) => {
                    return row;
                });
                const adRows = results[1].map((row) => {
                    return row;
                });

                const emailRows = results[2].map((row) => {
                    return row;
                });
                const phoneRows = results[3].map((row) => {
                    return row;
                });
                inforRows[0]['address'] = adRows;
                inforRows[0]['phone'] = phoneRows;
                inforRows[0]['email'] = emailRows;

                res.status(200).json(inforRows);
            }
        });
    }
    getServiceContent(req, res, next) {
        const dbName = req.dbName;

        pageInterface.getServiceContent(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const serviceRows = results.map((row) => {
                    return row;
                });

                res.status(200).json(serviceRows);
            }
        });
    }
    getNewsContent(req, res, next) {
        const dbName = req.dbName;

        pageInterface.getNewsContent(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const newsRows = results.map((row) => {
                    return row;
                });

                res.status(200).json(newsRows);
            }
        });
    }
    getRecrContent(req, res, next) {
        const dbName = req.dbName;

        pageInterface.getRecrContent(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const recrRows = results.map((row) => {
                    return row;
                });

                res.status(200).json(recrRows);
            }
        });
    }

    getAdvertisement(req, res, next) {
        const dbName = req.dbName;

        pageInterface.getAdvertisement(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const advRows = results.map((row) => {
                    return row;
                });

                res.status(200).json(advRows);
            }
        });
    }

    getPolicys(req, res, next) {
        const dbName = req.dbName;

        pageInterface.getPolicys(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                const policysRows = results.map((row) => {
                    return row;
                });

                res.status(200).json(policysRows);

                console.log(policysRows);
            }
        });
    }
    updatePolicys(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;

        pageInterface.updatePolicys(dbName, data, (err, results, fields) => {
            if (err) {
                console.log("err", err);
                
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

module.exports = new PageInterfaceController();
