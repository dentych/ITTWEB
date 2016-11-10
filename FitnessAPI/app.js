let express = require("express");
let app = express();
let bodyparser = require("body-parser");

let userRoutes = require("./routes/user");

app.use(bodyparser.json());

app.use("/api", userRoutes);

app.get("/", function (req, res) {
    res.send("ska vi knep?!");
});

app.listen(3000, function () {
    console.log("Fitness API started.. Listening on port 3000");
});