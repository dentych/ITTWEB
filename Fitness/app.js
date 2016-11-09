"use strict";

// Requires
let express = require("express");
let app = express();
let morgan = require("morgan");
let bodyparser = require("body-parser");
let mongoose = require("mongoose");
let favicon = require("serve-favicon");

// Setup
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/fitnesshelper");
let db = mongoose.connection;
db.on("error", function (err) {
    console.log("DB connection failed: " + err.message);
    process.exit(1);
});

let programSchema = require("./database/program");
var programModel = mongoose.model("Program", programSchema);

app.use("/static", express.static("public/"));
app.use("/static/css", express.static("node_modules/bootstrap-material-design/dist/css"));
app.use("/static/js", express.static("node_modules/bootstrap-material-design/dist/js"));
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(favicon(__dirname + "/public/favicon.png"));

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
    },
    {
        name: "Squat",
        desc: "Stand straight with feet hip-width apart. Stand with your feet apart, directly under your hips, and place your hands on your hips." +
        "Tighten your stomach muscles. Lower down, as if sitting and then straighten your legs."
    }
];

// Controllers
app.get("/", function (req, res) {

    programModel.find({}, function (err, dbPrograms) {
        var programMap = [];

        dbPrograms.forEach(function (program) {
            programMap.push(program);
        });
        res.render("index", {
            title: "Fitness Helper 3000",
            message: "Welcome to Fitness Helper 3000",
            programs: programMap
        });
    });
});

app.get("/program/:id", function (req, res) {
    programModel.findOne({_id: req.params.id}, "title completed exercises").exec(function (err, program) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            if (program == undefined) {
                res.render("program", {title: "Program", program: {title: "Program not found"}});
                return false;
            }
            program.exercises.forEach(function (exercise) {
                let exerciseInfo = exercises[exercise.exerciseInfo];
                exercise.name = exerciseInfo.name;
                exercise.desc = exerciseInfo.desc;
            });
            res.render("program", {title: "Program", id: req.params.id, program: program});
        }
    });
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
    let programName = req.body.programName;

    var program = new programModel({title: programName, completed: 0, exercises: []})

    program.save(function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.send("success");
        }
    });

});

app.post("/program/:id/add-exercise", function (req, res) {
    let received = req.body.chosenExercises;
    let id = req.params.id;

    if (received.length <= 0 || received == undefined) {
        res.sendStatus(400);
    }

    let receivedExercises = [];
    received.forEach(function (element) {
        if (exercises[element.id] == undefined) {
            res.status(400).send("Couldn't find the exercise with the given ID");
        }

        let exercise = {
            exerciseInfo: element.id,
            sets: element.sets,
            reps: element.reps
        };

        receivedExercises.push(exercise);
    });

    programModel.findOneAndUpdate({_id: id}, {
        $push: {"exercises": {$each: receivedExercises}}
    }, function (err, model) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.json({url: "/program/" + id});
        }
    });
});

app.post("/program/:id/complete", function (req, res) {
    let id = req.params.id;

    programModel.findOneAndUpdate({_id: id}, {
        $inc: {completed: 1}
    })
        .select("completed")
        .exec(function (err, model) {
            if (err) {
                console.log("Error updating completed value of program");
                console.log(err);
            } else {
                let newValue = model.completed + 1;
                res.send(newValue.toString());
            }
        });
});

app.post("/create-exercise", function (req, res) {
    res.send("not implemented");
    return;

    // Not needed. It was a nice-to-have feature.
    if (req.body.title == undefined || req.body.description == undefined) {
        res.sendStatus(400);
        return false;
    }

    let exercise = {
        name: req.body.title,
        desc: req.body.description
    };

    exercises.push(exercise);

    res.redirect("/");
});

app.delete("/program/:id/exercise/:exercise", function (req, res) {
    let programId = req.params.id;
    let exerciseId = req.params.exercise;

    programModel.findOneAndUpdate({_id: programId}, {
        $pull: {exercises: {_id: exerciseId}}
    }).exec(function (err, model) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.send("success");
        }
    });
});

app.delete("/program/:id/delete", function (req, res) {

    let programId = req.params.id;
    programModel.remove({_id: programId}, function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.send("success");
        }
    });
});

// Start server listener
app.listen(3000, () => {
    console.log("listening on port 3000");
});
