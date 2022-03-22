const bcrypt = require('bcrypt');
const loginDao = require('../dao/login.dao');

const login = {};

login.create = async (nick, pass, email) => {

  await loginDao.create(nick, pass, email);
}

module.exports = login;
