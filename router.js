const { Router } = require("express");
const routes = require('./src/router');

const router = Router();

router.use('/api', routes);

module.exports = router;
