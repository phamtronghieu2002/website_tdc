const express = require('express');
const router = express.Router();
const order = require('../../app/controllers/page/OrderController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/', getBasicInforMiddleWare, order.index);

module.exports = router;
