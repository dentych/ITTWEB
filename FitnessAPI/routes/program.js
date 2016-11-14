let express = require("express");
let exercises = require("./exercise.js");

module.exports = function(programModel) {
    let router = express.Router();

    router.post("/program", function (req, res) {
        let programName = req.body.programName;

        var program = new programModel({title: programName, completed: 0, exercises: []});

        console.log("Created Program: " + programName);

        if(programName == undefined) {
            res.status(400).json({msg: "i pitty the fool!!"});
            return false;
        }
        program.save(function (err) {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            } else {
                res.send("success");
            }
        });
    });

    router.get("/program/:id", function (req, res) {
        programModel.findOne({_id: req.params.id}, "title completed exercises").exec(function (err, program) {
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
                res.json({title: "Program", id: req.params.id, program: program});
            }
        });
    });

    router.delete("/program/:id", function (req, res) {

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

    return router;
};

