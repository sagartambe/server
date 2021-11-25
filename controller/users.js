const { validationResult } = require('express-validator/check');
const cognito = require('../services/cognito');

module.exports = {
  signup: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(412).json({ errors: errors.array() });
      return;
    }
    const {email, password, name} = {...req.body};
    cognito.register(email, password, name)
      .then(response => {
        return cognito.signIn(email, password)
      })
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send({
          message: err.message
        });
      });
  },
  signin: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(412).json({ errors: errors.array() });
      return;
    }
    const {email, password} = {...req.body};
    cognito.signIn(email, password)
      .then(response => {
        res.send(response);
      })
      .catch(err => {
        res.setHeader('Content-Type', 'application/json');
        res.status(500).send({
          message: err.message
        });
      });
  }
}