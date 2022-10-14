const caseService = require("../services/case.service");

const caseController = {};

caseController.new = async(req, res, next) => {
  try {
    await caseService.save(req.body);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).send(error);
  }
}

caseController.all = async(req, res, next) => {
  try {
    const result = await caseService.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

caseController.getById = async(req, res, next) => {
  try {
    const {caseId} = req.query;
    const result = await caseService.getById(caseId);
    res.json(result);
  } catch (error) {
    next(error)
  }
}

caseController.edit = async(req, res, next) => {
  try {

    await caseService.edit(req.body);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
}

caseController.states = async (req, res, next) => {

  try {
    const result = await caseService.getStates();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = caseController;
