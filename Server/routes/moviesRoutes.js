const express = require("express");
const {movies,addMovies} = require("../controller/MovieController");
const { handler } = require("../middlware/upload");
const router = express.Router();

router.get("/",movies);
router.post("/",handler,addMovies);

module.exports = router;