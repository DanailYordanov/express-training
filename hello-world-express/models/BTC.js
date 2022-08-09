const mongoose = require("mongoose");

const BTCSchema = new mongoose.Schema({
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: [true, "can't be blank"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
}, { timestamps: true });

const BTC = mongoose.model('BTC', BTCSchema);

module.exports = BTC;