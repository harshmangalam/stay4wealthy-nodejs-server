const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middleware");
const { signup, login, logout } = require("../controllers/auth.controller");

router.post("/signup", signup);
router.post("/login", login);
router.patch("/logout", isAuthenticated, logout);

module.exports = router;
