/* eslint-disable no-param-reassign */
const { NUM_OF_HISTORY_PRICE } = require('../../config');
const CryptoPrice = require('../../model/CryptoPrice');

module.exports = async (crypto, id) => {
  let prices;
  if (id) {
    prices = await CryptoPrice.find(
      { crypto, _id: { $lt: id } },
      null,
      { sort: { createdAt: 1 }, limit: NUM_OF_HISTORY_PRICE }
    );
  } else {
    prices = await CryptoPrice.find(
      { crypto },
      null,
      { sort: { createdAt: 1 }, limit: NUM_OF_HISTORY_PRICE }
    );
  }

  return prices.map(cryptoPrice => cryptoPrice.price);
};
