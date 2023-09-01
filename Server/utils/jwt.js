const jwt = require("jsonwebtoken");

const generateAccessToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.ACCESS_TOKEN_SECRET_KEY,{
        expiresIn: "15s",
    });
};

const generateRefreshToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.RFERESH_TOKEN_SECRET_KEY,{
        expiresIn: "1y",
    });
};



module.exports = {
    generateAccessToken,
    generateRefreshToken
}
