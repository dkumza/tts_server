const express = require('express');
const { getSqlData } = require('../utils/helper');

const categoriesRouter = express.Router();

// routes
// GET /api/categories - get all categories

categoriesRouter.get('/api/categories', async (req, res) => {
   const sql = 'SELECT * FROM `categories`';

   const [categories, error] = await getSqlData(sql);

   if (error) {
      console.log('error ===', error);
      res.status(500).json('something wrong');
      return;
   }

   res.json(categories);
});

module.exports = categoriesRouter;
