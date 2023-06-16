const dbClient = require('../utils/dbClient');
const {NVarChar} = require('mssql');
const loginDao = {};

loginDao.create = async (nick, pass) => {
  const client = await dbClient();
  const request = client.request();

  request.input('nick', NVarChar, nick);
  request.input('pass', NVarChar, pass);

  //role id 2 = normal user
  return request.query('insert into auth output inserted.authId values(@nick, @pass, 2)');
}

loginDao.getByNick = async (nick) => {
  const client = await dbClient();
  const request = client.request();

  request.input('nick', NVarChar, nick);

  const result = await request.query('select a.*, r.name as roleName, u.userId from auth a join roles r on r.roleId = a.roleId join users u on u.authId = a.authId where a.nick = @nick');

  return result.recordset[0];
}

module.exports = loginDao;
