const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, PORT } = require('./config/config');
const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

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

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})