const config = require("./config");
const express = require("express");
require('express-async-errors');

const app = express();

app.set("view engine", "ejs");
app.use("/", require("./routes"));

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

app.listen(config.PORT, () => {
    console.log(`Server started at http://127.0.0.1:${config.PORT}`);
})