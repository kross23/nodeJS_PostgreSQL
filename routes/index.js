const Router = require('express')
const router = new Router();

const userRouter = require('./user.routes');
const postRouter = require('./post.routes');

router.use('/user', userRouter)

router.use('/post', postRouter);

module.exports = router;




