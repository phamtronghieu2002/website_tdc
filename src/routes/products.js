const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');
const auth_token = require('../util/auth');
const validProductMidleWare = require('../util/upload/file/image/product');

router.post('/update/category', auth_token.post([-1, 0, 1, 2]), productController.updateCategory);
router.post('/add', auth_token.post([-1, 0, 1, 2]), productController.add);
router.post('/category/add', auth_token.post([-1, 0, 1, 2]), productController.addCategory);
router.post('/category/sort', auth_token.post([-1, 0, 1, 2, 3]), productController.sortCategory);
router.post('/update', auth_token.post([-1, 0, 1, 2]), productController.update);

// get API
router.get('/productsadmin', productController.getProductAdmin);
router.get('/category', productController.getAllCategory);

// router.get('/changeimage', productController.changeImage);

module.exports = router;
