const fileController = {};
const fileService = require('../services/file.service');

fileController.save = async(req, res, next) => {

  try {

    await fileService.save(req.body);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    throw { error: "something went wrong uploading this file" };
  }
}

fileController.get = async(req, res, next) => {

  try {
    const {caseId} = req.params;

    const directories = await fileService.get(caseId);
    res.json(directories);
  } catch (error) {
    console.log(error);
    throw { error: "something went wrong uploading this file" };
  }
}

fileController.deleteFile = async(req, res, next) => {

  try {
    const {caseId, fileName} = req.params;

    const response = await fileService.deleteFile(caseId, fileName);
    res.status(response);
  } catch (error) {
    console.log(error);
    throw { error: "something went wrong getting this file" };
  }
}
module.exports = fileController;
