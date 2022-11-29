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

  const userSaved = await userDao.create(name, lastName, email, phone, addressUser);
  const caseSaved = await caseDao.save(userSaved.userId, nameEnterprise, amountLost, 1); //1 means stateId initial
  await depositDao.save(caseSaved.caseId, +amountLost, moneyType, depositType, dateDeposit);
}

caseService.getAll = async() => {
  return caseDao.getAll();
}

caseService.edit = async (request) => {
  let {
    caseId,
    userId,
    name,
    lastName,
    email,
    phone,
    addressUser,
    nameEnterprise,
    amountLost,
    moneyType,
    depositType,//paypal, cash, deposit bank, crypto
    stateId,
    dateDeposit} = request;

  const caseExists = await caseService.getById(caseId);
  const userExists = await userService.getById(userId);

  if(!caseExists) {
    throw new Error('case does not exists');
  }

  if(!userExists) {
    throw new Error('user does not exists');
  }

  !nameEnterprise ? nameEnterprise = caseExists.nameEnterprise : nameEnterprise;
  !amountLost ? amountLost = caseExists.amountLost : amountLost;
  !stateId ? stateId = caseExists.stateId : stateId;

  !name ? name = userExists.name : name;
  !lastName ? lastName = userExists.lastName : lastName;
  !email ? email = userExists.email : email;
  !phone ? phone = userExists.phone : phone;
  !addressUser ? addressUser = userExists.addressUser : addressUser;

  await caseDao.edit(caseId, nameEnterprise, amountLost, stateId);

  await userDao.save(userId, name, lastName, email, phone, addressUser);

}

caseService.getStates = caseDao.getStates;

caseService.getById = caseDao.getById;

module.exports = caseService;
