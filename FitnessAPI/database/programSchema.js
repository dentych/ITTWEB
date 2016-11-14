let mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    title: String,
    completed: Number,
    exercises: [{
        exerciseInfo: Number,
        sets: Number,
        reps: String
    }]
});