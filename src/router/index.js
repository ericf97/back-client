const router = require('express').Router();
const errorHandler = require('../middleware/errror-handler.middle');
const loginRouter = require('./login.router');
const formRouter = require('./form.router');
const userRouter = require('./user.router');
const fileRouter = require('./file.router');

router.use('/login', loginRouter);
router.use('/cases', formRouter);
router.use('/user', userRouter);
router.use('/file', fileRouter);

router.use(errorHandler);

module.exports = router;
