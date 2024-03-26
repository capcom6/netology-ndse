require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,
    COUNTER_URL: process.env.COUNTER_URL || "http://127.0.0.1:3001",
    MONGO_URL: process.env.MONGO_URL || "mongodb://127.0.0.1:27017/library",
};