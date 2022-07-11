const router = require('express').Router(); // Router d'express
const userCtrl = require('../controllers/user_controllers');
const email = require('../middleware/email');
const password = require('../middleware/password');


router.post('/signup', email, password, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;