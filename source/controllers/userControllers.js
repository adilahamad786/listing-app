const User = require("../models/user");
const CustomError = require("../utils/customError");
const tryCatch = require("../middlewares/tryCatch");

exports.register = tryCatch( async (req, res) => {
    if (!(req.body.name && req.body.email && req.body.phone && req.body.password)) {
        throw new CustomError(401, "Bad_Request", "All fields mandatory for creating an account!");
    }
    const user = new User(req.body);
    await user.generateAuthToken();
    res.status(201).send("Account created successfully!");
});

exports.login = tryCatch( async (req, res) => {
    const user = await User.findByCredentials(req.body);

    if (!user) {
        throw new CustomError(401, "INVALID_USER", "User not found!");
    }

    const token = await user.generateAuthToken();

    res.send({ user, token });
});

exports.getUser = tryCatch( async (req, res) => {
    res.send({ user: req.user, token: req.token });
});


