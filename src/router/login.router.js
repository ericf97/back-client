const router = require('express').Router();
const { body } = require('express-validator');
const loginController = require('../controller/login.controller');
const validateRequest = require('../middleware/validate-request.middle');

router
  .post('/', [
    body('idUser').exists(),
    body('nick').exists(),
    body('pass').exists(),
    body('email').isEmail(),
    validateRequest
  ],
    loginController.create);

module.exports = router;
