const express = require('express');

const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const getCryptoList = require('./crypto/getCryptoList');
const prices = require('./crypto/prices');
const setFavouriteCrypto = require('./crypto/setFavouriteCrypto');

const crypto = express.Router();

crypto.use(ensureAuthenticated);

crypto.get('/list', (req, res) => getCryptoList()
  .then(result => res.send(result))
  .catch(e => res.status(500).send(e)));

crypto.get('/prices', (req, res) => prices(req.query.crypto, req.query.id)
  .then(result => res.send(result))
  .catch(e => res.status(500).send(e)));

crypto.post('/set-favourite', (req, res) => setFavouriteCrypto(res.locals.user.id, req.body.cryptocurrencies)
  .then(result => res.send(result))
  .catch(e => res.status(500).send(e)));

module.exports = crypto;
