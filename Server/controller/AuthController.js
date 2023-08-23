const { Users } = require("../model/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    const { email, password } = req.body;
    const salt = 10;

    // Check if user exists, if not store use data in to db with hashed password 
    try {
        const isExists = await Users.findOne({ email });
        if (isExists) {
            return res.status(404).json({ message: "User already exists" });
        }
        const hashedPass = await bcrypt.hash(password, salt);
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
    console.log(req.body);
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Username/Paswword is not valid!" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(404).json({ message: "Username/Paswword is not valid!" });
        }

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

const profile = (req, res) => {
    console.log(req.body);
    res.json("Profile");
};

module.exports = { register, login, profile };