const express = require('express');
const mysql = require('mysql2/promise');
const { getSqlData } = require('./utils/helper');

// create Route - ads
const adsRouter = express.Router();

// CREATE /api/post/ - create new post
// INSERT INTO posts (title, author, date, content) VALUES (?, ?, ?, ?)
adsRouter.post('/api/all_ads/', async (req, res, next) => {
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

module.exports = adsRouter;
