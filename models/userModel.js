const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please add the user name"],
    },
    username: {
        type: String,
        required: [true, "Please add the user email address"],
        unique: [true, "Email Address already taken"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
}, {
    timestamp: true,
}
);

module.exports = mongoose.model("User", userSchema);