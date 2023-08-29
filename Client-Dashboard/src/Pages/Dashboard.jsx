import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { useError } from "../context/ErrorContext";
import { useAuth } from "../context/AuthContext";
import Skeleton from "../components/Skeleton";

const Dashboard = ({ isWatchLater = false }) => {
  const { errorObj, handleErrorObj, deleteErrorObj } = useError();

  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const { getToken } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    fetchMovies();
  }, [isWatchLater]);

  const fetchMovies = async () => {
    try {
      let response;
      if (isWatchLater) {
        // Watch later movie list
        setMovieList([]);
        response = await axios(`${import.meta.env.VITE_AUTH_URL}/watch-later`, {
          method: "GET",
          headers: {
            accessToken: getToken(),
          },
        });
      } else {
        // dashboard movie list
        setMovieList([]);
        response = await axios(import.meta.env.VITE_MOVIES_URL);
      }
      setMovieList((prev) => (prev = response?.data));
    } catch (error) {
      deleteErrorObj("apiError");
      handleErrorObj(
        "apiError",
        `${error?.message} : Error fetching movie details`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-10 py-5 xl:py-20 xl:px-48 grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 min-h-max grid">
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </>
      ) : movieList.length < 1 ? (
        <p className="text-white text-xl mx-auto my-10"> Movie List Empty </p>
      ) : (
        movieList.map((movie) => {
          return (
            <MovieCard
              key={movie._id}
              movie={movie}
              setMovieList={setMovieList}
              movieList={movieList}
              isWatchLater={isWatchLater}
            />
          );
        })
      )}

      {errorObj?.map((err, index) => {
        return err.apiError && <Error errorKey="apiError" key={index} />;
      })}
    </div>
  );
};

export default Dashboard;
