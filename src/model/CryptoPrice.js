const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  crypto: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 1800 // after 30 minutes
  },
}, {
  shardKey: { crypto: 1 }
});

schema.index({ crypto: 1, createdAt: -1 });

module.exports = mongoose.model('CriptoPrices', schema);
