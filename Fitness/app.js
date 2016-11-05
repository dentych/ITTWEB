"use strict";
let express = require("express");
let app = express();
let morgan = require("morgan");
let bodyparser = require("body-parser");

app.use("/static", express.static("public"));
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine", "pug");

app.get("/", function (req, res) {
    res.render("index", {title: "Fitness Helper 3000", message: "Welcome to Fitness Helper 3000"});
});

app.get("/program/:id", function (req, res) {
    res.render("program", {title: "Program", program: {title: "Some title", id: req.params.id}});
});

app.get("/program/:id/add-exercise", function (req, res) {
    res.render("add-exercise", {
        title: "Add exercises", program: {id: req.params.id},
        exercises: [
            {
                name: "Pushup",
                desc: "You push yourself up and down with thy arms."
            },
            {
                name: "Run",
                desc: "Running"
            }
        ]
    });
});

app.post("/program/:id/add-exercise", function (req, res) {
    var received = req.body.chosenExercises;

    res.send("Success");
})
app.listen(3000, () => {
    console.log("listening on port 3000");
});
