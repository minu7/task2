/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const User = require('../../model/User');
const { hashPassword, createJWT } = require('../../utils/crypto');

module.exports = async (email, password) => {
  const duplicate = await User.findOne({ email });
  if (duplicate) {
    const error = 'This email already in use';
    throw error;
  }

  const hashedPassword = hashPassword(password);
  const user = new User({ email, password: hashedPassword });
  const errorDocs = user.validateSync();

  if (errorDocs) {
    if (errorDocs.errors.email) {
      throw errorDocs.errors.email;
    }

    const error = 'An error is occured during data validate';
    throw error;
  }
  const userSaved = await user.save();
  userSaved.password = null;
  const payload = {
    id: userSaved._id,
    userRole: 'user'
  };

  return {
    ...userSaved._doc,
    token: createJWT(payload)
  };
};
