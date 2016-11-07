"use strict";
let mongoose = require("mongoose");
let exercise = require("./exercise");

module.exports = new mongoose.Schema({
    title: String,
    completed: Number,
    exercises: [{
        exerciseInfo: Number,
        sets: Number,
        reps: String
    }]
});