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

// Validation Schemas
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

const signUpSchema = Yup.object({
   username: Yup.string()
      .trim()
      .min(3, 'Username must be at least 3 characters long')
      .required('*Username is required'),
   email: Yup.string()
      .trim()
      .required('*Email is required')
      .email('*Email must be valid email'),
   password: Yup.string()
      .trim()
      .min(6, '*Password must be at least 6 characters long')
      .required('*Password is required'),
   // mPassword: Yup.string()
   //    .trim()
   //    .min(6, '*Password must be at least 6 characters long')
   //    .test('passwords-match', 'Passwords must match', function (value) {
   //       return this.parent.password === value;
   //    })
   //    .required('*Password is required'),
});

const productSchema = Yup.object({
   cat_id: Yup.number('TEST').min(1, '*Category is required'),
   title: Yup.string()
      .trim()
      .min(3, '*Title must be at least 3 characters long')
      .required('*Title is required'),
   username: Yup.string()
      .trim()
      .min(3, '*Username name must be at least 3 characters long')
      .required('*Sellers Name is required'),
   content: Yup.string()
      .trim()
      .min(6, '*About must be at least 6 characters long')
      .required('*About is required'),
   price: Yup.number()
      .required('*Price is required')
      .positive('*Price must be a positive number')
      .integer('*Price must be integer'),
   p_condition: Yup.string()
      .required('*Condition is required')
      .oneOf(['new', 'used'], '*Condition must be either "new" or "used"'),
});

const validationMiddleware = (schema) => {
   return async (req, res, next) => {
      try {
         const user = await schema.validate(req.body, { abortEarly: false });
         console.log('user:', user);
         next();
      } catch (error) {
         console.log(error);
         const errorObject = {};
         error.inner.forEach((err) => {
            errorObject[err.path] = err.message;
            if (err.path === 'cat_id') {
               errorObject[err.path] = '*Select category is required';
            }
         });
         res.status(400).json(errorObject);
      }
   };
};

const loginValidation = validationMiddleware(loginSchema);
const signUpValidation = validationMiddleware(signUpSchema);
const productValidation = validationMiddleware(productSchema);

module.exports = {
   authToken,
   loginValidation,
   signUpValidation,
   productValidation,
};
