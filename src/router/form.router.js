const router = require('express').Router();
const validateRequest = require('../middleware/validate-request.middle');
const { body } = require('express-validator');
const caseController = require('../controller/case.controller');

router
  .post('/', [
    body('name').notEmpty(),
    body('lastName').notEmpty(),
    body('email').exists().isEmail(),
    body('phone'),
    body('addressUser'),
    body('nameEnterprise').notEmpty(),
    body('amount').notEmpty(),
    body('moneyType').notEmpty(),
    body('depositType').notEmpty(),
    body('dateDeposit').notEmpty().isDate(),
    body('country').notEmpty(),
    body('description'),
    validateRequest],
    caseController.new
  )
  .patch('/', [
    body('caseId').notEmpty(),
    body('name').notEmpty(),
    body('lastName').notEmpty(),
    body('nameEnterprise').notEmpty(),
    body('amount').notEmpty(),
    body('stateId').notEmpty().isNumeric(),
    body('country').notEmpty(),
    body('description'),
    validateRequest],
    caseController.edit
  )
  .get('/', caseController.all)
  .get('/:caseId(\\d+)/', caseController.getById)
  .get('/states', caseController.states)
  .get('/user/:userId(\\d+)/', caseController.getByUserId);
module.exports = router;
