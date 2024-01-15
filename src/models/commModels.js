const { getSqlData } = require('../utils/helper');

module.exports.getCommByID = (data) => {
  const sql = 'SELECT * FROM `comments` WHERE `prod_id`=?';

  return getSqlData(sql, data);
};

module.exports.postNewCommByID = (data) => {
  const sql = 'INSERT INTO `comments` (`comm_author`, `comm_context`, `prod_id`) VALUES (?, ?, ?)';
  return getSqlData(sql, data);
};
