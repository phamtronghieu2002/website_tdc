const pageInterface = require('../../models/PageInterface');
const tools = require("..//..//..//util/tools");
class AdminController {
  async  index(req, res, next) {
    
        return res.render('admin', {
            layout: 'admin',
            title: 'Admin',
            agencysImagesHandle:JSON.stringify( await tools.getImagesFromDirectory(tools.agencys_img_folder)),
        });
    }
    login(req, res, next) {
        return res.render('adminLogin', {
            layout: 'adminLogin',
            title: 'Admin - Login',
        });
    }
}

module.exports = new AdminController();
