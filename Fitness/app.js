"use strict";

// Requires
let express = require("express");
let app = express();
let mongoose = require("mongoose");

// Setup
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/fitnesshelper");
let db = mongoose.connection;
db.on("error", function (err) {
    console.log("DB connection failed: " + err.message);
    process.exit(1);
});
// Setup express app
require("./setup")(app);

// Global variable for programs.
var programs = [];

var programRoutes = require("./routes/programRoutes");
// Routes
app.get("/", (req, res) => res.redirect("/program"));
app.use("/program", programRoutes());

// Start server listener
app.listen(3000, () => {
    console.log("listening on port 3000");
});
