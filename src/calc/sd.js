const CryptoPrice = require('../model/CryptoPrice');

module.exports = async (crypto, io) => {
  const sd = await CryptoPrice.aggregate(
    [
      { $match: { crypto } },
      { $group: { _id: null, sd: { $stdDevPop: '$price' } } }
    ]
  );
  io.to(crypto).emit('data', {
    crypto,
    key: 'sd',
    value: sd[0].sd
  });
};
