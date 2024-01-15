const express = require('express');

const catsController = require('../controllers/catsController');

const categoriesRouter = express.Router();

// routes

// GET /api/categories - get all categories
categoriesRouter.get('/api/categories', catsController.getAllCats);

module.exports = categoriesRouter;
