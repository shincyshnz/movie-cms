const { Users } = require("../model/userModel");
const { generatedPasswordHash, comparePasswordHash } = require("../utils/bcrypt");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwt");

const register = async (req, res) => {
    const { username, email, password } = req.body;
    const SALT = 10;

    // Check if user exists, if not store use data in to db with hashed password 
    try {
        const isExists = await Users.findOne({ email });
        if (isExists) {
            return res.status(404).json({ message: "User already exists" });
        }
        const hashedPass = await generatedPasswordHash(password, SALT);
        await Users.create({ email, username, password: hashedPass })

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
            return res.status(404).json({ message: "User doesnot exists.!" });
        }

        const validPassword = await comparePasswordHash(password, user.password);
        if (!validPassword) {
            return res.status(404).json({ message: "Username/Paswword is not valid!" });
        }

        // Generate Access Token
        const accessToken = generateAccessToken(user._id);
        // Generate Refresh Token
        const refreshToken = generateRefreshToken(user._id);

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
        })
        res.json({ _id: user._id, email: user.email, accessToken });

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
                populate: { path: 'genres', select: 'name' }
            })
            .sort({ watchLaer: -1 });
        res.json(watchLaterMovies.watchLater);
    } catch (error) {
        res.json({
            message: error.message
        });
    }
};

const deleteWatchLater = async (req, res) => {
    const { movieId } = req.params;
    const { userId } = req.body;

    try {
        const removedMovieId = await Users.findByIdAndUpdate(
            userId,
            { $pull: { watchLater: movieId } },
            { new: true }
        );

        if (removedMovieId) {
            res.status(200).json({
                message: `${movieId} removed from watch later successfully`
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
};

const refreshToken = async (req, res) => {
    // refresh token
    console.log(req.cookies["refreshtoken"], "====req.cookies.refreshToken");
    console.log(req.headers['Host'], "====Host");
    try {
        if (!req.cookies.refreshToken) {
            throw new Error("Refresh token not found in the cookie.");
          }
        const userId = verifyRefreshToken(req.cookies.refreshToken);
    
        if (!userId) {
            return res.status(401).json({
                message: "Refresh Token has expired!."
            });
        };
    
        // Generate Access Token
        const accessToken = generateAccessToken(userId);
        // Generate Refresh Token
        const refreshToken = generateRefreshToken(userId);
    
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
        });
        res.json({ accessToken });
    } catch (error) {
        res.status(401).json({
            message : "Refresh token not found in the cookie."
        })
    }
};

const logout = async (req, res) => {
    res.clearCookie("refreshToken");
    res.json({ message: "Logged Out" });
};

module.exports = { register, login, watchLater, addWatchLater, deleteWatchLater, refreshToken, logout };