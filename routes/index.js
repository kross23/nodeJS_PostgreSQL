const Router = require('express')
const router = new Router();

const userRouter = require('./user.routes');
const postRouter = require('./post.routes');
//const testRouter = require('./test.routes');
router.use('/user', userRouter)

router.use('/post', postRouter);

//router.use('/', testRouter);
module.exports = router;




