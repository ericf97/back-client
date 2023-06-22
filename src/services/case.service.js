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
    dateDeposit,
    country,
    comments} = request;

  const user = await userDao.getByEmail(email);

  let userId;

  if (user) {
    userId = user.userId;
  } else {
    const userSaved = await userDao.create(name, lastName, email, phone, addressUser);
    userId = userSaved.userId;
  }

  const caseSaved = await caseDao.save(userId, nameEnterprise, country, comments, 1); //1 means stateId initial
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
    dateDeposit,
    comments} = request;

  const caseExists = await caseService.getById(caseId);
  // const userExists = await userService.getById(userId);

  if(!caseExists) {
    throw new Error('case does not exists');
  }

  const deposit = (await depositDao.getAllByCaseId(caseId))[0];

  if(!deposit) {
    throw new Error('deposit does not exists');
  }

  //cases
  !nameEnterprise ? nameEnterprise = caseExists.nameEnterprise : nameEnterprise;
  !stateId ? stateId = caseExists.stateId : stateId;
  !country ? country = caseExists.country : country;
  !comments ? comments = caseExists.comments : comments;

  //deposit
  !amountLost ? amountLost = deposit.amount : amountLost;

  await caseDao.edit(caseId, nameEnterprise, stateId, country, comments);

  await depositDao.edit(deposit.depositId, amountLost, deposit.moneyType, deposit.methodType, deposit.dateDeposit);

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
