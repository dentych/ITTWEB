let express = require("express");
let app = express();
let bodyparser = require("body-parser");
let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/fitnessapi");
mongoose.Promise = global.Promise;

let userSchema = new mongoose.Schema({
    email: String,
    password: String,
    salt: String
});

let userModel = mongoose.model("User", userSchema);

app.use(bodyparser.json());

let userRoutes = require("./routes/user")(userModel);
app.use("/api", userRoutes);

app.get("/", function (req, res) {
    res.send("ska vi knep?!");
});

app.listen(3000, function () {
    console.log("Fitness API started.. Listening on port 3000");
});