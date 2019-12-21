module.exports = (req, res, next) => {
  if (!res.locals.user) {
    return res.sendStatus(401);
  }
  return next();
};
