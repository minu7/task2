const express = require('express');

const login = require('./authentication/login');
const signup = require('./authentication/signup');

const authentication = express.Router();

authentication.post('/login', (req, res) => login(req.body.email, req.body.password)
  .then(result => res.send(result))
  .catch(e => res.status(500).send(e)));

authentication.post('/signup', (req, res) => signup(req.body.email, req.body.password)
  .then(result => res.send(result))
  .catch(e => res.status(500).send(e)));

module.exports = authentication;
