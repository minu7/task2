const CryptoPrice = require('../model/CryptoPrice');

module.exports = async (crypto, io) => {
  const up = await CryptoPrice.aggregate([
    { $match: { crypto } },
    { $sort: { createdAt: 1 } },
    { $group: { _id: null, prices: { $push: '$price' } } },
    {
      $project: {
        up: {
          $reduce: {
            input: '$prices',
            initialValue: {
              count: -1,
              prec: 0
            },
            in: {
              count: {
                $add: [
                  '$$value.count',
                  {
                    $cond: {
                      if: { $gt: ['$$this', '$$value.prec'] },
                      then: 1,
                      else: 0
                    }
                  }
                ]
              },
              prec: '$$this'
            }
          }
        }
      }
    }
  ]);

  io.to(crypto).emit('data', {
    crypto,
    key: 'up',
    value: up[0].up.count
  });
};
