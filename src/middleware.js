const jwt = require('jsonwebtoken');
const Yup = require('yup');

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

const loginValidation = async (req, res, next) => {
   console.log(req.body);

   const loginSchema = Yup.object({
      email: Yup.string()
         .trim()
         .required('*Email is required')
         .email('*Email must be valid email'),
      password: Yup.string()
         .trim()
         .min(6, '*Password must be at least 6 characters long')
         .required('*Password is required'),
   });

   try {
      const user = await loginSchema.validate(req.body, { abortEarly: false }); //abortEarly to show all validation msgs
      console.log('user', user);
      next();
   } catch (error) {
      console.log(error);
      const errorObject = {};
      error.inner.forEach((err) => {
         errorObject[err.path] = err.message;
      });
      res.status(400).json(errorObject);
   }
};

module.exports = {
   authToken,
   loginValidation,
};
