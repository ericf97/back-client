const dbClient = require('../utils/dbClient');
const {NVarChar} = require('mssql');
const userDao = {};

userDao.create = async (name, lastName, email, phone, address) => {
  const client = await dbClient();
  const request = client.request();
  request.input('name', NVarChar, name);
  request.input('last_name', NVarChar, lastName);
  request.input('email', NVarChar, email);
  request.input('phone', NVarChar, phone);
  request.input('address', NVarChar, address)

  const result = await request.query('insert into users output inserted.userId values(@name, @last_name, @email, @phone, @address)');

  return result.recordset[0];
}

module.exports = userDao;
