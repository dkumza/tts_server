const productsModels = require('../models/productsModels');
const chalk = require('chalk');

module.exports.getAll = async (req, res, next) => {
  // getting POST and ERROR from helper by passing sql param
  const [productsArr, error] = await productsModels.getAllProducts();

  if (error) return next(error);
  res.json(productsArr);
};

module.exports.create = async (req, res, next) => {
  const { title, username, content, cat_id, price, p_condition } = req.body;
  const { userID } = req;

  const [productsArr, error] = await productsModels.createProduct([
    title,
    username,
    content,
    cat_id,
    price,
    p_condition,
    userID,
  ]);

  if (error) return next(error);

  if (productsArr.affectedRows === 1) {
    console.log(productsArr);
    const id = productsArr.insertId;
    res.json({ msg: 'Published successfully', id });
  }
};

module.exports.getSingle = async (req, res, next) => {
  const { id } = req.params;

  const [productsArr, error] = await productsModels.getSingleProduct([id]);

  if (error) return next(error);

  if (productsArr.length === 1) {
    return res.json(productsArr[0]);
  }

  if (productsArr.length === 0) {
    return next({ msg: 'Product not found, check ID', status: 404 });
  }

  res.status(400).json(productsArr);
};

module.exports.delete = async (req, res, next) => {
  const { id } = req.params;
  // validation if product have same user ID
  const [product] = await productsModels.checkSingleProductByID([id]);
  console.log(product);

  if (+product[0].user_id !== +req.userID) {
    return next({ msg: 'Auth Failed, check user ID', status: 401 });
  }

  const [productsArr, error] = await productsModels.deleteProduct([id]);

  if (error) return next(error);

  if (productsArr.affectedRows === 1) {
    return res.json({ msg: 'Your product was deleted' });
  }

  if (productsArr.affectedRows === 0) {
    return res.status(500).json({
      msg: `DELETE product with ID ${id} was unsuccessfully. Check ID`,
    });
  }
};

module.exports.edit = async (req, res, next) => {
  const { id } = req.params;

  // validation if product have same user ID
  const [product] = await productsModels.checkSingleProductByID([id]);
  console.log(product);

  if (+product[0].user_id !== +req.userID) {
    return next({ msg: 'Auth Failed, check user ID', status: 401 });
  }

  const { title, content, cat_id, price } = req.body;

  const [productsArr, error] = await productsModels.editProduct([
    title,
    content,
    cat_id,
    price,
    id,
  ]);

  if (error) return next(error);

  if (productsArr.affectedRows === 1) {
    return res.json({
      msg: 'Product updated successfully',
      id,
    });
  }

  if (productsArr.affectedRows === 0) {
    return res.status(500).json({
      msg: 'Error, no update made',
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
