const express = require("express");
const {
    register,
    login,
    watchLater,
    addWatchLater,
    deleteWatchLater,
    refreshToken,
    logout,
    emailVerification,
    otpVerification,
    resetPassword
} = require("../controller/AuthController");
const checkAuth = require("../middlware/checkAuth");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/watch-later", checkAuth, addWatchLater);
router.get("/watch-later", checkAuth, watchLater);
router.delete("/watch-later/:movieId", checkAuth, deleteWatchLater);
router.get("/refresh-token", refreshToken);
router.get("/logout", logout);
router.post("/send-otp", emailVerification);
router.post("/verify-otp", otpVerification);
router.post("/reset-password", resetPassword);

module.exports = router;
