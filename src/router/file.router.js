const fileController = require('../controller/file.controller');
const { body, param } = require('express-validator');
const validateRequest = require('../middleware/validate-request.middle');

const router = require('express').Router();

router
    .post('/', [
        body('idUser'),
        validateRequest
    ], fileController.save)
    .get('/:caseId', [
        param('caseId'),
        validateRequest
    ], fileController.get);

module.exports = router;
