const dbClient = require('../utils/dbClient');
const { NVarChar, Int, DateTime, Decimal} = require('mssql');
const depositDao = {};

depositDao.save = async (caseId, amount, moneyType, depositType, dateDeposit) => {
  const client = await dbClient();
  const request = client.request();

  request.input('case_id', Int, caseId);
  request.input('amount', Decimal, amount)
  request.input('money_type', NVarChar, moneyType);
  request.input('deposit_type', NVarChar, depositType);
  request.input('date_deposit', DateTime, dateDeposit)

  return request.query('insert into deposit values(@amount, @money_type, @deposit_type, @date_deposit, @case_id)');
}

depositDao.getAllByCaseId = async(caseId) => {
  const client = await dbClient();
  const request = client.request();

  request.input('case_id', Int, caseId);

  const result = await request.query('select * from deposit where caseId = @case_id');

  return result.recordset;
}

module.exports = depositDao;
