const genreModel = require("../model/genreModel");

const genre = async (req, res) => {
    try {
        const genreList = await genreModel.find().select("_id name");
        res.json(genreList);
    } catch (error) {
        console.log(error);
    }
};

const addGenre = async (req, res) => {
    try {
        const { name } = req.body.data;
        console.log(name);
        const data = await genreModel.create({ name: name });
        res.json(data._id);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { genre, addGenre };