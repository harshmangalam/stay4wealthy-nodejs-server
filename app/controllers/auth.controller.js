const User = require("../models/user.model");
const { hashPassword, checkPassword } = require("../utils/password.util");
const { createJwtToken } = require("../utils/token.util");
const cookie = require("cookie");
const { ADMIN_PASSWORD, ADMIN_PHONE } = require("../config");

exports.signup = async (req, res, next) => {
  try {
    const { name, phone, password, address, pincode, role } = req.body;

    const isPhoneExists = await User.findOne({ phone });

    if (isPhoneExists) {
      return next({ status: 400, message: "Phone already registered" });
    }

    const passwordHash = await hashPassword(password);

    const createUser = new User({
      name,
      phone,
      address,
      pincode,
      role:
        ADMIN_PHONE === phone && ADMIN_PASSWORD === password ? "ADMIN" : role,
      password: passwordHash,
    });

    const saveUser = await createUser.save();

    return res.status(201).json({
      type: "success",
      message: "Account created successfully",
      data: {
        user: saveUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({
      phone,
    });

    if (!user) {
      return next({
        status: 400,
        message: "Phone/Password combination is incorrect",
      });
    }

    const matchPassword = await checkPassword(password, user.password);

    if (!matchPassword) {
      return next({
        status: 400,
        message: "Phone/Password combination is incorrect",
      });
    }

    const payload = {
      userId: user.id,
    };

    const jwtToken = await createJwtToken(payload);

    user.isActive = true;
    await user.save();

    res.set(
      "Set-Cookie",
      cookie.serialize("token", jwtToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600 * 12,
        path: "/",
      })
    );

    return res.status(201).json({
      type: "success",
      message: "You have loggedin successfully",
      data: {
        token: jwtToken,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.set(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(0),
        path: "/",
      })
    );

    return res.status(200).json({
      type: "success",
      message: "logout successfully",
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};
