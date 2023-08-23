const express = require("express");
const { register, login, profile } = require("../controller/AuthController");
const router = express.Router();

router.post("/register", register);
router.post("/login",  login);
router.get("/profile", profile);

module.exports = router;
