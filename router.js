const { Router } = require("express");
const userRoutes = require('./src/router/user.router');

const router = Router();

router.use('/', userRoutes);

module.exports = router;
