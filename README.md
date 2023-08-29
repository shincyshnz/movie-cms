# TMDB

TMDB is a web app built using React, Express and MongoDB. This app helps users to add, delete and update movie data including title, poster image, rating and genre.

# Working Video : 
![Video](https://github.com/shincyshnz/movie-cms/blob/main/Untitled.mp4)

# Login
![Screenshot from 2023-08-29 12-48-00](https://github.com/shincyshnz/movie-cms/assets/48871950/a590b2f7-6a09-42c3-9e86-c247b66fbc90)

# Register
![Screenshot from 2023-08-29 12-48-35](https://github.com/shincyshnz/movie-cms/assets/48871950/4ecc3787-e7ef-43ab-a036-ff7bdc79e0e1)

# Dashboard
![Screenshot from 2023-08-29 12-50-01](https://github.com/shincyshnz/movie-cms/assets/48871950/e14631ab-c757-4e56-8af1-ec6f269aa588)

# Add Genre
![image](https://github.com/shincyshnz/movie-cms/assets/48871950/0c2d4a21-1fbd-45c2-a3b3-b778249749b3)

# Add Movie
![image](https://github.com/shincyshnz/movie-cms/assets/48871950/38f68b41-1ca4-42d0-bebc-8d1716d89f3c)

# Watch Later
![Screenshot from 2023-08-29 12-50-51](https://github.com/shincyshnz/movie-cms/assets/48871950/09e57e2a-1569-4a2b-ad59-ae91d8cb0556)


# Features

## Dashboard
This is the home page that displays all the movies in the database. The details of movies include Title, Description, Genre and rating. Users can either update or delete each movie.

## Add Movie Page
Users can add movie details including Poster, title and rating. Genre can be selected from the available list of genres. Rating is provided using slider ranging from 1 to 5. Details are stored to MongoDB. Image is uploaded to cloudinary CDN. Cloudinary credentials are provided in .env file at the server side. 

## Add Genre Page
Users can add Genre in this page. The Details are stored as a seperate collection in MongoDb. The list of Genres are also provided with edit and delete option.


## Watch Later Page
Users can add movies to watch later page. A watch button on dashboard when clicked add movies to watch later list and you can view watch later movie list in this page. Users can remove watch later movies by clicking delete button in the watch later page.

## Register
Users can register to TMDB application using email. Once registered you can access the site using your email and password.
The hashed-password created using bcrypt and user email are stored in user collection. 

## Login
Users can login to TMDB application using email and password. JWT is used for authentication.

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
- Bcrypt
- JWT

