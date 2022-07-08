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


module.exports = fileController;