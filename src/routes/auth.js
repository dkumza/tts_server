const express = require('express');
const bcrypt = require('bcryptjs');

const { getSqlData, makeJWT } = require('../utils/helper');

const authRouter = express.Router();

// POST /api/auth/register - register user
authRouter.post('/api/auth/register', async (req, res, next) => {
   const { email, password } = req.body;
   const hashPsw = bcrypt.hashSync(password, 10);
   const sql = 'INSERT INTO users (email, password) VALUES (?,?)';
   const [result, error] = await getSqlData(sql, [email, hashPsw]);

   if (error) return next(error);

   res.status(201).json({ msg: 'account has been created', result });
});

// POST /api/auth/log in - log in user
authRouter.post('/api/auth/login', async (req, res, next) => {
   const { email, password: plainPsw } = req.body;
   // compare if email exists
   const sql = 'SELECT * FROM `users` WHERE `email`= ?';
   const [users, error] = await getSqlData(sql, [email]);

   if (error) return next(error);

   if (users.length === 0)
      return res.status(400).json({ msg: 'email or password do not match' });

   const userExists = users[0];
   // user found, then compare if password matches
   if (!bcrypt.compareSync(plainPsw, userExists.password)) {
      next({ msg: 'email or password do not match', status: 400 });
      return;
   }

   //  generate session token for founded user ID
   const payload = { email, sub: userExists.id };
   const token = makeJWT(payload);

   res.json({
      msg: 'login success',
      token,
   });
});

module.exports = authRouter;
