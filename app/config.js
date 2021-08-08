const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET;

const ADMIN_PHONE = process.env.ADMIN_PHONE;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

const STRIPE_SECRET_TEST = process.env.STRIPE_SECRET_TEST


module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SECRET,
  NODE_ENV,

  ADMIN_PHONE,
  ADMIN_PASSWORD,

  STRIPE_SECRET_TEST
};
