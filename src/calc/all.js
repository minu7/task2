const priceFunction = require('./price');
const average = require('./average');
const diff = require('./diff');
const sd = require('./sd');
const down = require('./down');
const up = require('./up');

module.exports = (crypto, io, id, price) => {
  priceFunction(crypto, io, id, price);
  average(crypto, io);
  diff(crypto, io, price);
  sd(crypto, io);
  down(crypto, io);
  up(crypto, io);
};
