const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const { dbConfig, jwtSecret } = require('../cfg');

const pool = mysql.createPool(dbConfig);

async function getSqlData(sql, argArr = []) {
  let connection;
  try {
    connection = await pool.getConnection(); // connecting to DB
    const [rows] = await connection.execute(sql, argArr); // execute task
    return [rows, null];
  } catch (error) {
    console.error('getSqlData', error);
    return [null, error];
  } finally {
    if (connection) connection.release();
  }
}

// async function getSqlDataNoTry(sql, argArr = []) {
//    const connection = await mysql.createConnection(dbConfig);

//    const [rows] = await connection.execute(sql, argArr);
//    if (connection) connection.end();
//    return [rows, null];
// }

function makeJWT(data) {
  return jwt.sign(data, jwtSecret, { expiresIn: '1h' });
}

module.exports = {
  getSqlData,
  makeJWT,
};
