const {Router} = require('express');
const router = Router();

const publicationCtrl = require('../controllers/publication.controller');
const {helperImg} = require('../helpers/compleImg');
const {isAuthenticated} = require('../helpers/compleAuth');

//All
router.get('/',publicationCtrl.viewsAllPublications);
//create
router.get('/createP',isAuthenticated,publicationCtrl.viewFormNewPublication);
router.post('/createP',isAuthenticated,helperImg,publicationCtrl.createPublication);
//Only
router.get('/publication/:id',isAuthenticated,publicationCtrl.viewPublication);
//edit
router.get('/publication/edit/:id',isAuthenticated,publicationCtrl.viewFormEditPublication);
router.post('/publication/edit/:id',isAuthenticated,publicationCtrl.updatePublication);
//remove
router.get('/publication/remove/:id',isAuthenticated,publicationCtrl.removePublication);

//Export
module.exports = router;