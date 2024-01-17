const productsModels = require('../models/productsModels');
const chalk = require('chalk');

module.exports.getAll = async (req, res, next) => {
  // getting POST and ERROR from helper by passing sql param
  const [postsArr, error] = await productsModels.getAllProducts();

  if (error) return next(error);
  res.json(postsArr);
};

module.exports.create = async (req, res, next) => {
  const { title, username, date, content, cat_id, price, p_condition } =
    req.body;
  const { userID } = req;

  const [postsArr, error] = await productsModels.createProduct([
    title,
    username,
    date,
    content,
    cat_id,
    price,
    p_condition,
    userID,
  ]);

  if (error) return next(error);

  if (postsArr.affectedRows === 1) res.json({ msg: 'Published successfully' });
};

module.exports.getSingle = async (req, res, next) => {
  const { id } = req.params;

  const [postsArr, error] = await productsModels.getSingleProduct([id]);

  if (error) return next(error);

  if (postsArr.length === 1) {
    return res.json(postsArr[0]);
  }

  if (postsArr.length === 0) {
    return next({ msg: 'Product not found, check ID', status: 404 });
  }

  res.status(400).json(postsArr);
};

module.exports.delete = async (req, res, next) => {
  const { id } = req.params;
  // validation if product have same user ID
  const [post] = await productsModels.checkSingleProductByID([id]);
  console.log(post);

  if (+post[0].user_id !== +req.userID) {
    return next({ msg: 'Auth Failed, check user ID', status: 401 });
  }

  const [postsArr, error] = await productsModels.deleteProduct([id]);

  if (error) return next(error);

  if (postsArr.affectedRows === 1) {
    return res.json({ msg: 'Your product was deleted' });
  }

  if (postsArr.affectedRows === 0) {
    return res.status(500).json({
      msg: `DELETE product with ID ${id} was unsuccessfully. Check ID`,
    });
  }
};

module.exports.edit = async (req, res, next) => {
  const { id } = req.params;
  const { title, author, date, content, cat_id, price, sub_id } = req.body;

  const [postsArr, error] = await productsModels.editProduct([
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
      msg: `Product with id ${id} was edited. ${postsArr.info}`,
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

  const [products, error] = await productsModels.searchProduct([item, item]);

  if (error) return next(error);

  if (products.length > 0) {
    return res.json(products);
  }
  if (products.length === 0) {
    res.status(404).json({ msg: 'Products not found' });
  }
};

module.exports.sort = async (req, res, next) => {
  const [products, error] = await productsModels.sortProduct();

  if (error) return next(error);

  if (products.length > 0) {
    return res.json(products);
  }
  if (products.length === 0) {
    res.status(404).json({ msg: 'Products not found' });
  }
};

module.exports.getAllByCat = async (req, res, next) => {
  const { cat_id } = req.params;
  const [products, error] = await productsModels.getProductsByCat([cat_id]);

  if (error) return next(error);

  if (products.length > 0) {
    return res.json(products);
  }
  if (products.length === 0) {
    res.status(404).json({ msg: 'Product not found, check ID' });
  }
};
