const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Movie name  cannot be empty"]
    },
    url:{
        type:String
    },
    rating: {
        type: Number
    },
    genres: {
        type:String
    },
}, { timestamps: true });

module.exports = mongoose.model("Movies",movieSchema);