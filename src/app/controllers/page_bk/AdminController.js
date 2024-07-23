const pageInterface = require('../../models/PageInterface');

class AdminController {
    index(req, res, next) {
        return res.render('admin', {
            layout: 'admin',
            title: 'Admin',
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
