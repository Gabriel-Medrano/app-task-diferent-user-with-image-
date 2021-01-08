const {Router} = require('express');
const router = Router();

const publicCtrl = require('../controllers/public.controller');

//routes
router.get('/about',publicCtrl.viewAbout);
router.get('/contact',publicCtrl.viewContact);
router.get('/polity',publicCtrl.viewPolity);

//exports
module.exports = router;