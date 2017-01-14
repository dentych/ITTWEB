"use strict";

// Requires
let express = require("express");
let app = express();
let morgan = require("morgan");
let bodyparser = require("body-parser");
let mongoose = require("mongoose");
let favicon = require("serve-favicon");
let path = require("path");

// Setup
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/fitnesshelper");
let db = mongoose.connection;
db.on("error", function (err) {
    console.log("DB connection failed: " + err.message);
    process.exit(1);
});



app.use("/static", express.static("public/"));
app.use("/static/css", express.static("node_modules/bootstrap-material-design/dist/css"));
app.use("/static/js", express.static("node_modules/bootstrap-material-design/dist/js"));
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(favicon(__dirname + "/public/favicon.png"));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

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
