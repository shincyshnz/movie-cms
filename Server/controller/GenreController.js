const genreModel = require("../model/genreModel");

const genre = async (req, res) => {
    try {
        const genreList = await genreModel.find().select("_id name");
        res.json(genreList);
    } catch (error) {
        res.json({
            message: error.message,
        })
    }
};

const addGenre = async (req, res) => {
    try {
        const { name } = req.body;
        const data = await genreModel.create({ name: name });
        res.json(data._id);
    } catch (error) {
        res.json({
            message: error.message,
        })
    }
};

const editGenre = async (req, res) => {
    try {
        const { _id, name } = req.body;
        const data = await genreModel.findOneAndUpdate({ _id }, { name }, { new: true });
        res.json(data);
    } catch (error) {
        res.json({
            message: error.message,
        })
    }
};

const deleteGenre = async (req, res) => {
    try {
        const { _id } = req.body;
        const data = await genreModel.findByIdAndDelete(_id);
        res.json(data._id);
    } catch (error) {
        res.json({
            message: error.message,
        })
    }
};

module.exports = { genre, addGenre, editGenre, deleteGenre };