/* eslint-disable no-param-reassign */
const CryptoPrice = require('../../model/CryptoPrice');

module.exports = async () => {
  const crypto = await CryptoPrice.find({}, ['crypto']).distinct('crypto');
  return crypto;
};
