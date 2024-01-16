const express = require('express');

const commRouter = express.Router();

const commController = require('../controllers/commController');

// routes

// GET all comments by product ID
commRouter.get('/api/comments/product/:id', commController.getProdComments);

// POST - create new comment by product ID
commRouter.post(
  '/api/comments/product/:prod_id',
  commController.createProdComments,
);

module.exports = commRouter;
