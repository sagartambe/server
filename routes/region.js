var express = require('express');
var router = express.Router();
const { body, query } = require('express-validator/check');
const regionModel = require('../controller/region');
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
         body('name', 'Invalid region name').exists().isLength({ min: 1 }),
         body('property_id', 'Invalid property id').exists().isInt({min: 1})
       ]
     }
     case 'update': {
      return [
        body('name', 'Invalid region name').exists().isLength({ min: 1 }),
        body('property_id', 'Invalid property id').exists().isInt({min: 1}),
        body('id', 'Invalid region id').exists().isInt({min: 1})
      ]
     }
     case 'delete': {
      return [
        body('id', 'Invalid region id').exists().isInt({min: 1})
      ]
     }
  }
}

router.get('/', validate('list'), cognito.verifyToken, regionModel.list);
router.post('/create', validate('create'), cognito.verifyToken, regionModel.create);
router.post('/update', validate('update'), cognito.verifyToken, regionModel.update);
router.post('/delete', validate('delete'), cognito.verifyToken, regionModel.delete);

module.exports = router;