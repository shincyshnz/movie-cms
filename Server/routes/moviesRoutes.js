const express = require("express");
const { movieById, movies, addMovies, editMovies } = require("../controller/MovieController");
const { handler } = require("../middlware/upload");
const router = express.Router();

router.get("/:id", movieById);
router.get("/", movies);
router.post("/", handler, addMovies);
router.put("/",handler, editMovies);

module.exports = router;