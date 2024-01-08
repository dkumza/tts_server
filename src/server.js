require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const adsRouter = require('./routes/ads');
const categoriesRouter = require('./routes/categories');

const app = express();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
   res.json('Hello World!');
});

// ADS Routes
app.use('/', adsRouter);
app.use('/', categoriesRouter);

app.listen(port, () => {
   console.log(`Server is listening on port ${port}`);
});
