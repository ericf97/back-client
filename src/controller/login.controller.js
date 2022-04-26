const loginService = require('../services/login.service');
const loginController = {};

loginController.create = async (req, res) => {
  try {

    const {nick, pass} = req.body;

    //validate nick login, pass security(special caracters), email was validated on router
    await loginService.create(nick, pass);
    res.status(200).send({ok: 'ok'});
  } catch (error) {
    console.error(error);
    res.status(400).send({...error})
  }
}

loginController.login = async (req, res) => {
  try {

    const {nick, pass} = req.body;
    const result = await loginService.login(nick, pass);
  } catch (error) {
    
  }
}

module.exports = loginController;
