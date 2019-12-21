const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = token => {
  if (!token) {
    return null;
  }
  try {
    const payload = jwt.decode(token, config.TOKEN_SECRET);
    return payload.user;
  } catch (e) {
    return null;
  }
};
