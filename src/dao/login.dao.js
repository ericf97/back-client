const dbClient = require('../utils/dbClient');
const {NVarChar} = require('mssql');
const loginDao = {};

loginDao.create = async (idUser, nick, pass, email) => {
  const client = await dbClient();
  const request = client.request();
  request.input('id_user', NVarChar, idUser);
  request.input('nick', NVarChar, nick);
  request.input('pass', NVarChar, pass);
  request.input('email', NVarChar, email);

  return request.query('insert into login values(@id_user, @nick, @pass, @email)');
}

module.exports = loginDao;
