var express = require('express');
var router = express.Router();
const { body, query } = require('express-validator/check');
const cropCycleFieldModel = require('../controller/cropcyclefield');
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
         body('name', 'Invalid cropCycle name').exists().isLength({ min: 1 }),
         body('cropcycle_id', 'Invalid crop cycle id value').exists().isInt({min: 1}),
         body('field_id', 'Invalid field id value').exists().isInt({min: 1})
        ]
     }
     case 'update': {
      return [
        body('name', 'Invalid cropCycle name').exists().isLength({ min: 1 }),
        body('cropcycle_id', 'Invalid crop id value').exists().isInt({min: 1}),
        body('field_id', 'Invalid field id value').exists().isInt({min: 1}),
        body('id', 'Invalid crop cycle field id value').exists().isInt({min: 1})
      ]
     }
     case 'delete': {
      return [
        body('id', 'Invalid cropCycle id').exists().isInt({min: 1})
      ]
     }
  }
}

router.get('/', validate('list'), cognito.verifyToken, cropCycleFieldModel.list);
router.post('/create', validate('create'), cognito.verifyToken, cropCycleFieldModel.create);
router.post('/update', validate('update'), cognito.verifyToken, cropCycleFieldModel.update);
router.post('/delete', validate('delete'), cognito.verifyToken, cropCycleFieldModel.delete);

module.exports = router;