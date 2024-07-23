const express = require('express');
const router = express.Router();
const service = require('../../app/controllers/page/ServiceController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/', getBasicInforMiddleWare, service.index);
router.get('/:slug', getBasicInforMiddleWare, service.slug);

module.exports = router;
