const { validationResult } = require('express-validator/check');
const db = require('../models');
const Organization = db.Organization;

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
      limit: 10,
      offset: page,
      include: [db.Property]
    };
    Organization.findAndCountAll(input)
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
      name: req.body.name
    };
    Organization.create(input)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.errors[0].message || 'Fail to create organization'
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
      name: req.body.name
    };
    const condition = {
      id: req.body.id
    };
    Organization.update(input, {where: condition})
      .then(data => {
        if (data[0]) {
          res.send({
            message: 'Oraganization updated successfully.'
          });
        }
        else {
          res.status(500).send({
            message: 'Fail to update organization'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.errors[0].message || 'Fail to update organization'
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
    Organization.destroy({where: condition})
      .then(data => {
        if (data) {
          res.send({message: 'Oraganization deleted successfully.'});
        }
        else {
          res.status(500).send({
            message: 'Fail to delete organization'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.errors[0].message || 'Fail to delete organization'
        });
      });
  }
}