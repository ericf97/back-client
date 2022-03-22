const { validationResult } = require("express-validator");

const validate = (req, res, next) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    throw errors;
  }

  next();
}

module.exports = validate;