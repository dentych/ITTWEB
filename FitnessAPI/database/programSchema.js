let mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    title: String,
    completed: Number,
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    exercises: [{
        exerciseInfo: Number,
        sets: Number,
        reps: String
    }]
});