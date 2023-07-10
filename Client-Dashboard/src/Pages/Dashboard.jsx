import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";

const Dashboard = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    fetchMovies();
  },[]);

  const fetchMovies = async () => {
    const response = await axios(import.meta.env.VITE_MOVIES_URL);
    setMovieList(response.data);
  };

  return (
    <div className="px-10 py-5 xl:py-20 xl:px-48 grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4">
      {movieList.map(movie=>{
        return <MovieCard key={movie._id} movie={movie}/>
      })}
    </div>
  );
};

export default Dashboard;
