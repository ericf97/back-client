const caseDao = require('../dao/case.dao');
const depositDao = require('../dao/deposit.dao');
const userDao = require('../dao/user.dao');

const caseService = {};

caseService.save = async (request) => {

  const {
    name,
    email,
    phone,
    address,
    enterprise,
    amountLost,
    moneyType,
    depositType,//paypal, cash, deposit bank, crypto
    dateDeposit} = request;

  const userSaved = await userDao.create(name, '', email, phone, address);

  const caseSaved = await caseDao.save(userSaved.userId, enterprise, amountLost, 1); //1 means stateId initial

  await depositDao.save(caseSaved.caseId, +amountLost, moneyType, depositType, dateDeposit);
}

caseService.getAll = async() => {
  return caseDao.getAll();
}

caseService.getById = caseDao.getById;

module.exports = caseService;
