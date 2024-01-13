const express = require('express');
const mysql = require('mysql2/promise');
const { getSqlData } = require('../utils/helper');
const { productValidation } = require('../middleware');

// create Route - ads
const adsRouter = express.Router();

// GET /api/ads - get all Ads by params
adsRouter.get('/api/products', async (req, res, next) => {
   const sql = 'SELECT * FROM all_ads';
   // const sql = `
   // SELECT all_ads.id, all_ads.title, all_ads.author, all_ads.content, all_ads.date,
   // categories.name AS categories_name
   // FROM all_ads
   // JOIN categories
   // ON all_ads.cat_id=categories.id
   // GROUP BY all_ads.id
   // `;

   const [postsArr, error] = await getSqlData(sql); //getting POST and ERROR from helper by passing sql param

   if (error) return next(error);
   res.json(postsArr);
});

// CREATE /api/products/ - create new ad
// INSERT INTO ads (title, author, date, content) VALUES (?, ?, ?, ?)
adsRouter.post('/api/products/', productValidation, async (req, res, next) => {
   const { title, username, date, content, cat_id, price, p_condition } =
      req.body;
   console.log('body: ', req.body);

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

   if (postsArr.affectedRows === 1) res.json({ msg: `Published successfully` });
});

// GET /api/products/:id - get single product

adsRouter.get('/api/products/:id', async (req, res, next) => {
   const { id } = req.params;

   const sql = 'SELECT * FROM all_ads WHERE id=?';
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
});

// DELETE /api/products/:id by ad ID
adsRouter.delete('/api/products/:id', async (req, res, next) => {
   const { id } = req.params;
   const sql = 'DELETE FROM all_ads WHERE id=? LIMIT 1';
   const [postsArr, error] = await getSqlData(sql, [id]);

   if (error) return next(error);

   if (postsArr.affectedRows === 1)
      return res.json({ msg: `ad with id ${id} was deleted` });

   if (postsArr.affectedRows === 0)
      return res
         .status(500)
         .json({ msg: `DELETE ad with ID ${id} was unsuccessfully. Check ID` });
});

// UPDATE by ID
// PUT /api/post/:id - edit post by ID
adsRouter.put('/api/products/:id', async (req, res, next) => {
   const { id } = req.params;
   const { title, author, date, content, cat_id, price, sub_id } = req.body;

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

   if (postsArr.affectedRows === 1)
      return res.json({
         msg: `AD with id ${id} was edited. ${postsArr.info}`,
      });

   if (postsArr.affectedRows === 0)
      return res.status(500).json({
         msg: `UPDATE ad with ID ${id} was unsuccessfully. Check ID`,
      });
});

// GET /api/categories/:id - get products by category ID
adsRouter.get('/api/products/category/:cat_id', async (req, res) => {
   const { cat_id } = req.params;
   console.log(req.params);
   const sql = `SELECT * FROM all_ads WHERE cat_id = ?`;

   const [products, error] = await getSqlData(sql, [cat_id]);
   console.log(products);

   if (error) return next(error);

   if (products.length > 0) {
      res.json(products);
      return;
   }
   if (products.length === 0) {
      res.status(404).json({ msg: 'Product not found, check ID' });
      return;
   }
});

//GET - Search by word in title or content
// SELECT * FROM `all_ads` WHERE `title` REGEXP 'pc' OR `content` REGEXP 'pc';
adsRouter.get('/api/search/:item', async (req, res, next) => {
   const { item } = req.params;
   console.log(item);
   const sql = `SELECT * FROM all_ads WHERE title REGEXP ? OR content REGEXP ?;`;
   const [products, error] = await getSqlData(sql, [item, item]);
   console.log(products);

   if (error) return next(error);

   if (products.length > 0) {
      res.json(products);
      return;
   }
   if (products.length === 0) {
      res.status(404).json({ msg: 'Products not found' });
      return;
   }
});

module.exports = adsRouter;
