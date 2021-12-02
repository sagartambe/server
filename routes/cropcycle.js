var express = require('express');
var router = express.Router();
const { body, query } = require('express-validator/check');
const cropCycleModel = require('../controller/cropcycle');
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
         body('crop_id', 'Invalid crop id value').exists().isInt({min: 1})
        ]
     }
     case 'update': {
      return [
        body('name', 'Invalid cropCycle name').exists().isLength({ min: 1 }),
        body('crop_id', 'Invalid crop id value').exists().isInt({min: 1}),
        body('id', 'Invalid crop id value').exists().isInt({min: 1})
      ]
     }
     case 'delete': {
      return [
        body('id', 'Invalid cropCycle id').exists().isInt({min: 1})
      ]
     }
  }
}

router.get('/', validate('list'), cognito.verifyToken, cropCycleModel.list);
router.post('/create', validate('create'), cognito.verifyToken, cropCycleModel.create);
router.post('/update', validate('update'), cognito.verifyToken, cropCycleModel.update);
router.post('/delete', validate('delete'), cognito.verifyToken, cropCycleModel.delete);

module.exports = router;