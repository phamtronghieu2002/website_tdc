const pageInterface = require('../../models/PageInterface');

class ServiceController {
    index(req, res, next) {
        const dbName = req.dbName;
        const inforBasicPage = req.inforBasicPage;
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }
        const template_id = inforBasicPage.companyInfor.information[0].template_id || '';

        // console.log(req.data);
        pageInterface.getDataServicePage(dbName, (err, results, fields) => {
            if (err) {
                res.render('error');
            } else {
                const serviceRows = results.map((row) => {
                    return row;
                });
                return res.render('service' + template_id, {
                    title: 'Dịch vụ',
                    layout: 'main' + template_id,
                    style: 'service' + template_id,
                    active: 2,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    services: serviceRows,
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

        const template_id = inforBasicPage.companyInfor.information[0].template_id || '';

        const slug = req.params.slug;
        pageInterface.getDataServiceDetailPage(dbName, slug, (err, results, fields) => {
            if (err) {
                res.render('error');
            } else {
                const serviceRows = results.map((row) => {
                    return row;
                });

                if (serviceRows.length === 0) {
                    return res.render('error', {
                        title: 'ERROR',
                        active: 2,
                        root: inforBasicPage.root,
                        companyInfor: inforBasicPage.companyInfor,
                    });
                }

                return res.render('serviceDetail' + template_id, {
                    layout: 'main' + template_id,
                    title: serviceRows[0].name,
                    style: 'service' + template_id,
                    active: 2,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    service: serviceRows[0],
                });
            }
        });
    }
}

module.exports = new ServiceController();
