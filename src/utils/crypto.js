const jwt = require('jwt-simple');
const bcrypt = require('bcryptjs');
const moment = require('moment');

const config = require('../config');

/**
 * Generate JSON Web Token
 */
function createJWT(user) {
  const payload = {
    user,
    iat: moment().unix(),
    exp: moment().add(365, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

/**
 * Use bcrypt for storing passwords
 */
function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}

// console.log(hashPassword('123AdminBottone'));

module.exports = { createJWT, hashPassword };
