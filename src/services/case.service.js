const caseDao = require('../dao/case.dao');
const depositDao = require('../dao/deposit.dao');
const userDao = require('../dao/user.dao');
const userService = require('./user.service');

const caseService = {};

caseService.save = async (request) => {

  let {
    name,
    lastName,
    email,
    phone,
    addressUser,
    nameEnterprise,
    amount,
    moneyType,
    depositType,//paypal, cash, deposit bank, crypto
    dateDeposit,
    country,
    description} = request;

  const user = await userDao.getByEmail(email);

  let userId;

  if (user) {
    userId = user.userId;
  } else {
    const userSaved = await userDao.create(name, lastName, email, phone, addressUser);
    userId = userSaved.userId;
  }

  //logic to depure country
  if(country.indexOf('+') > -1) {
    country = country.split('+')[0];
  }

  const caseSaved = await caseDao.save(userId, nameEnterprise, country, description, 1); //1 means stateId initial
  await depositDao.save(caseSaved.caseId, +amount, moneyType, depositType, dateDeposit);
  console.log('case successfully saved');
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
    // phone,
    // addressUser,
    nameEnterprise,
    amountLost,
    moneyType,
    depositType,//paypal, cash, deposit bank, crypto
    stateId,
    country,
    dateDeposit,
    description} = request;

  const caseExists = await caseService.getById(caseId);

  if(!caseExists) {
    throw new Error('case does not exists');
  }

  const deposit = (await depositDao.getAllByCaseId(caseId))[0];

  if(!deposit) {
    throw new Error('deposit does not exists');
  }

  const userExists = await userService.getById(userId);

  if(!userExists) throw new Error('user does not exists');

  //cases
  !nameEnterprise ? nameEnterprise = caseExists.nameEnterprise : nameEnterprise;
  !stateId ? stateId = caseExists.stateId : stateId;
  !country ? country = caseExists.country : country;
  !description ? description = caseExists.description : description;

  //deposit
  !amountLost ? amountLost = deposit.amount : amountLost;

  //user
  name ? userExists.name = name : false;
  lastName ? userExists.lastName = lastName : false;
  email ? userExists.email = email : false;

  await caseDao.edit(caseId, nameEnterprise, stateId, country, description);

  await depositDao.edit(deposit.depositId, amountLost, deposit.moneyType, deposit.methodType, deposit.dateDeposit);

  await userService.save(userExists);
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
