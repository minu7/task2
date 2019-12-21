/* eslint-disable no-param-reassign */
const User = require('../../model/User');

module.exports = async (userId, cryptocurrencies) => {
  const user = await User.findOne({ _id: userId });
  user.favouriteCrypto = cryptocurrencies;
  await user.save();
  user.password = null;
  return user;
};
