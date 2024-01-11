const express = require('express');
const bcrypt = require('bcryptjs');

const { getSqlData, makeJWT } = require('../utils/helper');
const { loginValidation, signUpValidation } = require('../middleware');

const authRouter = express.Router();

// POST /api/auth/register - register user
authRouter.post(
   '/api/auth/register',
   signUpValidation,
   async (req, res, next) => {
      console.log(req.body);
      const { email, username, password } = req.body;
      const hashPsw = bcrypt.hashSync(password, 10);
      const sql =
         'INSERT INTO users (email, username, password) VALUES (?,?,?)';
      const [result, error] = await getSqlData(sql, [email, username, hashPsw]);

      if (error) return next(error);

      res.status(201).json({ msg: 'Account has been created', result });
   }
);

// POST /api/auth/log in - log in user
authRouter.post('/api/auth/login', loginValidation, async (req, res, next) => {
   const { email, password: plainPsw } = req.body;
   // compare if email exists
   const sql = 'SELECT * FROM `users` WHERE `email`= ?';
   const [users, error] = await getSqlData(sql, [email]);

   if (error) return next(error);

   if (users.length === 0)
      return res.status(400).json({ msg: 'Email or password do not match' });

   const userExists = users[0];
   // user found, then compare if password matches
   if (!bcrypt.compareSync(plainPsw, userExists.password)) {
      next({ msg: 'Email or password do not match', status: 400 });
      return;
   }

   //  generate session token for founded user ID
   const payload = { email, sub: userExists.id };
   const token = makeJWT(payload);

   res.json({
      msg: 'Login success',
      username: userExists.username,
      token,
   });
});

module.exports = authRouter;
