const pageInterface = require('../../models/PageInterface');

class RecrController {
    index(req, res, next) {
        const dbName = req.dbName;
        const inforBasicPage = req.inforBasicPage;
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }
        const template_id = inforBasicPage.companyInfor.information[0].template_id || '';

        // console.log(req.data);
        pageInterface.getDataRecrPage(dbName, (err, results, fields) => {
            if (err) {
                return res.render('error', {
                    title: 'ERROR',
                    active: 1,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                });
            } else {
                const recrRows = results.map((row) => {
                    return row;
                });

                return res.render('recr' + template_id, {
                    title: 'Tuyển dụng',
                    layout: 'main' + template_id,
                    style: 'recr' + template_id,
                    active: 4,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    recrs: recrRows,
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
        pageInterface.getDataRecrDetailPage(dbName, slug, (err, results, fields) => {
            if (err) {
                res.render('error');
            } else {
                const recrRows = results[0].map((row) => {
                    return row;
                });
                const recrsRows = results[1].map((row) => {
                    return row;
                });

                if (recrRows.length === 0) {
                    return res.render('error', {
                        title: 'ERROR',
                        active: 4,
                        root: inforBasicPage.root,
                        companyInfor: inforBasicPage.companyInfor,
                    });
                }

                recrsRows.forEach((row) => {
                    row.active = recrRows[0].id;
                });

                return res.render('recrDetail' + template_id, {
                    layout: 'main' + template_id,
                    title: recrRows[0].title,
                    style: 'recrDetail' + template_id,
                    active: 4,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    recr: recrRows[0],
                    recrs: recrsRows,
                });
            }
        });
    }
}

module.exports = new RecrController();
