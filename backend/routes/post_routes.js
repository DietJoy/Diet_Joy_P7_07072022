const router = require('express').Router(); // Router d'express

const postCrtl = require('../controllers/post_controllers');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//les routes :

router.post('/', auth, multer, postCrtl.createPost);
router.get('/:id', auth, postCrtl.getOnePost);
router.get('/', auth, postCrtl.getAllPosts);


module.exports = router;