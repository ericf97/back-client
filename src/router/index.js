const router = require('express').Router();
const errorHandler = require('../middleware/errror-handler.middle');
const loginRouter = require('./login.router');

router.use('/login', loginRouter);

router.use(errorHandler);

module.exports = router;
