require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const adsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const authRouter = require('./routes/auth');
const commRouter = require('./routes/comments');

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
app.use('/', commRouter);

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.log('<<<<Error handling>>>>>');
  console.log('err ===', err);

  if (err.status) {
    return res.status(err.status).json({ error: err.msg });
  }

  switch (err.code) {
    case 'ER_DUP_ENTRY': {
      const duplicateValue = err.sqlMessage.split("'")[1];
      res.status(400);
      res.json({
        msg: `${duplicateValue} - already in use`,
      });
      return;
    }

    default:
  }

  res.status(500);
  res.json('Server error');
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
