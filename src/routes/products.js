const express = require('express');
const { productValidation, authToken, productEditValidation } = require('../middleware');

const productsController = require('../controllers/productsController');

// create Route - ads
const adsRouter = express.Router();

// GET /api/ads - get all Ads by params
adsRouter.get('/api/products', productsController.getAll);

// CREATE /api/products/ - create new product
adsRouter.post('/api/products/', authToken, productValidation, productsController.create);

// GET /api/products/:id - get single product
adsRouter.get('/api/products/:id', productsController.getSingle);

// DELETE /api/products/:id by ad ID
adsRouter.delete('/api/products/:id', authToken, productsController.delete);

// UPDATE by ID
// PUT /api/post/:id - edit post by ID
adsRouter.put(
  '/api/products/:id',
  authToken,
  productEditValidation,
  productsController.edit,
);

// GET /api/categories/:id - get products by category ID
adsRouter.get('/api/products/category/:cat_id', productsController.getAllByCat);

// GET - Search by word in title or content
adsRouter.get('/api/search/:item', productsController.search);

//  Sort products by date asc
adsRouter.get('/api/sort/date', productsController.sort);

// GET - Get all products by username
adsRouter.get('/api/owner/:username', productsController.byOwner);

module.exports = adsRouter;
