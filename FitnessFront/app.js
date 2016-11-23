let express = require("express");
let morgan = require("morgan");
let path = require("path");

let app = express();

app.use((req, res, next) => {
    let result = req.url.match(/\/|^(.*)\.js|^(.*)\.html/);
    if (!result) {
        return res.sendStatus(403);
    }
    next();
});

app.use("/app", express.static("app"));
app.use("/scripts", express.static("node_modules/core-js/client"));
app.use("/scripts", express.static("node_modules/zone.js/dist"));
app.use("/scripts", express.static("node_modules/reflect-metadata"));
app.use("/scripts", express.static("node_modules/systemjs/dist"));
app.use("/angular", express.static("node_modules/@angular"));
app.use("/rxjs", express.static("node_modules/rxjs"));

registerFile("index.express.html", "/");
registerFile("systemjs.config.express.js", "/systemjs.config.js");
registerFile("style.css");

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, "index.express.html"));
});

// Start listening
let port = process.env.PORT || 3000;
app.listen(port, () => console.log("Listening on port " + port + "..."));

function registerFile(pathName, url) {
    if (url)
        app.get(url, (req, res) => res.sendFile(path.join(__dirname, pathName)));
    else
        app.get("/" + pathName, (req, res) => res.sendFile(path.join(__dirname, pathName)));
}