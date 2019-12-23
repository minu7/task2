const CryptoPrice = require('../model/CryptoPrice');

module.exports = async (crypto, io, price) => {
  const diff = await CryptoPrice.aggregate(
    [
      { $match: { crypto } },
      { $sort: { createdAt: 1 } },
      { $limit: 1 },
    ]
  );
  io.to(crypto).emit('data', {
    crypto,
    key: 'diff',
    value: diff[0].price - price
  });
};
