let express = require("express");
let app = express();
let bodyparser = require("body-parser");
let mongoose = require("mongoose");

mongoose.connect("mongodb://192.168.99.100/fitnessapi");
mongoose.Promise = global.Promise;

let userSchema = require("./database/userSchema");
let programSchema = require("./database/programSchema");

let userModel = mongoose.model("User", userSchema);
let programModel = mongoose.model("Program", programSchema);

app.use(bodyparser.json());

let userRoutes = require("./routes/userRoutes")(userModel);
app.use("/api", userRoutes);

let programRoutes = require("./routes/programRoutes")(programModel);
app.use("/api", programRoutes);

app.use(bodyparser.json());

app.get("/", function (req, res) {
    res.send("ska vi knep?!");
});

app.listen(3000, function () {
    console.log("Fitness API started.. Listening on port 3000");
});