"use strict";
let express = require("express");
let app = express();
let morgan = require("morgan");

app.use("/static", express.static("public"));
app.use(morgan("dev"));
app.set("view engine", "pug");

app.get("/", function (req, res) {
    res.render("index", {title: "Fitness Helper 3000", message: "Welcome to Fitness Helper 3000"});
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});
