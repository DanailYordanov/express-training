const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, PORT } = require("./config/config");
const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const authRouter = require("./routes/authRoutes");
const apiRouter = require("./routes/apiRoutes");

const connectWithRetry = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Succesfully connected to MongoDB")
    } catch (err) {
        console.log(err);
        setTimeout(connectWithRetry, 5000);
    }
}

connectWithRetry();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

require("./strategies/local");

app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error_message: "URL not found"
    })
});

app.use((err, req, res, next) => {
    res.status(500).json({
        success: false,
        error_message: err.message
    })
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})