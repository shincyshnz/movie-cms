const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDb = require("./config/db");
const genreRoutes = require("./routes/genreRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended:true,limit:'50mb'}));

connectDb();

app.use('/api/genre', genreRoutes);
app.use('/api/movies',moviesRoutes);

const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})