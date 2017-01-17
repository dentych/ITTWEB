let express = require("express");

let programController = require("../controllers/programController");

module.exports = function () {
    var router = express.Router();

    router.route("/:id/add-exercise")
        .get(programController.getProgramAddExercise)
        .post(programController.postProgramAddExercise);

    router.route("/:id")
        .get(programController.getProgramById)
        .delete(programController.deleteProgramById);

    router.get("/", programController.getIndex);

    router.post("/", programController.postProgramIndex);

    router.post("/:id/complete", programController.postProgramComplete);

    router.delete("/:id/exercise/:exercise", programController.deleteProgramExercise);

    return router;
};