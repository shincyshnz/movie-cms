// const { Error } = require("mongoose");
// const { handler } = require("../middlware/upload");
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

        const movieImageUrl = res.locals.movieImageData?.secure_url
        await movieModel.create({ title, rating, genres: genresArr, url: movieImageUrl });
        res.json(movieImageUrl);

    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const editMovies = async (req, res) => {
    try {
        let updatedMovie;
        const { movieId, title, rating, genres } = req.body;
        const genresArr = genres?.split(",");

        updatedMovie = {
            title: title,
            rating: rating,
            genres: genresArr,
        };

        if (res.locals.movieImageData) {
            const movieImageUrl = res.locals.movieImageData?.secure_url;
            updatedMovie.url = movieImageUrl;
        }

        const isExists = await movieModel.findByIdAndUpdate(movieId, updatedMovie, { new: true });
        res.json(isExists);
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const deleteMovies = async (req, res) => {
    try {
        const { id } = req.params;
        const removedMovie = await movieModel.findOneAndRemove({ _id: id });
        if (removedMovie) {
            res.status(200).json(removedMovie);
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = {
    movieById, movies, addMovies, editMovies, deleteMovies
};