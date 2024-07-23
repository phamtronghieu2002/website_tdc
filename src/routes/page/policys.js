const express = require('express');
const router = express.Router();
const policys = require('../../app/controllers/page/PolicysController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/', getBasicInforMiddleWare, policys.index);

module.exports = router;
