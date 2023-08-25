const { Users } = require("../model/userModel");
const { generatedPasswordHash, comparePasswordHash } = require("../utils/bcrypt");
const { generateAccessToken } = require("../utils/jwt");

const register = async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists, if not store use data in to db with hashed password 
    try {
        const isExists = await Users.findOne({ email });
        if (isExists) {
            return res.status(404).json({ message: "User already exists" });
        }
        const hashedPass = await generatedPasswordHash(password, salt);
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

const watchLater = async (req, res) => {
    const userId = req.body.userId;

    const watchLaterMovies = await Users.findById({ _id: userId }).populate('movies');
    res.json(watchLaterMovies);
};

module.exports = { register, login, watchLater };