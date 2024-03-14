const config = require("./config");
const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use("/", require("./routes"));

app.listen(config.PORT, () => {
    console.log(`Server started at http://127.0.0.1:${config.PORT}`);
})