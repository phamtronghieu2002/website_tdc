const express = require('express');
const router = express.Router();
const recr = require('../../app/controllers/page/RecrController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/:slug', getBasicInforMiddleWare, recr.slug);
router.get('/', getBasicInforMiddleWare, recr.index);

module.exports = router;
