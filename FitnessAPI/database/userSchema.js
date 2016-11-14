let mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String
});