let express = require("express");
let exercises = require("./exercises.js");

module.exports = function (programModel) {
    let router = express.Router();

    router.post("/programs", function (req, res) {
        let programName = req.body.programName;
        let userId = req.user.userId;

        var program = new programModel({title: programName, completed: 0, user: userId, exercises: []});

        if (programName == undefined) {
            res.status(400).json({msg: "I pitty the fool who doesnt remember to make a title!!!"});
            return false;
        }
        program.save(function (err, program) {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            } else {
                console.log("Created Program: " + programName);
                res.json({msg: "success", program: program});
            }
        });
    });

    router.get("/programs", function (req, res) {
        programModel.find({user: req.user.userId}, "title completed exercises").exec(function (err, program) {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            } else {
                if (program == undefined) {
                    res.json({title: "Program", program: {title: "Program not found"}});
                    return false;
                }
                if(program.exercises != undefined) {
                    program.exercises.forEach(function (exercise) {
                        let exerciseInfo = exercises[exercise.exerciseInfo];
                        exercise.name = exerciseInfo.name;
                        exercise.desc = exerciseInfo.desc;
                    });
                }
                res.json({msg: "success", program: program});
            }
        });
    });

    router.get("/programs/:id", function (req, res) {
        programModel.findOne({_id: req.params.id, user: req.user.userId}, "title completed exercises").exec(function (err, program) {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            } else {
                if (program == undefined) {
                    res.json({title: "Program", program: {title: "Program not found"}});
                    return false;
                }
                program.exercises.forEach(function (exercise) {
                    let exerciseInfo = exercises[exercise.exerciseInfo];
                    exercise.name = exerciseInfo.name;
                    exercise.desc = exerciseInfo.desc;
                });
                res.json({msg: "success", program: program});
            }
        });
    });

    router.post("/programs/:id/complete", function (req, res) {
        let id = req.params.id;
        let userId = req.user.userId;

        programModel.findOneAndUpdate({_id: id, user: userId}, {
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

    router.delete("/programs/:id", function (req, res) {
        let programId = req.params.id;

        programModel.findOneAndRemove({_id: programId, user: req.user.userId}, function (err, ret) {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            } else {
                console.log(ret);
                if(ret == null) {
                    res.json({msg: "no program were harmed during this request"});
                    return false;
                }
                res.json({msg: "successfully deleted program"});
            }
        });
    });

    // Exercise Requests *********************************************
    // user : 582c6e36e90b55171c1b3ef0
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ODJjNmUzNmU5MGI1NTE3MWMxYjNlZjAiLCJlbWFpbCI6ImFuZHlAbWFpbC5jb20iLCJpYXQiOjE0NzkzMDY4MTcsImV4cCI6MTQ3OTM5MzIxN30.weFuXWRw-p1ScwQ16LDJbLP5vQGgFFdWvTqexCgfOLE
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ODJjNmUzNmU5MGI1NTE3MWMxYjNlZjAiLCJlbWFpbCI6ImFuZHlAbWFpbC5jb20iLCJpYXQiOjE0NzkzMDcwMzMsImV4cCI6MTQ3OTM5MzQzM30.4Pg9zQe1V_Y9-N4opPGoO8O30C4q7xs0OQ-CF547a6w

    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ODJjN2RkMzY3ZGYzYTAxMjQ5ZWFjZDEiLCJlbWFpbCI6ImFhYUBtYWlsLmNvbSIsImlhdCI6MTQ3OTMxMDg2OSwiZXhwIjoxNDc5Mzk3MjY5fQ.zpvvPLPZHKmr3luusboX57dYUHyVQKbDdyYID5XR1FA


    router.post("/programs/:id/exercises", function (req, res) {
        let received = req.body.chosenExercises;
        let id = req.params.id;
        let req_fully_handled = true;
        let userId = req.user.userId;


        if (received == undefined || received.length == undefined || received.length <= 0) {
            res.sendStatus(400);
            return false;
        }

        let receivedExercises = [];
        received.every(function (element) {
            if (exercises[element.id] == undefined) {
                res.status(400).json({msg: "Couldn't find the exercise with the given ID: " + element.id});
                req_fully_handled = false;
                return false;
            }

            if (element.sets == undefined || element.reps == undefined) {
                res.status(400).json({msg: "Both set and repition fields must be filled out for the exercise with ID: " + element.id});
                req_fully_handled = false;
                return false;
            }

            let exercise = {
                exerciseInfo: element.id,
                sets: element.sets,
                reps: element.reps
            };
            receivedExercises.push(exercise);
            return true;
        });
        if (!req_fully_handled) {
            return false;
        }

        programModel.findOneAndUpdate({_id: id, user: userId}, {
            $push: {"exercises": {$each: receivedExercises}}
        }, {new: true}, function (err, model) {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            } else {
                if(model == null) {
                    res.json({msg: "No exercises were added, you may not have permission"});
                    return false;
                }
                res.json({msg: "Exercise added", program: model});
            }
        });
    });

    router.delete("/programs/:id/exercises/:exercise", function (req, res) {
        let programId = req.params.id;
        let exerciseId = req.params.exercise;
        let userId = req.user.userId;

        programModel.findOneAndUpdate({_id: programId, user: userId}, {
            $pull: {exercises: {_id: exerciseId}}
        }).exec(function (err, ret) {
            console.log(ret);
            if (err) {
                console.log(err);
                res.sendStatus(400);
            } else {
                if(ret == null) {
                    res.json({msg: "No exercise were harmed during this request, you may not have permissions"});
                    return false;
                }
                res.json({msg: "Successfully removed the exercise"});
            }
        });
    });

    return router;
};

