const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        index: true,
        required: [true, "can't be blank"],
    }


}, { timestamps: true });

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});
const User = mongoose.model('User', UserSchema);

module.exports = User;