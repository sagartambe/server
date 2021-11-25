var express = require('express');
var router = express.Router();
const { body } = require('express-validator/check');
const userController = require('../controller/users');

const validate = (method) => {
  switch (method) {
    case 'signin': {
     return [
        body('password', 'Invalid password').exists().isLength({ min: 6 }),
        body('email', 'Invalid email').exists().isEmail()
       ]
    }
    case 'signup': {
      return [
         body('name', 'Invalid name').exists().isLength({ min: 4 }),
         body('password', 'Invalid password').exists().isLength({ min: 6 }),
         body('email', 'Invalid email').exists().isEmail()
        ]
     }
  }
}

router.post('/signup', validate('signup'), userController.signup);
router.post('/signin', validate('signin'), userController.signin);

module.exports = router;