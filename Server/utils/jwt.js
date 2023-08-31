const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET_KEY,{
        expiresIn: "5s"
    });
};

module.exports = {
    generateAccessToken
}
