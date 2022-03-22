const loginService = require('../services/login.service');
const loginController = {};

loginController.create = async (req, res) => {
  try {

    const {nick, pass, email} = req.body;

    //validate nick loin, pass security(special caracters), email was validated on router
    await loginService.create(nick, pass, email);

  } catch (error) {
    console.error(error);
    res.status(400).send({data: `someting went wrong`})
  }
}

module.exports = loginController;
