const CryptoPrice = require('../../model/CryptoPrice');

module.exports = async crypto => {
  const res = await CryptoPrice.remove({ crypto }, ['crypto']);
  return res;
};
