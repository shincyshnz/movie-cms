const movieModel = require("../model/movieModel")

const movies = async (req, res) => {
    try {
        // const movieList = await movieModel.find();
        // res.json(movieList);
        res.json("get end point")
    } catch (error) {
        console.log(error);
    }
};

const addMovies = async(req, res) => {
    try {
        const {title,rating,genres} = req.body;
        console.log(genres);
        const movieImageUrl = res.locals.movieImageData.secure_url
        const data = await movieModel.create({ title:title,rating:rating,genres:genres,url:movieImageUrl });
        res.json(res.locals.movieImageData.secure_url);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    movies, addMovies
};