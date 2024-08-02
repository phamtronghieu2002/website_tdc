const express = require('express');
const router = express.Router();
const policys = require('../../app/controllers/page/PolicysController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/:id', getBasicInforMiddleWare, policys.index);
router.get('/:lang/:id', getBasicInforMiddleWare, policys.index);
module.exports = router;
