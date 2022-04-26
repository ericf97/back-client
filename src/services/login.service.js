const bcrypt = require('bcrypt');
const loginDao = require('../dao/login.dao');
const userDao = require('../dao/user.dao');

const login = {};

login.create = async (nick, pass, email) => {

  const userExist = await loginDao.getByNick(nick);

  if(userExist) throw { error: 'user nick already exists' }

  const salt = await bcrypt.genSalt(10);
  const passcrypt = await bcrypt.hash(pass, salt);
  return loginDao.create(nick, passcrypt, email);
}

login.login = async(nick, pass ) => {

  const userExist = await loginDao.getByNick(nick);
}

module.exports = login;
