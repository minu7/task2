/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
const User = require('../model/User');
const { hashPassword } = require('../utils/crypto');

module.exports = async () => {
  const duplicate = await User.findOne({ email: 'admin@admin.com' });
  if (duplicate) {
    return;
  }

  const hashedPassword = hashPassword('admin');
  const user = new User({ email: 'admin@admin.com', password: hashedPassword, isAdmin: true });
  const errorDocs = user.validateSync();

  if (errorDocs) {
    if (errorDocs.errors.email) {
      throw errorDocs.errors.email;
    }

    const error = 'An error is occured during data validate';
    throw error;
  }
  await user.save();
};
