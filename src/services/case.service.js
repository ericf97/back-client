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

caseService.edit = async (request) => {
  const {
    caseId,
    name,
    email,
    phone,
    address,
    enterprise,
    amountLost,
    moneyType,
    depositType,//paypal, cash, deposit bank, crypto
    stateId,
    dateDeposit} = request;
    const caseExists = await caseService.getById(caseId);

    if(!caseExists) {
      throw new Error('case does not exists');
    }

  !enterprise ? enterprise = caseExists.nameEnterprise : enterprise;
  !amountLost ? amountLost = caseExists.amountLost : amountLost;
  !stateId ? stateId = caseExists.stateId : stateId;

  caseDao.edit(caseId, enterprise, amountLost, stateId);
}

caseService.getStates = caseDao.getStates;

caseService.getById = caseDao.getById;

module.exports = caseService;
