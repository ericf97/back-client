const dbClient = require('../utils/dbClient');
const { NVarChar, Int, Decimal } = require('mssql');
const caseDao = {};

caseDao.save = async (userId, nameEnterprise, amountLost, stateId) => {
  const client = await dbClient();
  const request = client.request();

  request.input('user_id', Int, userId);
  request.input('name_enterprise', NVarChar, nameEnterprise);
  request.input('amount_lost', Decimal, amountLost);
  request.input('state_id', Int, stateId);

  const result = await request.query('insert into cases output inserted.caseId values(@user_id, @name_enterprise, @amount_lost, @state_id)');

  return result.recordset[0];
}

caseDao.getAllByUserId = async (userId) => {
  const client = await dbClient();
  const request = client.request();

  request.input('user_id', Int, userId);
  const result = await request.query('select * from cases where userId = @user_id');
  return result.recordset;
}

caseDao.getAll = async() => {

  const client = await dbClient();
  const request = client.request();

  const result = await request.query('select C.*, S.nameState from cases C join states S on S.stateId = C.stateId');

  return result.recordset;
}

module.exports = caseDao;
