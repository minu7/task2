const CryptoPrice = require('../model/CryptoPrice');

module.exports = async (crypto, io) => {
  const down = await CryptoPrice.aggregate([
    { $match: { crypto } },
    { $sort: { createdAt: 1 } },
    { $group: { _id: null, prices: { $push: '$price' } } },
    {
      $project: {
        down: {
          $reduce: {
            input: '$prices',
            initialValue: {
              count: 0,
              prec: 0
            },
            in: {
              count: {
                $add: [
                  '$$value.count',
                  {
                    $cond: {
                      if: { $gt: ['$$value.prec', '$$this'] },
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
    key: 'down',
    value: down[0].down.count
  });
};
