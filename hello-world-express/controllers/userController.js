const User = require("../models/User");

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'succes',
            results: users.length,
            data: {
                users,
            }
        })
    } catch (e) {
        console.log(e);
        res.status(400).json({
            status: 'fail'
        })
    }
}