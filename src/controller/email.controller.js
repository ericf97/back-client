const emailService = require('../services/email.service');

const emailController = {};

emailController.welcome = async(req, res, next) => {

  const {emailTo, user, pass} = req.body;

  try {
    await emailService.welcome(emailTo, user, pass);
    res.json('ok');
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = emailController;
