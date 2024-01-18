const express = require('express');

const commRouter = express.Router();

const commController = require('../controllers/commController');
const { authToken, commValid } = require('../middleware');

// routes

// GET all comments by product ID
commRouter.get('/api/comments/product/:id', commController.getProdComments);

// POST - create new comment by product ID
commRouter.post(
  '/api/comments/product/:prod_id',
  authToken,
  commValid,
  commController.createProdComments,
);

// DELETE - delete comment by comment comm_id
commRouter.delete('/api/comments/:comm_id', authToken, commController.deleteCommByID);

module.exports = commRouter;
