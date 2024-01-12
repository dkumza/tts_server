const express = require('express');
const mysql = require('mysql2/promise');
const { getSqlData } = require('../utils/helper');
const { productValidation } = require('../middleware');

// create Route - ads
const adsRouter = express.Router();

// GET /api/ads - get all Ads by params
adsRouter.get('/api/ads', async (req, res, next) => {
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

// CREATE /api/ads/ - create new ad
// INSERT INTO ads (title, author, date, content) VALUES (?, ?, ?, ?)
adsRouter.post('/api/ads/', productValidation, async (req, res, next) => {
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

// DELETE /api/all_ads/:ad_id by ad ID
adsRouter.delete('/api/ads/:id', async (req, res, next) => {
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
// PUT /api/post/:postID - edit post by ID
adsRouter.put('/api/ads/:id', async (req, res, next) => {
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

module.exports = adsRouter;