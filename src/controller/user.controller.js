const userService = require('../services/user.service');

const userController = {};

userController.getAll = async(req, res, next) => {
  try {
    const result = await userService.getAll();

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).send({msg: 'something went wrong'});
  }
}

userController.getById = async(req, res, next) => {
  try {

    const { userId } = req.params;
    const result = await userService.getById(userId);
    res.json(result);

  } catch (error) {
    next(error);
  }
}

module.exports = userController;
