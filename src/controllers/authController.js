const bcrypt = require('bcryptjs');

const { getSqlData, makeJWT } = require('../utils/helper');

module.exports.register = async (req, res, next) => {
  console.log(req.body);
  const { email, username, password } = req.body;
  const hashPsw = bcrypt.hashSync(password, 10);
  const sql = 'INSERT INTO users (email, username, password) VALUES (?,?,?)';
  const [result, error] = await getSqlData(sql, [email, username, hashPsw]);

  if (error) return next(error);

  res.status(201).json({ msg: 'Account has been created', result });
};

module.exports.login = async (req, res, next) => {
  const { email, password: plainPsw } = req.body;
  // compare if email exists
  const sql = 'SELECT * FROM `users` WHERE `email`= ?';
  const [users, error] = await getSqlData(sql, [email]);

  if (error) return next(error);

  if (users.length === 0) {
    return res.status(400).json({ msg: 'Email or password do not match' });
  }

  const userExists = users[0];
  // user found, then compare if password matches
  if (!bcrypt.compareSync(plainPsw, userExists.password)) {
    return next({ msg: 'Email or password do not match', status: 400 });
  }

  //  generate session token for founded user ID
  const payload = { email, sub: userExists.id };
  const token = makeJWT(payload);

  res.json({
    msg: 'Login success',
    username: userExists.username,
    token,
  });
};
