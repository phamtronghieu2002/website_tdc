const express = require('express');
const router = express.Router();
const solutions = require('../../app/controllers/page/SolutionsController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/giai-phap/:lang', getBasicInforMiddleWare, solutions.index);
router.get('/giai-phap', getBasicInforMiddleWare, solutions.index);


module.exports = router;
