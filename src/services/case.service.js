const caseDao = require('../dao/case.dao');
const depositDao = require('../dao/deposit.dao');
const userDao = require('../dao/user.dao');
const userService = require('./user.service');

const caseService = {};

caseService.save = async (request) => {

  const {
    name,
    lastName,
    email,
    phone,
    addressUser,
    nameEnterprise,
    amountLost,
    moneyType,
    depositType,//paypal, cash, deposit bank, crypto
    dateDeposit} = request;

  const user = await userDao.getByEmail(email);

  let userId;

  if (user) {
    userId = user.userId;
  } else {
    const userSaved = await userDao.create(name, lastName, email, phone, addressUser);
    userId = userSaved.userId;
  }

  const caseSaved = await caseDao.save(userId, nameEnterprise, amountLost, 1); //1 means stateId initial
  await depositDao.save(caseSaved.caseId, +amountLost, moneyType, depositType, dateDeposit);
}

caseService.getAll = async() => {
  return caseDao.getAll();
}

caseService.edit = async (request) => {
  let {
    caseId,
    // userId,
    // name,
    // lastName,
    // email,
    // phone,
    // addressUser,
    nameEnterprise,
    amountLost,
    moneyType,
    depositType,//paypal, cash, deposit bank, crypto
    stateId,
    country,
    dateDeposit} = request;

  const caseExists = await caseService.getById(caseId);
  // const userExists = await userService.getById(userId);

  if(!caseExists) {
    throw new Error('case does not exists');
  }

  // if(!userExists) {
  //   throw new Error('user does not exists');
  // }

  !nameEnterprise ? nameEnterprise = caseExists.nameEnterprise : nameEnterprise;
  !amountLost ? amountLost = caseExists.amountLost : amountLost;
  !stateId ? stateId = caseExists.stateId : stateId;
  !country ? country = caseExists.country : country;

  // !name ? name = userExists.name : name;
  // !lastName ? lastName = userExists.lastName : lastName;
  // !email ? email = userExists.email : email;
  // !phone ? phone = userExists.phone : phone;
  // !addressUser ? addressUser = userExists.addressUser : addressUser;

  await caseDao.edit(caseId, nameEnterprise, amountLost, stateId, country);

  // await userDao.save(userId, name, lastName, email, phone, addressUser);

}

caseService.getByUserId = async(userId) => {

  const user = await userDao.getById(userId);
  if(!user) {
    throw new Error('user does not exists');
  }
  return caseDao.getAllByUserId(userId);
}

caseService.getStates = caseDao.getStates;

caseService.getById = caseDao.getById;

module.exports = caseService;
