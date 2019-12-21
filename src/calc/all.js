const priceFunction = require('./price');
const average = require('./average');

module.exports = (crypto, io, id, price) => {
  priceFunction(crypto, io, id, price);
  average(crypto, io);
};
