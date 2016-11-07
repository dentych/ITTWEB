"use strict";
let mongoose = require("mongoose");

module.exports = new mongoose.Schema({
    name: String,
    desc: String,
});