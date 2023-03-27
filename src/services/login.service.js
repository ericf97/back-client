const bcrypt = require('bcrypt');
const loginDao = require('../dao/login.dao');
const userDao = require('../dao/user.dao');

const login = {};

login.create = async (nick, pass, userId) => {

  const nickExists = await loginDao.getByNick(nick);
  const userExists = await userDao.getById(userId);

  if(nickExists) throw { error: 'user nick already exists' }
  if(!userExists) throw { error: 'user not exists' }

  const salt = await bcrypt.genSalt(10);
  const passcrypt = await bcrypt.hash(pass, salt);
  const auth = await loginDao.create(nick, passcrypt);
  console.log(auth);
  return userDao.updateAuth(userId, auth.recordset[0].authId)
}

login.login = async(nick, pass ) => {

  const userExist = await loginDao.getByNick(nick);

  if (userExist) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(pass, userExist.pass);
    if (validPassword) {
      return { message: "Valid password", user: userExist};
    } else {
      throw { error: "Invalid Password" };
    }
  } else {
    throw { error: "User does not exist" };
  }

}

module.exports = login;
