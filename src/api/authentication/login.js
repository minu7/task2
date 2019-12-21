/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');

const User = require('../../model/User');

const { createJWT } = require('../../utils/crypto');

module.exports = async (email, password) => {
  const user = await User.findOne({
    email
  });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    const error = 'invalid credentials';
    throw error;
  }
  user.password = null;
  const payload = {
    id: user._id,
    userRole: user.isAdmin ? 'admin' : 'user'
  };

  return {
    ...user._doc,
    token: createJWT(payload)
  };
};
