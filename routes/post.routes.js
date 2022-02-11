const Router = require('express');
const router = new Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create',authMiddleware, postController.createPost);
router.get('/all',authMiddleware,  postController.getPostAll);
router.delete('/', authMiddleware,  postController.delitePost);
router.put('/', authMiddleware , postController.putPost);


module.exports = router;