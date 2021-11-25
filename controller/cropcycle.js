const { validationResult } = require('express-validator/check');
const db = require('../models');
const CropCycle = db.CropCycle;
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
      offset: page
    };
    if (req.query.name) {
      input.where.name = {[Op.like]: `%${req.query.name}%`}
    }
    CropCycle.findAndCountAll(input)
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
      cropId: req.body.crop_id
    };
    CropCycle.create(input)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: err.errors[0].message || 'Fail to create crop cycle'
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
      cropId: req.body.crop_id
    };
    const condition = {
      id: req.body.id
    };
    CropCycle.update(input, {where: condition})
      .then(data => {
        if (data[0]) {
          res.send({
            message: 'Crop cycle updated successfully.'
          });
        }
        else {
          res.status(500).send({
            message: 'Fail to update crop cycle'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.errors[0].message || 'Fail to update crop cycle'
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
    CropCycle.destroy({where: condition})
      .then(data => {
        if (data) {
          res.send({message: 'Crop cycle deleted successfully.'});
        }
        else {
          res.status(500).send({
            message: 'Fail to delete crop cycle'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.errors[0].message || 'Fail to delete crop cycle'
        });
      });
  }
}