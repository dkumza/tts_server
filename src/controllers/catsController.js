const { getSqlData } = require('../utils/helper');

module.exports.getAllCats = async (req, res) => {
  const sql = 'SELECT * FROM `categories`';

  const [categories, error] = await getSqlData(sql);

  if (error) {
    console.log('error ===', error);
    res.status(500).json('something wrong');
    return;
  }

  res.json(categories);
};
