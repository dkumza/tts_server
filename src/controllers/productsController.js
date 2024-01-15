const { getSqlData } = require('../utils/helper');

module.exports.getAll = async (req, res, next) => {
  // const sql = 'SELECT * FROM all_ads';
  const sql = `
     SELECT all_ads.id, all_ads.cat_id, all_ads.title, all_ads.username, all_ads.content, all_ads.date, all_ads.price, all_ads.p_condition,
     categories.cat_name AS cat_name
     FROM all_ads
     JOIN categories
     ON all_ads.cat_id=categories.cat_id
     GROUP BY all_ads.id
     `;
    // getting POST and ERROR from helper by passing sql param
  const [postsArr, error] = await getSqlData(sql);

  if (error) return next(error);
  res.json(postsArr);
};

module.exports.create = async (req, res, next) => {
  const {
    title, username, date, content, cat_id, price, p_condition,
  } = req.body;

  const sql = `
       INSERT INTO all_ads (title, username, date, content, cat_id, price, p_condition) 
       VALUES (?,?,?,?,?,?,?)
       `;

  const [postsArr, error] = await getSqlData(sql, [
    title,
    username,
    date,
    content,
    cat_id,
    price,
    p_condition,
  ]);

  if (error) return next(error);

  if (postsArr.affectedRows === 1) res.json({ msg: 'Published successfully' });
};

module.exports.getSingle = async (req, res, next) => {
  const { id } = req.params;

  // const sql = 'SELECT * FROM all_ads WHERE id=?';
  const sql = `
     SELECT all_ads.id, all_ads.cat_id, all_ads.title, all_ads.username, all_ads.content, all_ads.date, all_ads.price, all_ads.p_condition,
     categories.cat_name AS cat_name
     FROM all_ads
     JOIN categories
     ON all_ads.cat_id=categories.cat_id
     WHERE all_ads.id = ?
     GROUP BY all_ads.id
     `;

  const [postsArr, error] = await getSqlData(sql, [id]);

  if (error) return next(error);

  if (postsArr.length === 1) {
    res.json(postsArr[0]);
    return;
  }
  if (postsArr.length === 0) {
    next({ msg: 'Product not found, check ID', status: 404 });
    return;
  }
  res.status(400).json(postsArr);
};

module.exports.delete = async (req, res, next) => {
  const { id } = req.params;
  const sql = 'DELETE FROM all_ads WHERE id=? LIMIT 1';
  const [postsArr, error] = await getSqlData(sql, [id]);

  if (error) return next(error);

  if (postsArr.affectedRows === 1) { return res.json({ msg: `ad with id ${id} was deleted` }); }

  if (postsArr.affectedRows === 0) {
    return res
      .status(500)
      .json({ msg: `DELETE ad with ID ${id} was unsuccessfully. Check ID` });
  }
};

module.exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const {
    title, author, date, content, cat_id, price, sub_id,
  } = req.body;

  const sql = `
     UPDATE all_ads
     SET title = ?, author = ?, date = ?, content = ?, cat_id = ?, price = ?, sub_id = ?
     WHERE id = ?`;
  const [postsArr, error] = await getSqlData(sql, [
    title,
    author,
    date,
    content,
    cat_id,
    price,
    sub_id,
    id,
  ]);

  if (error) return next(error);

  if (postsArr.affectedRows === 1) {
    return res.json({
      msg: `AD with id ${id} was edited. ${postsArr.info}`,
    });
  }

  if (postsArr.affectedRows === 0) {
    return res.status(500).json({
      msg: `UPDATE ad with ID ${id} was unsuccessfully. Check ID`,
    });
  }
};

module.exports.search = async (req, res, next) => {
  const { item } = req.params;
  // const sql = `SELECT * FROM all_ads WHERE title REGEXP ? OR content REGEXP ?;`;
  const sql = `
   SELECT all_ads.id, all_ads.cat_id, all_ads.title, all_ads.username, all_ads.content, all_ads.date, all_ads.price, all_ads.p_condition,
   categories.cat_name AS cat_name
   FROM all_ads 
   JOIN categories
   ON all_ads.cat_id=categories.cat_id
   WHERE title REGEXP ? OR content REGEXP ?
   GROUP BY all_ads.id
   `;
  const [products, error] = await getSqlData(sql, [item, item]);

  if (error) return next(error);

  if (products.length > 0) {
    res.json(products);
    return;
  }
  if (products.length === 0) {
    res.status(404).json({ msg: 'Products not found' });
  }
};

module.exports.sort = async (req, res, next) => {
  const sql = 'SELECT * FROM all_ads ORDER BY date DESC';
  // const sql = `
  // SELECT all_ads.id, all_ads.cat_id, all_ads.title, all_ads.username,
  // all_ads.content, all_ads.date, all_ads.price, all_ads.p_condition,
  // categories.cat_name AS cat_name
  // FROM all_ads
  // JOIN categories
  // ON all_ads.cat_id=categories.cat_id
  // WHERE all_ads.cat_id = ?
  // GROUP BY all_ads.id
  // `;
  const [products, error] = await getSqlData(sql);

  if (error) return next(error);

  if (products.length > 0) {
    res.json(products);
    return;
  }
  if (products.length === 0) {
    res.status(404).json({ msg: 'Products not found' });
  }
};

module.exports.getAllByCat = async (req, res) => {
  const { cat_id } = req.params;
  // const sql = `SELECT * FROM all_ads WHERE cat_id = ?`;
  const sql = `
   SELECT all_ads.id, all_ads.cat_id, all_ads.title, all_ads.username, all_ads.content, all_ads.date, all_ads.price, all_ads.p_condition,
   categories.cat_name AS cat_name
   FROM all_ads
   JOIN categories
   ON all_ads.cat_id=categories.cat_id
   WHERE all_ads.cat_id = ?
   GROUP BY all_ads.id
   `;

  const [products, error] = await getSqlData(sql, [cat_id]);

  if (error) return next(error);

  if (products.length > 0) {
    res.json(products);
    return;
  }
  if (products.length === 0) {
    res.status(404).json({ msg: 'Product not found, check ID' });
  }
};
