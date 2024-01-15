const { getSqlData } = require('../utils/helper');

module.exports.getAllProducts = () => {
  // const sql = 'SELECT * FROM all_ads';
  const sql = `
     SELECT all_ads.id, all_ads.cat_id, all_ads.title, all_ads.username, all_ads.content, all_ads.date, all_ads.price, all_ads.p_condition,
     categories.cat_name AS cat_name
     FROM all_ads
     JOIN categories
     ON all_ads.cat_id=categories.cat_id
     GROUP BY all_ads.id
     `;

  return getSqlData(sql);
};

module.exports.createProduct = (data) => {
  const sql = `
  INSERT INTO all_ads (title, username, date, content, cat_id, price, p_condition) 
  VALUES (?,?,?,?,?,?,?)
  `;

  return getSqlData(sql, data);
};

module.exports.getSingleProduct = (data) => {
  const sql = `
     SELECT all_ads.id, all_ads.cat_id, all_ads.title, all_ads.username, all_ads.content, all_ads.date, all_ads.price, all_ads.p_condition,
     categories.cat_name AS cat_name
     FROM all_ads
     JOIN categories
     ON all_ads.cat_id=categories.cat_id
     WHERE all_ads.id = ?
     GROUP BY all_ads.id
     `;

  return getSqlData(sql, data);
};

module.exports.deleteProduct = (data) => {
  const sql = 'DELETE FROM all_ads WHERE id=? LIMIT 1';
  return getSqlData(sql, data);
};

module.exports.editProduct = (data) => {
  const sql = `
  UPDATE all_ads
  SET title = ?, author = ?, date = ?, content = ?, cat_id = ?, price = ?, sub_id = ?
  WHERE id = ?`;
  return getSqlData(sql, data);
};

module.exports.searchProduct = (data) => {
  const sql = `
   SELECT all_ads.id, all_ads.cat_id, all_ads.title, all_ads.username, all_ads.content, all_ads.date, all_ads.price, all_ads.p_condition,
   categories.cat_name AS cat_name
   FROM all_ads 
   JOIN categories
   ON all_ads.cat_id=categories.cat_id
   WHERE title REGEXP ? OR content REGEXP ?
   GROUP BY all_ads.id
   `;
  return getSqlData(sql, data);
};

module.exports.sortProduct = () => {
  const sql = 'SELECT * FROM all_ads ORDER BY date DESC';
  return getSqlData(sql);
};

module.exports.getProductsByCat = (data) => {
  const sql = `
   SELECT all_ads.id, all_ads.cat_id, all_ads.title, all_ads.username, all_ads.content, all_ads.date, all_ads.price, all_ads.p_condition,
   categories.cat_name AS cat_name
   FROM all_ads
   JOIN categories
   ON all_ads.cat_id=categories.cat_id
   WHERE all_ads.cat_id = ?
   GROUP BY all_ads.id
   `;
  return getSqlData(sql, data);
};
