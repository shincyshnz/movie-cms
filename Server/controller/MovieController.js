const movieModel = require("../model/movieModel");

const movies = async (req, res) => {
    try {
        const movieList = await movieModel.find();
        res.json(movieList);
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

const addMovies = async(req, res) => {
    try {
        const {title,rating,genres} = req.body;
        const movieImageUrl = res.locals.movieImageData.secure_url
        const data = await movieModel.create({ title:title,rating:rating,genres:genres,url:movieImageUrl });
        res.json(res.locals.movieImageData.secure_url);
    } catch (error) {
        res.json({
            message: error.message,
        });
    }
};

module.exports = {
    movies, addMovies
};