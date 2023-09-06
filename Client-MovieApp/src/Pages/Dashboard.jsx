import React, { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { axiosInstance } from "../utils/Interceptors";
import { useError } from "../context/ErrorContext";
import Skeleton from "../components/Skeleton";
import { Filter } from "../components/Filter";

const Dashboard = ({ isWatchLater = false }) => {
  const { errorObj, handleErrorObj, deleteErrorObj } = useError();

  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [allMovieList, setAllMovieList] = useState([]);

  // const abortController = useRef(new AbortController());

  const fetchMovies = async () => {
    try {
      let response;
      setMovieList([]);

      // Watch later movie list
      if (isWatchLater) {
        // method: "GET",
        // headers: {
        //   accessToken: getToken(),
        // },
        response = await axiosInstance("/watch-later", {
          withCredentials: true,
          // signal: abortController.current.signal,
        });
      } else {
        // dashboard movie list
        response = await axios(import.meta.env.VITE_MOVIES_URL);
      }
      setMovieList((prev) => (prev = response?.data));
      setAllMovieList((prev) => (prev = response?.data));
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

  useEffect(() => {
    setIsLoading(true);
    fetchMovies();

    // Abort axios request on unmount
    // return () => {
    //   abortController.current.abort();
    // };
  }, [isWatchLater]);

  return (
    <div className="flex flex-col justify-center items-start w-full px-5 md:px-10 xl:px-0">
      {!isWatchLater && <Filter setMovieList={setMovieList} allMovieList={allMovieList} />}

      <div className="xl:py-10 xl:px-48 grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-2 min-h-max grid">
        {isLoading && (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        )}
        {movieList.length > 0 ? (
          movieList?.map((movie) => {
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
        ) : (
          <p className="text-white text-2xl">Sorry! No Movies</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
