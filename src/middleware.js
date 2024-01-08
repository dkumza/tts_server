const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./cfg');

function authToken(req, res, next) {
   console.log('authToken in progress');
   try {
      console.log('req.headers.authorization ===', req.headers.authorization);
      const token = req.headers.authorization.split(' ')[1];
      if (!token) throw new Error('no token');
      const decoded = jwt.verify(token, jwtSecret);
      console.log('decoded ===', decoded);
      next();
   } catch (error) {
      console.log('error ===', error);
      res.status(401).json('unauthorized');
   }
}

module.exports = {
   authToken,
};
