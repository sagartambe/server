var express = require('express');
var router = express.Router();
const { body, query } = require('express-validator/check');
const organizationModel = require('../controller/organization');
const cognito = require('../services/cognito');

const validate = (method) => {
  switch (method) {
    case 'list': {
      return [
        query('page', 'Invalid page value').optional().isInt({min: 1})
       ]
     }
    case 'create': {
      return [
         body('name', 'Invalid organization name').exists().isLength({ min: 1 })
       ]
     }
     case 'update': {
      return [
        body('name', 'Invalid organization name').exists().isLength({ min: 1 }),
        body('id', 'Invalid organization id').exists().isInt({min: 1})
      ]
     }
     case 'delete': {
      return [
        body('id', 'Invalid organization id').exists().isInt({min: 1})
      ]
     }
  }
}

router.get('/', validate('list'), cognito.verifyToken, organizationModel.list);
router.post('/create', validate('create'), cognito.verifyToken, organizationModel.create);
router.post('/update', validate('update'), cognito.verifyToken, organizationModel.update);
router.post('/delete', validate('delete'), cognito.verifyToken, organizationModel.delete);

module.exports = router;