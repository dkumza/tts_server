require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const adsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const authRouter = require('./routes/auth');

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
app.use('/', authRouter);

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log('<<<<Error handling>>>>>');

  console.log('err ===', err);

  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  switch (err.code) {
    case 'ER_DUP_ENTRY':
      res.status(400);
      res.json({ msg: 'Email already in use' });
      return;
    case 'ER_NO_SUCH_TABLE':
      res.status(400);
      res.json({ msg: err.sqlMessage || 'no such table' });
      return;
    default:
  }

  res.status(500);
  res.json('Server error');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
