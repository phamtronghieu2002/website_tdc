const express = require('express');
const router = express.Router();
const orderController = require('../app/controllers/OrderController');
const auth_token = require('../util/auth');

router.get('/all', auth_token.get([-1, 0, 1, 2]), orderController.allOrder);
router.post('/add', orderController.add);
router.post('/filter', auth_token.post([-1, 0, 1, 2]), orderController.filter);
router.post('/update', auth_token.post([-1, 0, 1, 2]), orderController.update);
router.get('/contact/all', auth_token.post([-1, 0, 1, 2]), orderController.getAllContact);
router.post('/contact', orderController.addContact);

router.post('/event/', orderController.contactEvent);
router.get('/event/all', auth_token.get([-1, 0, 1, 2]), orderController.getAllContactEvent);

module.exports = router;
