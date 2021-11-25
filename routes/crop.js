var express = require('express');
var router = express.Router();
const { body, query } = require('express-validator/check');
const cropModel = require('../controller/crop');
const cognito = require('../services/cognito');

const validate = (method) => {
  switch (method) {
    case 'list': {
      return [
        query('name', 'Invalid page value').optional(),
        query('page', 'Invalid page value').optional().isInt({min: 1}),
        query('limit', 'Invalid page value').optional().isInt({min: 1})
       ]
     }
    case 'create': {
      return [
         body('name', 'Invalid crop name').exists().isLength({ min: 1 })
        ]
     }
     case 'update': {
      return [
        body('name', 'Invalid crop name').exists().isLength({ min: 1 }),
        body('id', 'Invalid crop id').exists().isInt({min: 1})
      ]
     }
     case 'delete': {
      return [
        body('id', 'Invalid crop id').exists().isInt({min: 1})
      ]
     }
  }
}

router.get('/', validate('list'), cognito.verifyToken, cropModel.list);
router.post('/create', validate('create'), cognito.verifyToken, cropModel.create);
router.post('/update', validate('update'), cognito.verifyToken, cropModel.update);
router.post('/delete', validate('delete'), cognito.verifyToken, cropModel.delete);

module.exports = router;