const express = require('express');

const read = require('./test/read');
const write = require('./test/write');

const test = express.Router();


test.get('/read/:crypto', (req, res) => read(req.params.crypto)
  .then(result => res.send(result))
  .catch(e => res.status(500).send(e)));

test.post('/write', (req, res) => write()
  .then(result => res.send(result))
  .catch(e => res.status(500).send(e)));

module.exports = test;
