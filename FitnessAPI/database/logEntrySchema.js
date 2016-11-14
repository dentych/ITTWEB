let mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    timestamp: Date,
    programName: String
});