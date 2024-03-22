require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,
    MONGO_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/012-auth",
    SECRET_KEY: process.env.SECRET_KEY || "secret",
    ROOT_DIR: __dirname,
};