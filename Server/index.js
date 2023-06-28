const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDb = require("./config/db");
const genreRoutes = require("./routes/genreRoutes");
const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.use('/api/genre', genreRoutes);

const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})