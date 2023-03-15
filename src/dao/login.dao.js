const dbClient = require('../utils/dbClient');
const {NVarChar} = require('mssql');
const loginDao = {};

loginDao.create = async (nick, pass) => {
  const client = await dbClient();
  const request = client.request();

  request.input('nick', NVarChar, nick);
  request.input('pass', NVarChar, pass);

  return request.query('insert into auth output inserted.authId values(@nick, @pass)');
}

loginDao.getByNick = async (nick) => {
  const client = await dbClient();
  const request = client.request();

  request.input('nick', NVarChar, nick);

  const result = await request.query('select a.*, r.name as roleName from auth a join roles r on r.roleId = a.roleId where a.nick = @nick');

  return result.recordset[0];
}

module.exports = loginDao;
