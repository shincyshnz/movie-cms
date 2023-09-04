import React, { Fragment, useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { axiosInstance } from "../utils/Interceptors";
import { useError } from "../context/ErrorContext";
import Skeleton from "../components/Skeleton";
import RatingStars from "../components/RatingStars";
import MultiSelect from "../components/MultiSelect";

const Dashboard = ({ isWatchLater = false }) => {
  const { errorObj, handleErrorObj, deleteErrorObj } = useError();

  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [genreList, setGenreList] = useState([]);

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
        // signal: abortController.current.signal,
        response = await axiosInstance("/watch-later", {
          withCredentials: true,
        });
      } else {
        // dashboard movie list
        response = await axios(import.meta.env.VITE_MOVIES_URL, {});
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

  const fetchGenres = async () => {
    try {
      const response = await axios(import.meta.env.VITE_GENRE_URL);
      setGenreList((prev) => (prev = response?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMovies();
    fetchGenres();

    // Abort axios request on unmount
    // return () => {
    //   abortController.current.abort();
    // };
  }, [isWatchLater]);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex justify-end align-middle m-10 gap-4 px-12 xl:px-48">
        <MultiSelect genreList={genreList} />

        <div className="ratings mt-3">
          <RatingStars rating={0} clickable={true}/>
        </div>
      </div>

      <div className="px-10 xl:py-10 xl:px-48 grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-2 min-h-max grid">
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
        {movieList.length > 0 &&
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
          })}

        {/* {errorObj?.map((err, index) => {
        return err.apiError && <Error errorKey="apiError" key={index} />;
      })} */}
      </div>
    </div>
  );
};

export default Dashboard;
