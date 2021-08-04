const User = require("../models/user.model");

exports.isAccountOwner = async (req, res, next) => {
  try {
    const isUserExists = await User.findById(req.params.userId);

    if (!isUserExists) {
      return next({ status: 404, message: "User account does not exists" });
    }

    const user = res.locals.user;


    if (String(user._id) === req.params.userId || user.role === "ADMIN") {
      return next();
    }

    return next({ status: 403, message: "Action not allowed" });
  } catch (error) {
    if (error.name === "CastError") {
      return next({ status: 400, message: "Invalid User Id" });
    } else {
      next(error);
    }
  }
};
