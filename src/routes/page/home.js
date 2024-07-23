const express = require('express');
const router = express.Router();
const home = require('../../app/controllers/page/HomeController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/', getBasicInforMiddleWare, home.index);

module.exports = router;
