const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        lowercase: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error("Email is invalid!")
            }
        }
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
        validate(phone) {
            if (phone.toString().length !== 10) {
                throw new Error("Phone number is not valid!")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    tokens : [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.statics.findByCredentials = async ({ phone, email, password}) => {
    let user;

    if (phone)
        user = await User.findOne({ phone });    
    else if (email)
        user = await User.findOne({ email });

    if (!user)
        throw new CustomError(401, "INVALID_CREDENTIAL", "Invalid user credentials");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
        throw new CustomError(401, "INVALID_CREDENTIAL", "Invalid user credentials");

    return user;
}

userSchema.methods.toJSON = function () {
    const user = this;

    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    
    user.tokens.push({ token });
    
    await user.save();

    return token;
};

userSchema.pre("save", async function (next) {
    const user = this;

    if (user.isModified("password"))
        user.password = await bcrypt.hash(user.password, 10);

    next();
})

const User = mongoose.model("User", userSchema);

module.exports = User;