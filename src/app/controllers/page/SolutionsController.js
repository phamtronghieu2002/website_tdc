const solutionModel = require('../../models/Solutions');

class SolutionsController {
    index(req, res, next) {
        
        
        const dbName = req.dbName;
        const inforBasicPage = req.inforBasicPage;
        const template_id = inforBasicPage.companyInfor.information[0].template_id || '';
        if (!inforBasicPage || !dbName) {
            return res.send('Opp!, Có gì đó không ổn! </br>Có vẻ như domain hiện tại không tồn tại source.');
        }


        solutionModel.getAllSolutions(dbName, (err, results, fields) => {
            if (err) {
                res.render('error');
            } else {
           
             
                results.forEach(sol => {
                    sol.images = sol.images.split(',')
                });
                // if (solutionsRow.length === 0) {
                //     return res.render('error', {
                //         title: 'ERROR',
                //         active: 1,
                //         root: inforBasicPage.root,
                //         companyInfor: inforBasicPage.companyInfor,
                //     });
                // }
     
                
                return res.render('solutions' + template_id, {
                    title: 'giải pháp',
                    layout: 'main' + template_id,
                    style: 'solutions' + template_id,
                    classwrapper: 'page',
                    active: 3,
                    root: inforBasicPage.root,
                    companyInfor: inforBasicPage.companyInfor,
                    solutions:JSON.stringify(results)
                   
                });
            }
        });
    }
}

module.exports = new SolutionsController();
