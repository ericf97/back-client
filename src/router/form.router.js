const router = require('express').Router();
const validateRequest = require('../middleware/validate-request.middle');
const { body } = require('express-validator');
const formController = require('../controller/form.controller');

router
  .post('/', [
    body('name').notEmpty(),
    body('email').exists().isEmail(),
    body('phone').notEmpty(),
    body('enterprise').notEmpty(),
    body('amountLost').notEmpty(),
    body('moneyType').notEmpty(),
    body('depositType').notEmpty(),
    body('dateDeposit').notEmpty().isDate(),
    validateRequest],
    formController.new
  )
  .get('/', formController.all);

module.exports = router;
