const fileController = require('../controller/file.controller');
const { body } = require('express-validator');
const validateRequest = require('../middleware/validate-request.middle');

const router = require('express').Router();

router
    .post('/', [
        body('idUser'),
        validateRequest
    ], userController.save)

module.exports = router;
