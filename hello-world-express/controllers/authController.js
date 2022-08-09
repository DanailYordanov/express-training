const crypto = require('crypto');
const User = require("../models/User");

exports.signup = (req, res, next) => {
    var token = crypto.randomBytes(32).toString("hex");
    var newUser = new User({ email: req.body.email, token: token });

    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            next(err);
        } else {
            res.json({
                success: true,
                message: "Your account was saved.",
                token: token
            });
        }
    });
}

exports.login = (req, res, next) => {
    const authenticate = User.authenticate();
    authenticate(req.body.email, req.body.password, (err, user) => {
        if (err) {
            next(err);
        } else if (user) {
            res.json({
                success: true,
                message: "Login successful.",
                token: user.token
            });
        } else {
            var err = new Error("Login unsuccessful. Please double-check your credentials.");
            next(err);
        }
    });
}

exports.changePassword = (req, res, next) => {
    const authenticate = User.authenticate();
    authenticate(req.body.email, req.body.password, (err, user) => {
        if (err) {
            next(err);
        } else if (user) {
            user.changePassword(req.body.password, req.body.newpassword, (err) => {
                if (err) {
                    next(err);
                } else {
                    res.json({
                        success: true,
                        message: "Password changed successfully."
                    });
                }
            });
        } else {
            var err = new Error("Login unsuccessful. Please double-check your credentials.");
            next(err);
        }
    });
}