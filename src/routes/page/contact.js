const express = require('express');
const router = express.Router();
const contact = require('../../app/controllers/page/ContactController');
const getBasicInforMiddleWare = require('../../util/middleware/basicInfor');

router.get('/', getBasicInforMiddleWare, contact.index);

module.exports = router;
