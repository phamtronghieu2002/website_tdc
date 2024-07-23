const express = require('express');
const router = express.Router();
const home = require('../../app/controllers/page/HomeController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/huong-dan-kich-hoat-thiet-bi', getBasicInforMiddleWare, home.guide);

module.exports = router;
