const crypto = require('crypto');
const User = require("../models/User");

exports.signup = (req, res) => {
    var token = crypto.randomBytes(32).toString("hex");
    var newUser = new User({ email: req.body.email, token: token });

    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: `Your account couldn't be saved! ${err}`
            });
        } else {
            res.json({
                success: true,
                message: "Your account was saved.",
                token: token
            });
        }
    });
}

exports.login = (req, res) => {
    const authenticate = User.authenticate();
    authenticate(req.body.email, req.body.password, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: `Something went wrong! ${err}`
            });
        } else if (user) {
            res.json({
                success: true,
                message: "Login successful.",
                token: user.token
            });
        } else {
            res.json({
                success: false,
                message: "Login unsuccessful. Please double-check your credentials."
            });
        }
    });
}

exports.changePassword = (req, res) => {
    const authenticate = User.authenticate();
    authenticate(req.body.email, req.body.password, (err, user) => {
        if (err) {
            res.json({
                success: false,
                message: `Something went wrong while logging in! ${err}`
            });
        } else if (user) {
            user.changePassword(req.body.password, req.body.newpassword, (err) => {
                if (err) {
                    res.json({
                        success: false,
                        message: `Something went wrong while changing the password! ${err}`
                    })
                } else {
                    res.json({
                        success: true,
                        message: "Password changed successfully."
                    });
                }
            });
        } else {
            res.json({
                success: false,
                message: "Login unsuccessful. Please double-check your credentials."
            });
        }
    });
}