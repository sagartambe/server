const { validationResult } = require('express-validator/check');
const db = require('../models');
const Region = db.Region;
const Op = db.Sequelize.Op;

module.exports = {
  list: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(412).json({ errors: errors.array() });
      return;
    }
    const page = (req.query.page - 1) || 0;
    const input = {
      where: {},
      limit: parseInt(req.query.limit) || 10,
      offset: page,
      include: [{
        model: db.Property,
        attributes: ['name', 'id']
      }]
    };
    if (req.query.name) {
      input.where.name = {[Op.like]: `%${req.query.name}%`}
    }
    if (req.query.id) {
      input.where.id = req.query.id;
    }
    Region.findAndCountAll(input)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message
        });
      });
  },
  create: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(412).json({ errors: errors.array() });
      return;
    }
    const input = {
      name: req.body.name,
      propertyId: req.body.property_id
    };
    Region.create(input)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          error_message: err.errors[0].message || 'Fail to create region'
        });
      });
  },
  update: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(412).json({ errors: errors.array() });
      return;
    }
    const input = {
      name: req.body.name,
      propertyId: req.body.property_id
    };
    const condition = {
      id: req.body.id
    };
    Region.update(input, {where: condition})
      .then(data => {
        if (data[0]) {
          res.send({
            message: 'Region updated successfully.'
          });
        }
        else {
          res.status(500).send({
            error_message: 'Fail to update region'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          error_message: err.errors[0].message || 'Fail to update region'
        });
      });
  },
  delete: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(412).json({ errors: errors.array() });
      return;
    }
    const condition = {
      id: req.body.id
    };
    Region.destroy({where: condition})
      .then(data => {
        if (data) {
          res.send({message: 'Region deleted successfully.'});
        }
        else {
          res.status(500).send({
            error_message: 'Fail to delete region'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          error_message: err.errors[0].message || 'Fail to delete region'
        });
      });
  }
}