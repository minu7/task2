module.exports = (req, res, next) => {
  if (!res.locals.user && res.locals.user.userRole === 'admin') {
    return res.sendStatus(401);
  }
  return next();
};
