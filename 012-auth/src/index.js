const config = require("./config");
const express = require("express");
const mongoose = require("mongoose");
require('express-async-errors');

const session = require("./middlewares/session");
const passport = require("./middlewares/passport");

const start = async () => {
    await mongoose.connect(config.MONGO_URL);
    console.log("MongoDB connected");

    const app = express();

    app.set("view engine", "ejs");
    app.use(express.urlencoded({ extended: true }));
    app.use(session({ secret: config.SECRET_KEY, mongoUrl: config.MONGO_URL }));
    app.use(passport.authBySession());

    app.use("/", require("./routes"));
    app.get("/", (req, res) => {
        res.redirect("/api/user/me");
    });

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