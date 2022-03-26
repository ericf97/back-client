const formService = require("../services/form.service");

const formController = {};

formController.new = async(req, res, next) => {
  try {
    await formService.save(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = formController;
