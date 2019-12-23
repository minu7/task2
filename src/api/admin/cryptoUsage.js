const User = require('../../model/User');

module.exports = async () => {
  const crypto = await User.aggregate([
    { $unwind: '$favouriteCrypto' },
    { $group: { _id: '$favouriteCrypto', count: { $sum: 1 } } }
  ]);
  return crypto;
};
