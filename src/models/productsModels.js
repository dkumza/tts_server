const { getSqlData } = require('../utils/helper');

module.exports.getAllProducts = () => {
  // const sql = 'SELECT * FROM products';
  const sql = `
     SELECT products.id, products.cat_id, products.title, products.username, products.content, products.date, products.price, products.p_condition,
     categories.cat_name AS cat_name
     FROM products
     JOIN categories
     ON products.cat_id=categories.cat_id
     GROUP BY products.id
     `;

  return getSqlData(sql);
};

module.exports.createProduct = (data) => {
  const sql = `
  INSERT INTO products (title, username, date, content, cat_id, price, p_condition) 
  VALUES (?,?,?,?,?,?,?)
  `;

  return getSqlData(sql, data);
};

module.exports.getSingleProduct = (data) => {
  const sql = `
     SELECT products.id, products.cat_id, products.title, products.username, products.content, products.date, products.price, products.p_condition,
     categories.cat_name AS cat_name
     FROM products
     JOIN categories
     ON products.cat_id=categories.cat_id
     WHERE products.id = ?
     GROUP BY products.id
     `;

  return getSqlData(sql, data);
};

module.exports.deleteProduct = (data) => {
  const sql = 'DELETE FROM products WHERE id=? LIMIT 1';
  return getSqlData(sql, data);
};

module.exports.editProduct = (data) => {
  const sql = `
  UPDATE products
  SET title = ?, author = ?, date = ?, content = ?, cat_id = ?, price = ?, sub_id = ?
  WHERE id = ?`;
  return getSqlData(sql, data);
};

module.exports.searchProduct = (data) => {
  const sql = `
   SELECT products.id, products.cat_id, products.title, products.username, products.content, products.date, products.price, products.p_condition,
   categories.cat_name AS cat_name
   FROM products 
   JOIN categories
   ON products.cat_id=categories.cat_id
   WHERE title REGEXP ? OR content REGEXP ?
   GROUP BY products.id
   `;
  return getSqlData(sql, data);
};

module.exports.sortProduct = () => {
  const sql = 'SELECT * FROM products ORDER BY date DESC';
  return getSqlData(sql);
};

module.exports.getProductsByCat = (data) => {
  const sql = `
   SELECT products.id, products.cat_id, products.title, products.username, products.content, products.date, products.price, products.p_condition,
   categories.cat_name AS cat_name
   FROM products
   JOIN categories
   ON products.cat_id=categories.cat_id
   WHERE products.cat_id = ?
   GROUP BY products.id
   `;
  return getSqlData(sql, data);
};

module.exports.checkSingleProductByID = (data) => {
  const sql = 'SELECT * FROM products WHERE id = ?';
  return getSqlData(sql, data);
};
