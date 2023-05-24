const tryCatch = require("./tryCatch");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
const User = require("../models/user");
require("dotenv").config();

const auth = tryCatch( async (req, res, next) => {

    const token = req.headers.authorization;

    if (!token)
        throw new CustomError(401, "UNAUTORIZE", "Please authenticate!");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded._id, "tokens.token": token });

    if (!user)
        throw new CustomError(401, "UNAUTORIZE", "Please authenticate!");

    req.user = user;
    req.token = token;

    next();
});

module.exports = auth;