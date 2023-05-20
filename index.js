const connectDb = require("./source/config/db");
const express = require("express");
const userRouter = require("./source/routers/user");
const itemRouter = require("./source/routers/item");
const errorMiddleware = require("./source/middlewares/errorMiddleware");
require("dotenv").config();

const app = express();

// Connect to mongodb
connectDb();
const port = process.env.PORT || 8800;

app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/item", itemRouter);

app.get("/", (req, res) => {
    res.send("This is home page!");
})

app.get("*", (req, res) => {
    res.send("Page not found!");
})

app.use(errorMiddleware)

app.listen(port, () => console.log("Server is running on port : ", port))
