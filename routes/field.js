var express = require('express');
var router = express.Router();
const { body, query } = require('express-validator/check');
const fieldModel = require('../controller/field');
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
         body('name', 'Invalid field name').exists().isLength({ min: 1 }),
         body('specification', 'Invalid field specification').exists().isLength({ min: 1 }),
         body('region_id', 'Invalid region id').exists().isInt({min: 1})
       ]
     }
     case 'update': {
      return [
        body('name', 'Invalid field name').exists().isLength({ min: 1 }),
        body('specification', 'Invalid field specification').exists().isLength({ min: 1 }),
        body('id', 'Invalid field id').exists().isInt({min: 1}),
        body('region_id', 'Invalid region id').exists().isInt({min: 1})
      ]
     }
     case 'delete': {
      return [
        body('id', 'Invalid field id').exists().isInt({min: 1})
      ]
     }
  }
}

router.get('/', validate('list'), cognito.verifyToken, fieldModel.list);
router.post('/create', validate('create'), cognito.verifyToken, fieldModel.create);
router.post('/update', validate('update'), cognito.verifyToken, fieldModel.update);
router.post('/delete', validate('delete'), cognito.verifyToken, fieldModel.delete);

module.exports = router;