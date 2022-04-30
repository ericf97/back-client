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

formController.all = async(req, res, next) => {
  try {
    const result = await formService.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
}
module.exports = formController;
