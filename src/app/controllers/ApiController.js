const user = require('../models/User');
const content = require('../models/Content');
const tools = require('../../util/tools');
const transporter = require('../../util/sendMail');
const cloundianryTool = require('../../util/cloudianary');
class ApiController {

      updateRegisterSolution(req, res, next){
        const dbName = req.dbName;
        const data = req.body;
        user.updateRegisterSolutions(dbName,data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                res.status(200).json({
                    status: 1,
                    data: results,
                });
            }
        });
    }
    getRegisterSolution(req, res, next){
        const dbName = req.dbName;
        user.getRegisterSolutions(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                res.status(200).json({
                    status: 1,
                    data: results,
                });
            }
        });
    }
    registerSolution(req, res, next) {
        const dbName = req.dbName;
        const data = req.body;
        user.insertRegisterSolutions(dbName, data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                res.status(200).json({
                    status: 1,
                    data: results,
                });
            }
        });
    }
    sendMail(req, res, next) {

        const dbName = req.dbName;
        user.getMail(dbName, async(err, results, fields) => {
            const data = req.body;
            const emails = results.map((row) => row.email).toString();
            const host = req.get('host');
            data.host = host;
            try {
               const base64 = await cloundianryTool.convertImageUrlToBase64(data.img);
               const base64Image = `data:image/png;base64,${base64}`;
               console.log("base64Image", base64Image);
               const result = await cloundianryTool.uploadBase64Image(base64Image);
               data.img= result.url; 
                const mailOptions = {
                    from: 'tdxGroup@gmail.com',
                    to: emails,
                    subject: 'Thông báo từ tdxGroup',
                    template: 'index',
                    context:data
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log("loi khi send mail ",error);
              
                        return res.status(500).json({
                            message: 'Error when send mail',
                        });
                    } else {
                   

                        return res.status(200).json({
                            message: 'Send mail success',
                        });
                    }
                });
                
              
            } catch (error) {
                console.log("loi khi send mail ",error);
                return res.status(500).json({
                    message: 'Error when send mail',
                });
            }

        });

    }
    
    saveEmail(req, res, next) {
        const dbName = req.dbName;
        const data = req.body;
        user.insertEmail(dbName, data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                res.status(200).json({
                    status: 1,
                    data: results,
                });
            }
        });
    }

    getMail(req, res, next) {
        const dbName = req.dbName;

        user.getMail(dbName, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                res.status(200).json({
                    status: 1,
                    data: results,
                });
            }
        });
    }
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
        const slug_en = tools.removeAccents(data.title_en).toLowerCase() + '-' + Math.floor(Math.random() * 1000000);
        const slug_vi = tools.removeAccents(data.title).toLowerCase() + '-' + Math.floor(Math.random() * 1000000);
        data.slug_en = slug_en;
        data.slug = slug_vi;
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
        const slug_en = tools.removeAccents(data.title_en).toLowerCase() + '-' + Math.floor(Math.random() * 1000000);
        data.slug = slug;
        data.slug_en = slug_en;
        content.addNews(dbName, data, (err, results, fields) => {
            if (err) {
                res.json({
                    status: 0,
                });
            } else {
                // console.log('ok');
                res.status(200).json({
                    status: 1,
                    slug,
                    slug_en
                });
            }
        });
    }
    addPolicys(req, res, next) {
        const data = req.body;
        const dbName = req.dbName;
        // data.dbName = dbName;
        if (data.title) {
            console.log(data.title);
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
        if (data.title_en) {
            console.log(data.title_en);
            const slug =
                tools.removeAccents(data.title_en).toLowerCase().replaceAll(' ', '-').replaceAll('/', '-') +
                '-' +
                Math.floor(Math.random() * 1000000);
            data.name_en = slug;
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
