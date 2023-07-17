const { Error } = require("mongoose");
const movieModel = require("../model/movieModel");
const { handler } = require("../middlware/upload");

const movies = async (req, res) => {
    try {
        const movieList = await movieModel.find().populate("genres");
        res.json(movieList);
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

const addMovies = async (req, res) => {
    try {
        const { title, rating, genres } = req.body;
        const genresArr = genres.split(",");
        // const isExists = await movieModel.findOne({ title });
        // if (isExists) {
        //     throw new Error("The Movie already exists!");
        // }

        const movieImageUrl = res.locals.movieImageData.secure_url
        const data = await movieModel.create({ title, rating, genres:genresArr, url: movieImageUrl });
        res.json(res.locals.movieImageData.secure_url);

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = {
    movies, addMovies
};