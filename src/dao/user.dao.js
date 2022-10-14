const dbClient = require('../utils/dbClient');
const { NVarChar, Int } = require('mssql');
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

userDao.getAll = async() => {
  const client = await dbClient();
  const request = client.request();

  const result = await request.query('select * from users')
  return result.recordset;
}

userDao.getById = async(userId) => {
  const client = await dbClient();
  const request = client.request();

  request.input('user_id', Int, userId);

  const result = await request.query('select top(1) * from users where userId = @user_id')

  return result.recordset[0];
}

userDao.save = async(userId, name, lastName, email, phone, addressUser) => {
  const client = await dbClient();
  const request = client.request();

  request.input('user_id', Int, userId);
  request.input('name', NVarChar, name);
  request.input('last_name', NVarChar, lastName);
  request.input('email', NVarChar, email);
  request.input('phone', NVarChar, phone);
  request.input('address_user', NVarChar, addressUser);

  return request.query(`
    update users set
    name = @name
    lastName = @last_name
    email = @email
    phone = @phone
    addressUser = @address_user
    where userId = @user_id
  `);
}

module.exports = userDao;
