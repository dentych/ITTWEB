let dotenv = require("dotenv").config();
let express = require("express");
let crypto = require("crypto");
let jwt = require("jsonwebtoken");

module.exports = function (userModel) {
    let router = express.Router();

    router.post("/register", function (req, res) {
        let email = req.body.email;
        let passwd = req.body.password;

        if (!email || !passwd) {
            res.status(400).json({msg: "Missing email or password"});
            return false;
        }

        let salt = crypto.randomBytes(16).toString("hex");
        let hashedPasswd = generateHash(passwd, salt);

        let user = new userModel({
            email: email,
            hash: hashedPasswd,
            salt: salt
        });

        userModel.findOne({email: email}, "email", function (err, foundUser) {
            if (err) sendError(err, res);
            if (!foundUser) {
                user.save(saveUserCallback);
            } else {
                res.status(409).json({msg: "user already exists"});
            }
        });

        let saveUserCallback = function (err, model) {
            if (err) sendError(err, res);
            else {
                let token = generateToken(model);
                res.json({msg: "user created", token: token});
            }
        };
    });

    router.post("/login", function (req, res) {
        let email = req.body.email;
        let password = req.body.password;

        if (!email || !password) {
            res.status(400).json({msg: "Missing email or password"});
            return false;
        }

        userModel.findOne({email: email}, function (err, user) {
            if (err) {
                sendError(err, res);
                return;
            }

            if (user && authUser(user, password)) {
                let token = generateToken(user);
                res.json({msg: "successfully logged in", token: token});
            } else {
                res.status(409).json({msg: "Wrong username or password"});
            }
        });
    });

    return router;
};

function generateToken(user) {
    return jwt.sign(
        {userId: user._id, email: user.email},
        process.env.JWT_KEY,
        {expiresIn: "24h"}
    );
}

function authUser(user, password) {
    let hash = generateHash(password, user.salt);

    return (hash == user.hash);
}

function generateHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1000, 256, "sha512").toString("hex");
}

function sendError(err, response) {
    console.log(err);
    response.status(500).json({msg: "Internal error happened during user creation"});
}
