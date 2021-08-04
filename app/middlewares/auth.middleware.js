const { verifyJwtToken } = require("../utils/token.util");
const User = require("../models/user.model");

module.exports = async (req, res, next) => {
  try {
    // verify  auth token
    const token = req.cookies.token;

    if (!token) {
      return next({ status: 401, message: "Token is not available" });
    }

    const payload = await verifyJwtToken(token);

    if (!payload || !payload.userId) {
      return next({ status: 401, message: "Invalid token" });
    }

    const user = await User.findById(payload.userId);

    if (!user) {
      return next({ status: 404, message: "User account is not exists" });
    }

    res.locals.user = user;

    return next();
  } catch (err) {
    next(err);
  }
};
