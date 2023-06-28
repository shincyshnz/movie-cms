const express = require("express");
const { genre, addGenre } = require("../controller/GenreController");
const router = express.Router();

router.get("/", genre);
router.post("/", addGenre);

module.exports = router;