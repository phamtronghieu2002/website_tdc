const express = require('express');
const router = express.Router();
const news = require('../../app/controllers/page/NewsController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/trang/:slug', getBasicInforMiddleWare, news.paging);
router.get('/trang/:lang/:slug', getBasicInforMiddleWare, news.paging);
router.get('/:lang/:slug', getBasicInforMiddleWare, news.slug);
router.get('/:lang', getBasicInforMiddleWare, news.index);
router.get('/', getBasicInforMiddleWare, news.index);

module.exports = router;
