const emailControler = require('../controller/email.controller');

const router = require('express').Router();

router.post('/', emailControler.welcome);

module.exports = router;
