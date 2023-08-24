const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers['x-token'];
        console.log(token);
        if (!token) {
            res.status(404).json({
                message: "Access Denied!"
            });
        }

        const validToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
        console.log(validToken);
        if (!validToken) {
            res.status(404).json({
                message: "Unauthorized Access!"
            });
        }
        req.body.userId = validToken._id
        next();

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

module.exports = checkAuth;