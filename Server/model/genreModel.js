const mongoose = require("mongoose");

const genreSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            lowercase: true,
            required: [true, "Name Cannot be empty."],
            unique: [true, "No duplicate values allowed"]
        }
    }, { timestamps: true });

module.exports = mongoose.model("Genre", genreSchema);