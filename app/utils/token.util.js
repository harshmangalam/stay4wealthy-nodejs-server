const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

exports.createJwtToken = async (payload) => {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
    resolve(token);
  });
};

exports.verifyJwtToken = async (token) => {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      resolve(payload);
    } catch (error) {
      reject(error);
    }
  });
};
