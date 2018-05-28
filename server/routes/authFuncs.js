const authorized = (req, res, next) => {
  if (!req.user) {
    return next({ status: 401 });
  }
  next();
};

const isCorrectUser = (key, paramName) => {
  return (req, res, next) => {
    if (req[key][paramName] === req.user.id || req.user.isAdmin) {
      return next();
    }
    next({ status: 401 });
  };
};

const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) {
    return next();
  }
  next({ status: 401 });
};

module.exports = {
  authorized,
  isCorrectUser,
  isAdmin
};
