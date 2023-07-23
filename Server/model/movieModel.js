const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Movie name  cannot be empty"]
    },
    url: {
        type: String
    },
    cloudinaryID: { type: String },
    rating: {
        type: Number
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre"
    }],
}, { timestamps: true });

module.exports = mongoose.model("Movies", movieSchema);