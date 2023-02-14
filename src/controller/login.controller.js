const loginService = require('../services/login.service');
const loginController = {};

loginController.create = async (req, res, next) => {
  try {

    const {nick, pass, userId} = req.body;

    //validate nick login, pass security(special caracters), email was validated on router
    await loginService.create(nick, pass, userId);
    res.status(200).send({ok: 'ok'});
  } catch (error) {
    console.error(error);
    next(error);
  }
}

loginController.login = async (req, res, next) => {
  try {

    const {nick, pass} = req.body;
    const result = await loginService.login(nick, pass);
    res.json(result)
  } catch (error) {
    console.error(error);
    next(error);
  }
}

module.exports = loginController;
