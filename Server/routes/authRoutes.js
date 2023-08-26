const express = require("express");
const { register, login, watchLater, addWatchLater } = require("../controller/AuthController");
const checkAuth = require("../middlware/checkAuth");
const router = express.Router();

router.post("/register", register);
router.post("/login",  login);
router.get("/watch-later", checkAuth, watchLater);
router.put("/watch-later", checkAuth, addWatchLater);

module.exports = router;
