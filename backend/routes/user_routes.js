const router = require('express').Router(); // Router d'express
const userCtrl = require('../controllers/user_controllers');
const email = require('../middleware/email');
const password = require('../middleware/password');
const verifToken = require('../middleware/verifToken')


router.post('/signup', email, password, userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/verifytoken', verifToken)


module.exports = router;