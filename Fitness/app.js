"use strict";
let express = require("express");
let app = express();
let morgan = require("morgan");
let bodyparser = require("body-parser");

app.use("/static", express.static("public"));
app.use("/static/css", express.static("node_modules/bootstrap-material-design/dist/css"));
app.use("/static/js", express.static("node_modules/bootstrap-material-design/dist/js"));
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

app.set("view engine", "pug");

// Exercises will be kept in this variable
var programs = [
    {
        title: "My Program",
        id: 0,
        completed: 0
    },
    {
        title: "My second program",
        id: 1,
        completed: 0
    }
];

var exercises = [
    {
        name: "Pushup",
        desc: "You push yourself up and down with thy arms."
    },
    {
        name: "Run",
        desc: "Running"
    }
];

app.get("/", function (req, res) {
    res.render("index", {title: "Fitness Helper 3000", message: "Welcome to Fitness Helper 3000"});
});

app.post("/", function (req, res) {
    let received = req.body.chosenPrograms;
    let id = req.params.id;

    if (received.length <= 0 || received == undefined) {
        res.sendStatus(400);
    } else if (programs[id] == undefined) {
        res.sendStatus(400);
    }

    if (programs[id] == undefined) {
        programs[id] = [];
    }

    received.forEach(function (element) {
        let chosenProgram = programs[element.id];
        let program = {
            name: chosenProgram.name,
            desc: chosenProgram.desc,
        };
        programs[id].exercises.push(exercise);
    });

    console.log("Received:");
    console.log(received);
    res.json({url: "/program/" + id});
});



app.get("/program/:id", function (req, res) {
    let program = programs[req.params.id];
    if (program == undefined) {
        program = {title: "Program not found"};
    }
    res.render("program", {title: "Program", program: program});
});

app.get("/program/:id/add-exercise", function (req, res) {
        console.log("Andreas test 3");

    res.render("add-exercise", {
        title: "Add exercises", program: {id: req.params.id},
        exercises: exercises
    });
});

app.get("/data", function (req, res) {
    var data = {programs: programs, exercises: exercises};
    res.send(JSON.stringify(data));
});

app.post("/program/:id/add-exercise", function (req, res) {
    let received = req.body.chosenExercises;
    let id = req.params.id;
    console.log("Andreas test 1");

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

app.listen(3000, () => {
    console.log("listening on port 3000");    
});
