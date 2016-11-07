"use strict";
let express = require("express");
let app = express();
let morgan = require("morgan");
let bodyparser = require("body-parser");
let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/fitnesshelper");
let exerciseSchema = require("./database/exercise");
let programSchema = require("./database/program");
mongoose.model("Exercise", exerciseSchema);
mongoose.model("Program", programSchema);

app.use("/static", express.static("public"));
app.use("/static/css", express.static("node_modules/bootstrap-material-design/dist/css"));
app.use("/static/js", express.static("node_modules/bootstrap-material-design/dist/js"));
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine", "pug");

// Exercises will be kept in this variable
var programs = [];
var exercises = [
    {
        name: "Pushup",
        desc: "You push yourself up and down with thy arms."
    },
    {
        name: "Lunges",
        desc: "Keep your upper body straight, with your shoulders back and relaxed and chin up " +
        "(pick a point to stare at in front of you so you don't keep looking down). Always engage your core." +
        "Step forward with one leg, lowering your hips until both knees are bent at about a 90-degree angle."
    },
    {
        name: "Right plank",
        desc: "Lie on your right side and support your body with your elbow. Lift bækkenet until the body is fully streched."
    },
    {
        name: "Left plank",
        desc: "Lie on your left side and support your body with your elbow. Lift bækkenet until the body is fully streched."
    }
];

app.get("/", function (req, res) {
    res.render("index", {
        title: "Fitness Helper 3000",
        message: "Welcome to Fitness Helper 3000",
        programs: programs
    });

});

app.get("/program/:id", function (req, res) {
    let program = programs[req.params.id];
    if (program == undefined) {
        program = {title: "Program not found"};
    }
    res.render("program", {title: "Program", id: req.params.id, program: program});
});


app.get("/program/:id/add-exercise", function (req, res) {

    res.render("add-exercise", {
        title: "Add exercises", id: req.params.id,
        exercises: exercises
    });
});

app.get("/data", function (req, res) {
    var data = {programs: programs, exercises: exercises};
    res.send(JSON.stringify(data));
});

app.get("/create-exercise", function (req, res) {
    res.render("create-exercise");
});

app.post("/", function (req, res) {
    console.log("POST REQUEST TO /");
    let programName = req.body.programName;
    programs.push({
        title: programName,
        completed: 0,
        exercises: []
    });
    res.send("success");
});

app.post("/program/:id/add-exercise", function (req, res) {
    let received = req.body.chosenExercises;
    let id = req.params.id;

    if (received.length <= 0 || received == undefined) {
        res.sendStatus(400);
    } else if (programs[id] == undefined) {
        res.sendStatus(400);
    }

    if (programs[id].exercises == undefined) {
        programs[id].exercises = [];
    }

    received.forEach(function (element) {
        let chosenExercise = exercises[element.id];
        let exercise = {
            name: chosenExercise.name,
            desc: chosenExercise.desc,
            set: element.set,
            reps: element.reps
        };
        programs[id].exercises.push(exercise);
    });

    console.log("Received:");
    console.log(received);
    res.json({url: "/program/" + id});
});

app.post("/program/:id/complete", function (req, res) {
    let id = req.params.id;
    let program = programs[id];

    if (program == undefined) {
        res.sendStatus(400);
        return false;
    }

    if (program.completed == undefined) {
        program.completed = 1;
    } else {
        program.completed += 1;
    }
    res.send(program.completed.toString());
});

app.post("/create-exercise", function (req, res) {
    console.log(req.body);
    res.send("success");
});

app.delete("/program/:id/exercise/:exercise", function (req, res) {
    let programId = req.params.id;
    let exerciseId = req.params.exercise;

    let program = programs[programId];

    if (program != undefined && program.exercises != undefined) {
        console.log("Deleting exercise: " + programId + " - " + exerciseId);
        program.exercises.splice(exerciseId, 1);
        res.send("success");
    } else {
        res.sendStatus(400);
    }
});

app.delete("/program/:id/delete", function (req, res) {
    programs.splice(req.params.id, 1);

    res.send("success");
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});
