const CryptoPrice = require('../model/CryptoPrice');

module.exports = async (crypto, io) => {
  const avg = await CryptoPrice.aggregate(
    [
      { $match: { crypto } },
      { $group: { _id: null, average: { $avg: '$price' } } }
    ]
  );
  io.to(crypto).emit('data', {
    crypto,
    key: 'average',
    value: avg[0].average
  });
};
