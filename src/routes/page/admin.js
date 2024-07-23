const express = require('express');
const router = express.Router();
const admin = require('../../app/controllers/page/AdminController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/', admin.index);
router.get('/login', admin.login);

module.exports = router;
