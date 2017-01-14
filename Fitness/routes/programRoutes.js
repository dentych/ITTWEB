let express = require("express");

let ProgramController = require("../controllers/programController");
let programController = new ProgramController();

module.exports = function () {
    var router = express.Router();

    router.get("/", (req, res) =>
        programController.getIndex(req, res)
    );

    router.get("/program/:id", (req, res) =>
        programController.getProgramById(req, res)
    );

    router.get("/program/:id/add-exercise", (req, res) =>
        programController.getProgramAddExercise(req, res)
    );

    router.get("/create-exercise", function (req, res) {
        res.render("create-exercise")
    });

    router.post("/", (req, res) =>
        programController.postProgramIndex(req, res)
    );

    router.post("/program/:id/add-exercise", (req, res) =>
        programController.postProgramAddExercise(req, res)
    );

    router.post("/program/:id/complete", (req, res) =>
        programController.postProgramComplete(req, res)
    );

    router.post("/create-exercise", function (req, res) {
        res.send("not implemented");
    });

    router.delete("/program/:id/exercise/:exercise", (req, res) =>
        programController.deleteProgramExercise(req, res)
    );

    router.delete("/program/:id/delete", (req, res) =>
        programController.deleteProgramById(req, res)
    );

    return router;
};