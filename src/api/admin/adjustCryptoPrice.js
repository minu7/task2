const CryptoPrice = require('../../model/CryptoPrice');

module.exports = async (crypto, factor) => {
  const res = await CryptoPrice.updateMany({ crypto }, { $mul: { price: factor } });
  return res;
};
