const express = require('express');
const router = express.Router();
const product = require('../../app/controllers/page/ProductController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/:slug', getBasicInforMiddleWare, product.slug);
router.get('/', getBasicInforMiddleWare, product.index);

module.exports = router;
