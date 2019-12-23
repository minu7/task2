const { NUM_OF_HISTORY_PRICE } = require('../../config');
const CryptoPrice = require('../../model/CryptoPrice');
const mongoose = require('mongoose');

module.exports = async (crypto, id) => {
  let prices;
  if (id) {
    prices = await CryptoPrice.find({
      crypto,
      _id: { $lt: mongoose.Types.ObjectId(id) }
    })
      .sort({ createdAt: -1 })
      .limit(NUM_OF_HISTORY_PRICE);
  } else {
    prices = await CryptoPrice.find({ crypto })
      .sort({ createdAt: -1 })
      .limit(NUM_OF_HISTORY_PRICE);
  }

  return prices.map(price => price.price).reverse();
};
