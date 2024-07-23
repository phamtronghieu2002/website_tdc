const express = require('express');
const router = express.Router();
const authControllers = require('../app/controllers/AuthController');
const auth_token = require('../util/auth');

router.post('/login/admin', authControllers.adminAuth);
router.post('/login', authControllers.login);
router.get('/checklogin', auth_token.get([-1, 0, 1, 2, 3, 4, 5]), authControllers.checkLogin);
router.get('/checklogin/admin', auth_token.get([-1, 0, 1, 2, 3]), authControllers.checkLogin);
router.post('/change/pass', authControllers.changePass);

router.get('/config', auth_token.get([-1, 0, 1, 2, 3]), authControllers.getConfig);
router.post('/config/update', auth_token.post([-1, 0, 1, 2, 3]), authControllers.updateConfig);

router.get('/', authControllers.index);

module.exports = router;
