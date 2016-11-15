let express = require("express");

module.exports = function (logEntryModel) {
    let router = express.Router();

    router.get("/logentries/:userId", function (req, res) {
        let id = req.params.userId;

        if (!id) {
            res.status(400).json({msg: "User id needed"});
            return false;
        }

        logEntryModel.find({user: id}).exec(function (err, logEntries) {
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Error happened when finding logEntry.", error: err.message});
                return false;
            } else {
                res.json({msg: "success", logEntries: logEntries});
            }
        });
    });

    router.post("/logentries", function (req, res) {
        let userId = req.body.userId;
        let programName = req.body.programName;

        if (!userId || !programName) {
            res.status(400).json({msg: "User id and program name are required"});
            return false;
        }

        let logEntry = new logEntryModel({
            user: userId,
            programName: programName,
            timestamp: new Date()
        });

        logEntry.save(function (err, model) {
            if (err) {
                console.log(err);
                res.status(500).json({msg: "Failed to create log entry."});
                return false;
            } else {
                res.json({msg: "success", logEntry: model});
            }
        });
    });

    return router;
};