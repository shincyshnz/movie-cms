const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDb = require("./config/db");
const genreRoutes = require("./routes/genreRoutes");
const moviesRoutes = require("./routes/moviesRoutes");
const authRoutes = require("./routes/authRoutes");
const { notificationRouter } = require("./routes/notificationRoutes");
const cookieParser = require("cookie-parser");
const app = express();
connectDb();

app.use(express.json());
app.use(cors({
    // Specifying domain of frontend to store refresh token as httpOnly cookie
    // origin : ["http://localhost","http://localhost:5173","http://localhost:5174"],
    // origin:["https://movie-cms-movies-lma4rhkp5-shincyshnz.vercel.app/"],
    origin: ["https://movie-cms-moies-app.onrender.com/"],
    credentials : true,
    cookie:{
        sameSite : "none",
        secure:true,
    }
}));
app.use(cookieParser());

app.use('/api/genre', genreRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/notifications/sse', notificationRouter);


const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
})