const sql = require('mssql');


const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  // pool: {
  //   max: 10,
  //   min: 0,
  //   idleTimeoutMillis: 30000
  // },
  // options: {
  //   encrypt: false, // for azure
  //   trustServerCertificate: false // change to true for local dev / self-signed certs
  // }
}

let connection = null;

const connect = async () => {
  if(connection) return connection;

  return connection = await sql.connect(process.env.CONNECTION_STRING);
}

module.exports = connect;
