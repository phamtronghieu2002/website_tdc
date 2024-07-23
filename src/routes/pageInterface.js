const express = require('express');
const router = express.Router();
const PageInterfaceController = require('../app/controllers/PageInterfaceController');
const auth_token = require('../util/auth');
const validLogoMidleWare = require('../util/upload/file/image/logo');
const validImgMidleWare = require('../util/upload/file/image/interface');

router.get('/', auth_token.get([1]), PageInterfaceController.index);
router.post('/theme/update', auth_token.post([-1, 0, 1, 3]), PageInterfaceController.themeUpdate);
router.post('/infor/update', auth_token.post([-1, 0, 1, 3]), validLogoMidleWare, PageInterfaceController.inforUpdate);
router.get('/image/all', auth_token.get([-1, 0, 1, 2, 3]), PageInterfaceController.allImage);
router.post('/image/upload', auth_token.post([-1, 0, 1, 2, 3]), validImgMidleWare, PageInterfaceController.uploadImage);
router.post('/image/delete', auth_token.post([-1, 0, 1, 2, 3]), PageInterfaceController.deleteImage);
router.post('/seo/update', auth_token.post([-1, 0, 1, 2]), PageInterfaceController.seoInforUpdate);
router.get('/recruitment/cv/all', auth_token.get([-1, 0, 1, 2]), PageInterfaceController.getCv);
router.post('/advertisement/update', auth_token.post([-1, 0, 1, 2, 3]), PageInterfaceController.updateAdvertisement);
router.post('/policys/update', auth_token.post([-1, 0, 1, 2, 3]), PageInterfaceController.updatePolicys);

router.get('/content/home', PageInterfaceController.getHomeView);
router.get('/theme/', PageInterfaceController.getTheme);
router.get('/infor/', PageInterfaceController.getMainInforMation);
router.get('/service/', PageInterfaceController.getServiceContent);
router.get('/news/', PageInterfaceController.getNewsContent);
router.get('/recr/', PageInterfaceController.getRecrContent);
router.get('/advertisement/', PageInterfaceController.getAdvertisement);
router.get('/policys/', PageInterfaceController.getPolicys);

// router.get('/fix/image', PageInterfaceController.fixAllImage);

module.exports = router;
