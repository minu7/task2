module.exports = (req, res, next) => {
  const origin = req.get('origin');

  // TODO constANT: Check what is the origin and validate it!
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, X-Fingerprint, Content-Type, Accept, Authorization, Cache-Control, Pragma'
  );

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
  } else {
    next();
  }
};
