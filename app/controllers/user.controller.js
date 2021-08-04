const User = require("../models/user.model");

exports.fetchAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      type: "success",
      message: "fetch all users",
      data: {
        users,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    return res.status(200).json({
      type: "success",
      message: "fetch  user by id",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchCurrentUser = async (req, res, next) => {
  try {
    const user = res.locals.user;
    return res.status(200).json({
      type: "success",
      message: "fetch current user",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};
