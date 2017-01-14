let bodyparser = require("body-parser");
let express = require("express");
let path = require("path");
let morgan = require("morgan");

module.exports = function (app) {
    app.use("/static", express.static("public/"));
    app.use("/static/css", express.static("node_modules/bootstrap-material-design/dist/css"));
    app.use("/static/js", express.static("node_modules/bootstrap-material-design/dist/js"));
    app.use(morgan("dev"));
    app.use(bodyparser.json());
    app.use(bodyparser.urlencoded({extended: true}));
    app.use(favicon(__dirname + "/public/favicon.png"));

    app.set("view engine", "pug");
    app.set("views", path.join(__dirname, "views"));
};
