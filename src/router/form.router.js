const router = require('express').Router();
const validateRequest = require('../middleware/validate-request.middle');
const { body } = require('express-validator');
const caseController = require('../controller/case.controller');

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
    caseController.new
  )
  .get('/', caseController.all)
  .get('/:caseId', caseController.getById)

module.exports = router;
