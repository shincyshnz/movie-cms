const { Users } = require("../model/userModel");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
    const { email, password } = req.body;
    const saltPassword = 10;
    console.log(req.body);

    // Check if user exists
    try {
        const isExists = await Users.findOne({ email });
        if (isExists) {
            return res.status(404).json({ message: "User already exists" });
        }
        const hashedPass = await bcrypt.hash(password, saltPassword);
        await Users.create({ email, password: hashedPass })

        res.json({
            message: "Account has been created"
        });
    } catch (error) {
        res.json({
            message: error.message,
        })
    }
};


const login =  (req, res) => {
    console.log(req.body);
    res.json("logged");
};

const profile =  (req, res) => {
    console.log(req.body);
    res.json("Profile");
};

module.exports = { register, login, profile };