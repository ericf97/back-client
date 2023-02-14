const router = require('express').Router();
const { body } = require('express-validator');
const loginController = require('../controller/login.controller');
const validateRequest = require('../middleware/validate-request.middle');

router
  .post('/singup', [
    body('nick').notEmpty(),
    body('pass').notEmpty(),
    body('userId').notEmpty().isNumeric(),
    validateRequest
  ],
    loginController.create)
  .post('/login', [
    body('nick').notEmpty(),
    body('pass').notEmpty(),
    validateRequest
  ],
    loginController.login);

module.exports = router;
