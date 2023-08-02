# TMDB

TMDB is a web app built using React, Express and MongoDB. This app helps users to add, delete and update movie data including title, poster image, rating and genre.

# Features

## Dashboard
This is the home page that displays all the movies in the database. The details of movies include Title, Description, Genre and rating. Users can either update or delete each movie.

## Add Movie Page
Users can add movie details including Poster, title and rating. Genre can be selected from the available list of genres. Rating is provided using slider ranging from 1 to 5. Details are stored to MongoDB. Image is uploaded to cloudinary CDN. Cloudinary credentials are provided in .env file at the server side. 

## Add Genre Page
Users can add Genre in this page. The Details are stored as a seperate collection in MongoDb. The list of Genres are also provided with edit and delete option.

# Technologies used
- React
- Express
- NodeJS
- MongoDB
- Mongoose
- Cloudinary
- TailWind css
- Toastify
- Axios
- React Router
- Multer

