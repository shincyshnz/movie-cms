const { Users } = require("../model/userModel");
const { generatedPasswordHash, comparePasswordHash } = require("../utils/bcrypt");
const { generateAccessToken } = require("../utils/jwt");

const register = async (req, res) => {
    const { email, password } = req.body;
    const SALT = 10;

    // Check if user exists, if not store use data in to db with hashed password 
    try {
        const isExists = await Users.findOne({ email });
        if (isExists) {
            return res.status(404).json({ message: "User already exists" });
        }
        const hashedPass = await generatedPasswordHash(password, SALT);
        await Users.create({ email, password: hashedPass })

        res.json({
            message: "Account has been created"
        });
    } catch (error) {
        res.json({
            message: error.message
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Username/Paswword is not valid!" });
        }

        const validPassword = await comparePasswordHash(password, user.password);
        if (!validPassword) {
            return res.status(404).json({ message: "Username/Paswword is not valid!" });
        }

        // Generate Access Token
        const accessToken = generateAccessToken(user._id);

        res.status(200).json({ _id: user._id, email: user.email, accessToken });

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const addWatchLater = async (req, res) => {
    const { movieId, userId } = req.body;

    try {
        const isUserExists = await Users.findById({ _id: userId });
        if (!isUserExists) {
            res.status(404).json({
                message: "User doesnot Exists!"
            });
        }
        let watchLaterMovies = isUserExists.watchLater || [];

        if (isUserExists.watchLater.indexOf(movieId) !== -1) {
            return res.status(404).json({
                message: "Movie Already exists in watch later"
            });
        }
        watchLaterMovies.push(movieId);
        const updatedData = await Users.findByIdAndUpdate({ _id: userId }, { watchLater: watchLaterMovies }, { new: true });
        updatedData && res.status(200).json();

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const watchLater = async (req, res) => {
    const { userId } = req.body;
    try {

        const watchLaterMovies = await Users
            .findById({ _id: userId })
            .populate({
                path: 'watchLater',
                populate: { path: 'genres', select : 'name' }
              })
            .sort('-createdAt');
        res.json(watchLaterMovies.watchLater);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

module.exports = { register, login, watchLater, addWatchLater };