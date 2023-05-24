const router = require("express").Router();
const { register, login, getUser } = require("../controllers/userControllers");
const auth = require("../middlewares/auth");

// register user
router.post("/register", register);

// login user
router.post("/login", login);

// get user/itself
router.get("/me", auth, getUser);

module.exports = router;