const express = require("express");
const { register, login, watchLater } = require("../controller/AuthController");
const checkAuth = require("../middlware/checkAuth");
const router = express.Router();

router.post("/register", register);
router.post("/login",  login);
router.get("/watch-later", checkAuth, watchLater);

module.exports = router;
