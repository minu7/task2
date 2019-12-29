const CryptoPrice = require('../src/model/CryptoPrice');
const startDbConnection = require('../src/utils/db');
const signale = require('signale');
// rudimental test to test cap theorem during write operation
let interval = 1;
async function capTest() {
  let start;
  let end;
  try {
    const cryptoPrice = new CryptoPrice({ crypto: 'minutella', price: Math.random() });
    start = new Date();
    const price = await cryptoPrice.save();
    end = new Date() - start;
    signale.success(`insert ${price._id} execution time: ${end}ms`);
  } catch(e) {
    signale.fatal(e);
  }

  try {
    start = new Date();
    const crypto = await CryptoPrice.find({ crypto: 'minutella'});
    end = new Date() - start;
    signale.success(`read ${crypto[crypto.length - 1]} execution time: ${end}ms`);
  } catch(e) {
    signale.fatal(e);
  }
  setTimeout(capTest, interval);
}

if (process.argv.length < 3) {
  signale.fatal('You must provide as argument the insert interval');
  process.exit();
}

if (parseInt(process.argv[2], 10) <= 0) {
  signale.fatal('insert interval must be greater than zero');
  process.exit();
}

interval = parseInt(process.argv[2], 10);
startDbConnection().then(() => {
  capTest();
});
