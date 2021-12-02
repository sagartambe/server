const { validationResult } = require('express-validator/check');
const db = require('../models');
const Property = db.Property;
const Op = db.Sequelize.Op;

module.exports = {
  list: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.status(412).json({ error_message: errors.array() });
      return;
    }
    const page = (req.query.page - 1) || 0;
    const input = {
      where: {},
      limit: parseInt(req.query.limit || 10),
      offset: page,
      include: [{
        model: db.Organization,
        attributes: ['id', 'name']
      }]
    };
    if (req.query.name) {
      input.where.name = {[Op.like]: `%${req.query.name}%`}
    }
    if (req.query.id) {
      input.where.id = req.query.id;
    }
    Property.findAndCountAll(input)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          error_message:
            err.message
        });
      });
  },
  create: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(412).json({ error_message: errors.array() });
      return;
    }
    const input = {
      name: req.body.name,
      organizationId: req.body.organization_id
    };
    Property.create(input)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          error_message: err.errors[0].message || 'Fail to create property'
        });
      });
  },
  update: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(412).json({ error_message: errors.array() });
      return;
    }
    const input = {
      name: req.body.name,
      organizationId: req.body.organization_id
    };
    const condition = {
      id: req.body.id
    };
    Property.update(input, {where: condition})
      .then(data => {
        if (data[0]) {
          res.send({
            message: 'Property updated successfully.'
          });
        }
        else {
          res.status(500).send({
            error_message: 'Fail to update property'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          error_message: err.errors[0].message || 'Fail to update property'
        });
      });
  },
  delete: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(412).json({ error_message: errors.array() });
      return;
    }
    const condition = {
      id: req.body.id
    };
    Property.destroy({where: condition})
      .then(data => {
        if (data) {
          res.send({message: 'Property deleted successfully.'});
        }
        else {
          res.status(500).send({
            error_message: 'Fail to delete property'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          error_message: err.errors[0].message || 'Fail to delete property'
        });
      });
  }
}