const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");
require('express-async-errors');

const start = async () => {
    await mongoose.connect(config.MONGO_URL);
    console.log("MongoDB connected");

    const app = express();

    app.set("view engine", "ejs");
    app.use("/", require("./routes"));

    app.listen(config.PORT, () => {
        console.log(`Server started at http://127.0.0.1:${config.PORT}`);
    })
}

const stop = () => {
    console.log("Server stopped");
    process.exit(0);
};

process.on('SIGINT', () => {
    stop();
});
process.on('SIGTERM', () => {
    stop();
});

start();