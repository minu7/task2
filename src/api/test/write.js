/* eslint-disable no-param-reassign */
const CryptoPrice = require('../../model/CryptoPrice');

module.exports = async () => {
  const cryptoPrice = new CryptoPrice({
    crypto: 'minutella',
    price: Math.random()
  });
  const price = await cryptoPrice.save();
  return price;
};
