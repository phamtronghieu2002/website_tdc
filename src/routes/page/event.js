const express = require('express');
const router = express.Router();
const home = require('../../app/controllers/page/HomeController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/thu-moi-tham-gia-khai-truong', getBasicInforMiddleWare, home.grandOpeningEvent);

module.exports = router;
