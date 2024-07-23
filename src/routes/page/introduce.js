const express = require('express');
const router = express.Router();
const introduce = require('../../app/controllers/page/IntroduceController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/', getBasicInforMiddleWare, introduce.index);

module.exports = router;
