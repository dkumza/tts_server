const { getSqlData } = require('../utils/helper');

module.exports.getCommByID = (data) => {
  const sql = 'SELECT * FROM `comments` WHERE `prod_id`=?';

  return getSqlData(sql, data);
};

module.exports.postNewCommByID = (data) => {
  const sql = `
  INSERT INTO comments (comm_author, user_id, comm_context, comm_date, prod_id)
  VALUES (?, ?, ?, ?, ?)
  `;
  return getSqlData(sql, data);
};

module.exports.deleteCommByID = (data) => {
  const sql = 'DELETE FROM comments WHERE comm_id = ? LIMIT 1';
  return getSqlData(sql, data);
};

module.exports.checkSingleCommByID = (data) => {
  const sql = 'SELECT * FROM comments WHERE comm_id = ?';
  return getSqlData(sql, data);
};
