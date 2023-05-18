const mongoose = require("mongoose");
require("dotenv").config();

const connectionUrl = process.env.MONGODB_URL;

const connectDb = async () => {
    try {
        const { connection } = await mongoose.connect(connectionUrl);
        console.log("MongoDb connected on port : ", connection.port);
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb;