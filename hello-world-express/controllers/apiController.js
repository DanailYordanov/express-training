const BTC = require("../models/BTC");
const User = require("../models/User");

exports.getLastPrice = async (req, res, next) => {
    try {
        const lastPrice = await BTC.findOne().sort({ createdAt: -1 }).populate('user');

        if (lastPrice) {
            res.json({
                success: true,
                data: {
                    currency: "USD",
                    price: lastPrice.price,
                    updated_by_user: lastPrice.user.email,
                    created_at: lastPrice.createdAt
                }
            });
        } else {
            res.json({
                success: false,
                message: "There are no records in the DB."
            })
        }
    } catch (err) {
        next(err);
    }
}

exports.updatePrice = async (req, res, next) => {
    try {
        const user = await User.findOne({ token: req.body.token });

        if (user) {
            var dataResponse = await fetch("https://api.coindesk.com/v1/bpi/currentprice.json");
            var dataJson = await dataResponse.json();

            var updatedPrice = new BTC({
                price: dataJson['bpi']['USD']['rate_float'],
                user: user
            })

            updatedPrice.save((err) => {
                if (err) {
                    next(err);
                }
            });

            res.json({
                success: true,
                data: {
                    currency: "USD",
                    new_price: dataJson['bpi']['USD']['rate_float']
                },
                message: "BTC price updated successfully."
            });
        } else {
            res.json({
                success: false,
                message: "Invalid token!"
            });
        }
    } catch (err) {
        next(err);
    }
}