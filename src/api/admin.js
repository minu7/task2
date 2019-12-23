const express = require('express');

const checkAdmin = require('../middlewares/checkAdmin');

const adjustCryptoPrice = require('./admin/adjustCryptoPrice');
const cryptoUsage = require('./admin/cryptoUsage');
const deleteCryptoPrice = require('./admin/deleteCryptoPrice');

const admin = express.Router();

admin.use(checkAdmin);

admin.post('/adjust-crypto', (req, res) => adjustCryptoPrice(req.body.crypto, req.body.factor)
  .then(result => res.send(result))
  .catch(e => res.status(500).send(e)));

admin.get('/crypto-usage', (req, res) => cryptoUsage()
  .then(result => res.send(result))
  .catch(e => res.status(500).send(e)));

admin.delete('/delete-crypto', (req, res) => deleteCryptoPrice(req.query.crypto)
  .then(result => res.send(result))
  .catch(e => res.status(500).send(e)));

module.exports = admin;
