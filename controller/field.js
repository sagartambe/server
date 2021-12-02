const { validationResult } = require('express-validator/check');
const db = require('../models');
const Field = db.Field;
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
        model: db.Region,
        attributes: ['name', 'id']
      }]
    };
    if (req.query.name) {
      input.where.name = {[Op.like]: `%${req.query.name}%`}
    }
    if (req.query.id) {
      input.where.id = req.query.id;
    }
    Field.findAndCountAll(input)
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
      specification: req.body.specification,
      regionId: req.body.region_id
    };
    Field.create(input)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          error_message: err.errors[0].message || 'Fail to create field'
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
      specification: req.body.specification,
      regionId: req.body.region_id
    };
    const condition = {
      id: req.body.id
    };
    Field.update(input, {where: condition})
      .then(data => {
        if (data[0]) {
          res.send({
            message: 'Field updated successfully.'
          });
        }
        else {
          res.status(500).send({
            error_message: 'Fail to update field'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          error_message: err.errors[0].message || 'Fail to update field'
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
    Field.destroy({where: condition})
      .then(data => {
        if (data) {
          res.send({message: 'Field deleted successfully.'});
        }
        else {
          res.status(500).send({
            error_message: 'Fail to delete field'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          error_message: err.errors[0].message || 'Fail to delete field'
        });
      });
  }
}