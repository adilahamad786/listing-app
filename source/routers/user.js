const router = require("express").Router();
const { register, login } = require("../controllers/userControllers");

// register user
router.post("/register", register);

// login user
router.post("/login", login);

module.exports = router;