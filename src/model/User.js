const mongoose = require('mongoose');

const testEmail = require('../utils/testEmail');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: testEmail,
      message: 'email provided is not valid'
    }
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  favouriteCrypto: {
    type: [String],
    default: [],
    validate: {
      validator: value => {
        if (!Array.isArray(value)) {
          return false;
        }
        return (
          new Set(value).size === value.length
        );
      },
      message: 'Each favourite cryptocurrency must be unique'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
});

schema.index({ isAdmin: 1 }, { unique: true, partialFilterExpression: { isAdmin: true } });
module.exports = mongoose.model('Users', schema);
