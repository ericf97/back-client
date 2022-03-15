const dbClient = require('../utils/dbClient');
const userDao = require('../dao/userDao');

const user = {};

user.save = async (user) => {
  try {
    await userDao.save(user);

  } catch (error) {
    throw error;
  }
}

