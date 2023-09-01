const express = require("express");
const { register, login, watchLater, addWatchLater, deleteWatchLater} = require("../controller/AuthController");
const checkAuth = require("../middlware/checkAuth");
const router = express.Router();

router.post("/register", register);
router.post("/login",  login);
router.put("/watch-later", checkAuth, addWatchLater);
router.get("/watch-later",checkAuth, watchLater);
router.delete("/watch-later/:movieId", checkAuth, deleteWatchLater);

module.exports = router;
