const { validationResult } = require('express-validator/check');
const db = require('../models');
const CropCycleField = db.CropCycleField;
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
      where: {
      },
      limit: parseInt(req.query.limit) || 10,
      offset: page
    };
    if (req.query.name) {
      input.where.name = {[Op.like]: `%${req.query.name}%`}
    }
    CropCycleField.findAndCountAll(input)
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
      where: {
        cropCycleId: req.body.cropcycle_id,
        fieldId: req.body.field_id
      }
    };

    CropCycleField.findAll(input)
      .then(data => {
        if (data.length) {
          res.status(500).send({
            message: `Crop cycle field with cropCycleId ${req.body.cropcycle_id} and fieldId ${req.body.field_id} already exists.`
          });
          throw new Error(`Crop cycle field with cropCycleId ${req.body.cropcycle_id} and fieldId ${req.body.field_id} already exists.`);
        }
        else {
          return;
        }
      })
      .then((data) => {
        const input = {
          name: req.body.name,
          cropCycleId: req.body.cropcycle_id,
          fieldId: req.body.field_id
        };
        CropCycleField.create(input)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message: err.errors[0].message || 'Fail to create crop cycle field'
            });
          });
      })
      .catch(err => {
        console.log(err.message || err);
      });
  },
  update: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(412).json({ errors: errors.array() });
      return;
    }
    const input = {
      where: {
        cropCycleId: req.body.cropcycle_id,
        fieldId: req.body.field_id,
        id: {[Op.ne]: req.body.id}
      }
    };

    CropCycleField.findAll(input)
      .then(data => {
        if (data.length) {
          res.status(500).send({
            message: `Crop cycle field with cropCycleId ${req.body.cropcycle_id} and fieldId ${req.body.field_id} already exists.`
          });
          throw new Error(`Crop cycle field with cropCycleId ${req.body.cropcycle_id} and fieldId ${req.body.field_id} already exists.`);
        }
        else {
          return;
        }
      })
      .then((data) => {
        const input = {
          name: req.body.name,
          cropCycleId: req.body.cropcycle_id,
          fieldId: req.body.field_id
        };
        const condition = {
          id: req.body.id
        };
        CropCycleField.update(input, {where: condition})
          .then(data => {
            if (data[0]) {
              res.send({
                message: 'Crop cycle field updated successfully.'
              });
            }
            else {
              res.status(500).send({
                message: 'Fail to update crop cycle field'
              });
            }
          })
          .catch(err => {
            res.status(500).send({
              message: err.errors[0].message || 'Fail to update crop cycle field'
            });
          });
      })
      .catch(err => {
        console.log(err.message || err);
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
    CropCycleField.destroy({where: condition})
      .then(data => {
        if (data) {
          res.send({message: 'Crop cycle field deleted successfully.'});
        }
        else {
          res.status(500).send({
            message: 'Fail to delete crop cycle field'
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: err.errors[0].message || 'Fail to delete crop cycle field'
        });
      });
  }
}