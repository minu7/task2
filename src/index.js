const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const compression = require('compression');
const morgan = require('morgan');
const helmet = require('helmet');
const passport = require('passport');
const httpBearer = require('passport-http-bearer');
const signale = require('signale');
const WebSocket = require('ws');

// Utils
const config = require('./config');
const startDbConnection = require('./utils/db');
// Middlewares
const tokenDecrypt = require('./utils/tokenDecrypt');
const corsMiddleware = require('./middlewares/cors');
// Routers
const authenticationRouter = require('./api/authentication');
const cryptoRouter = require('./api/crypto');
const adminRouter = require('./api/admin');
// for inserting cryptoPrice
const CryptoPrice = require('./model/CryptoPrice');
const User = require('./model/User');
const allCalc = require('./calc/all');

// per l'autenticazione
const BearerStrategy = httpBearer.Strategy;
passport.use(
  new BearerStrategy((token, done) => {
    done(null, tokenDecrypt(token));
  })
);

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
// Library middlewares
app.use(helmet());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(corsMiddleware);
app.use((req, res, next) => {
  passport.authenticate('bearer', (err, user) => {
    res.locals.user = user;
    next();
  })(req, res, next);
});

app.use('/auth', authenticationRouter);
app.use('/crypto', cryptoRouter);
app.use('/admin', adminRouter);

// once the successfull connection to db
startDbConnection().then(() => {
  const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=ALL');
  pricesWs.onmessage = data => {
    const prices = JSON.parse(data.data);
    Object.keys(prices).forEach(key => {
      const cryptoPrice = new CryptoPrice({ crypto: key, price: parseFloat(prices[key]) });
      cryptoPrice.save((err, doc) => {
        if (err) {
          return;
        }
        allCalc(key, io, doc.id, doc.price);
      });
    });
  };

  server.listen(config.PORT, '0.0.0.0', () => {
    signale.success(`Express server listening on port ${config.PORT}`);
  });

  io.on('connection', async socket => {
    const userToken = tokenDecrypt(socket.handshake.query.token);
    if (!userToken || !userToken.id) {
      return;
    }
    const user = await User.findById(userToken.id);
    user.favouriteCrypto.forEach(crypto => {
      socket.join(crypto);
    });
  });
});
