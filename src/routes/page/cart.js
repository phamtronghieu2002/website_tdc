const express = require('express');
const router = express.Router();
const cart = require('../../app/controllers/page/CartController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/', getBasicInforMiddleWare, cart.index);

module.exports = router;
