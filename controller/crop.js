const { validationResult } = require('express-validator/check');
const db = require('../models');
const Crop = db.Crop;

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
      offset: page
    };
    Crop.findAndCountAll(input)
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
    Crop.create(input)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.errors[0].message || 'Fail to create crop'
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
    Crop.update(input, {where: condition})
      .then(data => {
        if (data[0]) {
          res.send({
            message: 'Crop updated successfully.'
          });
        }
        else {
          res.status(500).send({
            message: 'Fail to update crop'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.errors[0].message || 'Fail to update crop'
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
    Crop.destroy({where: condition})
      .then(data => {
        if (data) {
          res.send({message: 'Crop deleted successfully.'});
        }
        else {
          res.status(500).send({
            message: 'Fail to delete crop'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.errors[0].message || 'Fail to delete crop'
        });
      });
  }
}