const userController = require('../controller/user.controller');

const router = require('express').Router();

router
    .get('/', userController.getAll)
    .get('/:userId', userController.getById);

module.exports = router;
