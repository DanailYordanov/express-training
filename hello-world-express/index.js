const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, PORT } = require("./config/config");
const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const apiRouter = require("./routes/apiRoutes");

const connectWithRetry = () => {
    mongoose
        .connect(mongoURL)
        .then(() => console.log("Succesfully connected to MongoDB"))
        .catch((e) => {
            console.log(e);
            setTimeout(connectWithRetry, 5000);
        });
}

connectWithRetry();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

require("./strategies/local");

app.use("/", userRouter);
app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})