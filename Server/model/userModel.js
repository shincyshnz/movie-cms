const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: [true, "Username field cannot be empty"],
        unique: [true, "Email Already exists"],
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email field cannot be empty"],
        unique: [true, "Email Already exists"],
    },
    password: {
        type: String,
        trim: true,
        required: [true, "Password field cannot be empty"]
    },
    watchLater: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Movies"
    }]
}, { timestamps: true });

module.exports = {
    Users: mongoose.model("Users", userSchema)
}