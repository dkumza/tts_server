const express = require('express');
const mysql = require('mysql2/promise');
const { getSqlData } = require('./utils/helper');

// create Route - ads
const adsRouter = express.Router();

// GET /api/ads - get all Ads by params
adsRouter.get('/api/ads', async (req, res, next) => {
   const sql = 'SELECT * FROM all_ads';
   // const sql = `
   // SELECT posts.post_id, posts.title, posts.author, posts.content, posts.date, COUNT(post_comments.comm_id) AS commentCount,
   // categories.title AS categoryName
   // FROM posts
   // JOIN categories
   // ON posts.cat_id=categories.cat_id
   // LEFT JOIN post_comments
   // ON post_comments.post_id=posts.post_id
   // GROUP BY posts.post_id
   // `;

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
adsRouter.delete('/api/ads/:adID', async (req, res, next) => {
   const { adID } = req.params;
   console.log(adID);
   const sql = 'DELETE FROM all_ads WHERE adID=? LIMIT 1';
   const [postsArr, error] = await getSqlData(sql, [adID]);

   if (error) return next(error);

   if (postsArr.affectedRows === 1)
      return res.json({ msg: `post with id ${adID} was deleted` });

   if (postsArr.affectedRows === 0)
      return res
         .status(500)
         .json(`DELETE AD with ID ${adID} was unsuccessfully. Check ID`);
});

// UPDATE by ID
// PUT /api/post/:postID - edit post by ID
adsRouter.put('/api/ads/:adID', async (req, res, next) => {
   const { adID } = req.params;
   const { title, author, date, content, cat_id } = req.body;

   const sql = `
     UPDATE all_ads
     SET title = ?, author = ?, date = ?, content = ?, cat_id = ?
     WHERE adID = ?`;
   const [postsArr, error] = await getSqlData(sql, [
      title,
      author,
      date,
      content,
      cat_id,
      adID,
   ]);

   if (error) return next(error);

   if (postsArr.affectedRows === 1)
      return res.json({
         msg: `AD with id ${adID} was edited. ${postsArr.info}`,
      });

   if (postsArr.affectedRows === 0)
      return res
         .status(500)
         .json(`UPDATE Post with ID ${adID} was unsuccessfully. Check ID`);
});

module.exports = adsRouter;
