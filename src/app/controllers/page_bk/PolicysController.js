const pageInterface = require('../../models/PageInterface');

class PolicysController {
    index(req, res, next) {
        const dbName = req.dbName;
        const inforBasicPage = req.inforBasicPage;
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }
        const template_id = inforBasicPage.companyInfor.information[0].template_id || '';

        pageInterface.getDataPolicysPage(dbName, (err, results, fields) => {
            if (err) {
                return res.render('error', {
                    title: 'ERROR',
                    active: -1,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                });
            } else {
                const contentRows = results.map((row) => {
                    return row;
                });

                const address = JSON.stringify(inforBasicPage.companyInfor);
                const dataP = JSON.stringify(contentRows);
                // console.log(dataP);

                return res.render('policys' + template_id, {
                    title: 'Chính sách',
                    layout: 'main' + template_id,
                    style: 'policys' + template_id,
                    active: -1,
                    content: contentRows,
                    dataP: dataP,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    cI: address,
                });
            }
        });
    }
}

module.exports = new PolicysController();
