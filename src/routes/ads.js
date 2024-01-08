const express = require('express');
const mysql = require('mysql2/promise');
const { getSqlData } = require('../utils/helper');

// create Route - ads
const adsRouter = express.Router();

// GET /api/ads - get all Ads by params
adsRouter.get('/api/ads', async (req, res, next) => {
   // const sql = 'SELECT * FROM all_ads';
   const sql = `
   SELECT all_ads.id, all_ads.title, all_ads.author, all_ads.content, all_ads.date,
   categories.name AS categories_name
   FROM all_ads
   JOIN categories
   ON all_ads.cat_id=categories.id
   GROUP BY all_ads.id
   `;

   const [postsArr, error] = await getSqlData(sql); //getting POST and ERROR from helper by passing sql param

   if (error) return next(error);
   res.json(postsArr);
});

// CREATE /api/post/ - create new post
// INSERT INTO posts (title, author, date, content) VALUES (?, ?, ?, ?)
adsRouter.post('/api/ads/', async (req, res, next) => {
   console.log(req.body);
   const { title, author, date, content, cat_id } = req.body;

   const sql = `
     INSERT INTO all_ads (title, author, date, content, cat_id) 
     VALUES (?,?,?,?,?)
     `;

   const [postsArr, error] = await getSqlData(sql, [
      title,
      author,
      date,
      content,
      cat_id,
   ]);

   if (error) return next(error);

   if (postsArr.affectedRows === 1)
      res.json({ msg: `New AD Created successfully` });
});

// DELETE /api/all_ads/:ad_id by ad ID
adsRouter.delete('/api/ads/:id', async (req, res, next) => {
   const { id } = req.params;
   console.log(id);
   const sql = 'DELETE FROM all_ads WHERE id=? LIMIT 1';
   const [postsArr, error] = await getSqlData(sql, [id]);

   if (error) return next(error);

   if (postsArr.affectedRows === 1)
      return res.json({ msg: `post with id ${id} was deleted` });

   if (postsArr.affectedRows === 0)
      return res
         .status(500)
         .json(`DELETE AD with ID ${id} was unsuccessfully. Check ID`);
});

// UPDATE by ID
// PUT /api/post/:postID - edit post by ID
adsRouter.put('/api/ads/:id', async (req, res, next) => {
   const { id } = req.params;
   const { title, author, date, content, cat_id } = req.body;

   const sql = `
     UPDATE all_ads
     SET title = ?, author = ?, date = ?, content = ?, cat_id = ?
     WHERE id = ?`;
   const [postsArr, error] = await getSqlData(sql, [
      title,
      author,
      date,
      content,
      cat_id,
      id,
   ]);

   if (error) return next(error);

   if (postsArr.affectedRows === 1)
      return res.json({
         msg: `AD with id ${id} was edited. ${postsArr.info}`,
      });

   if (postsArr.affectedRows === 0)
      return res
         .status(500)
         .json(`UPDATE Post with ID ${id} was unsuccessfully. Check ID`);
});

module.exports = adsRouter;
