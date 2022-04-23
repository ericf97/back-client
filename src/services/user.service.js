const dbClient = require('../utils/dbClient');
const userDao = require('../dao/user.dao');
const caseDao = require('../dao/case.dao');
const depositDao = require('../dao/deposit.dao');

const userService = {};

userService.save = async (user) => {
  try {
    await userDao.save(user);

  } catch (error) {
    throw error;
  }
}

userService.getAll = async () => {
  const users = await userDao.getAll();

  return users;
}

userService.getById = async(userId) => {
  const user = await userDao.getById(userId);

  if(!user) throw {status: 400, msg: 'user not found'}

  const cases = await caseDao.getAllByUserId(userId);

  for (let index = 0; index < cases.length; index++) {

    const caseId = cases[index].caseId;
    const deposits = await depositDao.getAllByCaseId(caseId);

    cases[index].desposits = deposits;
  }

  user.cases = cases;

  return user;
}

module.exports = userService
