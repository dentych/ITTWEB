"use strict";
let express = require("express");
let app = express();

app.use("/static", express.static("public"));

app.get("/", function(req, res) {
    res.send("yup");
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});