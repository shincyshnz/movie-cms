// const { Error } = require("mongoose");
const { handler } = require("../middlware/upload");
const movieModel = require("../model/movieModel");

const movieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await movieModel.findById(id);
        res.json(movie);
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

const movies = async (req, res) => {
    try {
        const movieList = await movieModel.find().populate("genres").sort('-createdAt');
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
        await movieModel.create({ title, rating, genres: genresArr, url: movieImageUrl, cloudinaryID: res.locals.movieImageData.public_id });
        res.json(movieImageUrl);

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const editMovies =  async (req, res) => {
    try {
        const { movieId, title, rating, genres } = req.body;
        const genresArr = genres?.split(",");

        // const movieImageUrl = res.locals.movieImageData?.secure_url
        // const isExists = await movieModel.findByIdAndUpdate({ _id: movieId }, { $set: {title, rating, genres: genresArr, url: movieImageUrl, cloudinaryID: res.locals.movieImageData?.public_id } }, { new: true });
        // if (!isExists) {
        //     throw new Error("The Movie does not exists!");
        // }
        // res.json(isExists);
        res.json(req.body);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = {
    movieById, movies, addMovies, editMovies
};