let mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    email: String,
    hash: String,
    salt: String
});