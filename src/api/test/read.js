const CryptoPrice = require('../../model/CryptoPrice');

module.exports = async crypto => {
  const prices = await CryptoPrice.find({ crypto })
    .sort({ createdAt: -1 })
    .limit(1);
  if (prices.length > 0) {
    return prices[0];
  }
  return null;
};
