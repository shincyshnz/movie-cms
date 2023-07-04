const express = require("express");
const { genre, addGenre, editGenre, deleteGenre } = require("../controller/GenreController");
const router = express.Router();

router.get("/", genre);
router.post("/", addGenre);
router.put("/", editGenre);
router.delete("/", deleteGenre);

module.exports = router;