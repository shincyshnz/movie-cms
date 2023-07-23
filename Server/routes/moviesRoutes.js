const express = require("express");
const { movieById, movies, addMovies, editMovies } = require("../controller/MovieController");
const { handler,handlerEdit } = require("../middlware/upload");
const router = express.Router();

router.get("/:id", movieById);
router.get("/", movies);
router.post("/", handler, addMovies);
// router.put("/",handlerEdit, editMovies);

module.exports = router;