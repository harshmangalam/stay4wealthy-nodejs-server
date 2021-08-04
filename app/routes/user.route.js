const router = require("express").Router();
const isAuthenticated = require("../middlewares/auth.middleware");
const { isAccountOwner } = require("../middlewares/owner.middleware");

const {
  fetchAllUsers,
  fetchUserById,
  fetchCurrentUser,
} = require("../controllers/user.controller");

router.get("/", fetchAllUsers);
router.get("/me", isAuthenticated, fetchCurrentUser);
router.get("/:userId", fetchUserById);

module.exports = router;
