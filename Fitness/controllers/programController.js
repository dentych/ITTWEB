"use strict";
let mongoose = require("mongoose");

let exercises = require("../database/exercises");

let programSchema = require("../database/program");
let programModel = mongoose.model("Program", programSchema);

module.exports.getIndex = function (req, res) {
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
};

module.exports.getProgramById = function (req, res) {
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
};

module.exports.getProgramAddExercise = function (req, res) {
    res.render("add-exercise", {
        title: "Add exercises", id: req.params.id,
        exercises: exercises
    });
};

module.exports.postProgramIndex = function (req, res) {
    let programName = req.body.programName;

    var program = new programModel({title: programName, completed: 0, exercises: []});

    program.save(function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.send("success");
        }
    });
};

module.exports.postProgramAddExercise = function (req, res) {
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
};

module.exports.postProgramComplete = function (req, res) {
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
};

module.exports.deleteProgramExercise = function (req, res) {
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
};

module.exports.deleteProgramById = function (req, res) {
    let programId = req.params.id;
    programModel.remove({_id: programId}, function (err) {
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.send("success");
        }
    });
};
