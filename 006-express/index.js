const config = require("./config");
const express = require("express");

const app = express();

app.use(express.json());

app.use("/api", require("./api"));

app.listen(config.PORT, () => {
    console.log("Server started on port 3000");
})