const mongoose = require("mongoose");

const genreModel = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "Name Cannot be empty."],
            unique: [true, "No duplicate values allowed"]
        }
    }, { timestamps: true });

module.exports = mongoose.model("Genre", genreModel);