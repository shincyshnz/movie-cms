const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDb = require("./config/db");
const genreRoutes = require("./routes/genreRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.use('/api/genre', genreRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})