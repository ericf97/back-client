const dbClient = require('../utils/dbClient');
const { NVarChar, Int, Decimal, DateTime } = require('mssql');
const caseDao = {};

caseDao.save = async (userId, nameEnterprise, country, description, stateId) => {
  const client = await dbClient();
  const request = client.request();

  request.input('user_id', Int, userId);
  request.input('name_enterprise', NVarChar, nameEnterprise);
  request.input('state_id', Int, stateId);
  request.input('country', NVarChar, country);
  request.input('description', NVarChar, description);
  request.input('date_saved', DateTime, new Date());

  const result = await request.query('insert into cases output inserted.caseId values(@name_enterprise, @state_id, @user_id, @country, @description, @date_saved)');

  return result.recordset[0];
}

caseDao.getAllByUserId = async (userId) => {
  const client = await dbClient();
  const request = client.request();

  request.input('user_id', Int, userId);
  const result = await request.query(
    `select C.*, S.nameState, S.percentage, U.name, U.lastName, U.phone, U.email, U.addressUser, D.amount, D.moneyType, D.methodType, D.dateDeposit, U.authId
     from cases C
     join states S on S.stateId = C.stateId
     join users U on C.userId = U.userId
     join deposit D on D.caseId = C.caseId
     where U.userId = @user_id`);

  return result.recordset;
}

caseDao.getAll = async() => {

  const client = await dbClient();
  const request = client.request();

  const result = await request.query(
   `select C.*, S.nameState, S.percentage, U.name, U.lastName, U.phone, U.email, U.addressUser, D.amount, D.moneyType, D.methodType, D.dateDeposit, U.authId
    from cases C
    join states S on S.stateId = C.stateId
    join users U on C.userId = U.userId
    join deposit D on D.caseId = C.caseId`);

  return result.recordset;
}

caseDao.getById = async(caseId) => {
  const client = await dbClient();
  const request = client.request();
  request.input('case_id', Int, caseId);

  const result = await request.query(`
  select C.*, U.*, D.*, S.nameState
  from cases C
  join users U on U.userId = C.userId
  join deposit D on D.caseId = C.caseId
  join states S on S.stateId = C.stateId
  where C.caseId = @case_id
  `);

  return result.recordset[0];
}

caseDao.edit = async (caseId, nameEnterprise, stateId, country,  description) => {
  const client = await dbClient();
  const request = client.request();
  
  request.input('case_id', Int, caseId);
  request.input('name_enterprise', NVarChar, nameEnterprise);
  request.input('state_id', Int, stateId);
  request.input('country', NVarChar, country);
  request.input('description', NVarChar, description);

  return request.query(`update cases
  set nameEnterprise = @name_enterprise,
  stateId = @state_id,
  country = @country,
  description = @description
  where caseId = @case_id`);
}

caseDao.getStates = async() => {
  const client = await dbClient();
  const request = client.request();
  const result = await request.query('select * from states');

  return result.recordset;
}

module.exports = caseDao;
