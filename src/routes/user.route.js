const {Router} = require('express');
const router = Router();

const userCtrl = require('../controllers/user.controller');

//signup
router.get('/signup',userCtrl.viewFormSignup);
router.post('/signup',userCtrl.signup);
//signin
router.get('/signin',userCtrl.viewFormSignin);
router.post('/signin',userCtrl.signin);
//logout
router.get('/logout',userCtrl.logout);

//exports
module.exports = router;