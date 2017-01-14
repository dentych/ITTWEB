let express = require("express");

let programController = require("../controllers/programController");

module.exports = function () {
    var router = express.Router();

    router.get("/", programController.getIndex);

    router.get("/program/:id", programController.getProgramById);

    router.get("/program/:id/add-exercise", programController.getProgramAddExercise);

    router.get("/create-exercise", function (req, res) {
        res.render("create-exercise")
    });

    router.post("/", programController.postProgramIndex);

    router.post("/program/:id/add-exercise", programController.postProgramAddExercise);

    router.post("/program/:id/complete", programController.postProgramComplete);

    router.post("/create-exercise", function (req, res) {
        res.send("not implemented");
    });

    router.delete("/program/:id/exercise/:exercise", programController.deleteProgramExercise);

    router.delete("/program/:id/delete", programController.deleteProgramById);

    return router;
};