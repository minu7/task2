const mongoose = require('mongoose');
const signale = require('signale');

const config = require('../config');

module.exports = () =>
  new Promise(resolve => {
    // Create the database connection
    mongoose.connect(`mongodb://root:password@${config.DB_HOST}`);
    mongoose.connection.on('connected', () => {
      signale.success('Mongoose default connection opened');
      resolve();
    });
    // If the connection throws an error
    mongoose.connection.on('error', err => {
      throw err;
    });
    // When the connection is disconnected
    mongoose.connection.on('disconnected', () => {
      signale.fatal('Mongoose default connection disconnected');
      const err = 'connection closed to db';
      throw err;
    });
    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        signale.fatal(
          'Mongoose default connection disconnected through app termination'
        );
        process.exit(0);
      });
    });

    // Setup di debug per vedere tutte le query.. molto utile in fase di debug
    // e aiuta a capire anche il sotto bosco di mongoose
    mongoose.set('debug', false);
  });
