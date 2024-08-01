const pageInterface = require('../../models/PageInterface');

class HomeController {
    index(req, res, next) {
        const dbName = req.dbName;
        const inforBasicPage = req.inforBasicPage;
        const lang = req.params.lang  || 'vi';
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }
        const template_id = inforBasicPage.companyInfor.information[0].template_id || '';

        pageInterface.getDataHomePage(dbName, (err, results, fields) => {
            if (err) {
                return res.render('error', {
                    title: 'ERROR',
                    active: 1,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                });
            } else {
                const contentRows = results.map((row) => {
                    return row;
                });

                const address = JSON.stringify(inforBasicPage.companyInfor);
                return res.render('contact' + template_id, {
                    layout: 'main' + template_id,
                    title: 'Liên hệ',
                    style: 'contact' + template_id,
                    classwrapper: 'page',
                    language: JSON.stringify({lang}),
                    lang,
                    active: 5,
                    content: contentRows,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    cI: address,
                });
            }
        });
    }
}

module.exports = new HomeController();
