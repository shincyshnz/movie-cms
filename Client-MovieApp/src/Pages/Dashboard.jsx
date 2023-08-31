import React, { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { axiosInstance } from "../utils/Interceptors";
import { useError } from "../context/ErrorContext";
import { useAuth } from "../context/AuthContext";
import Skeleton from "../components/Skeleton";

const Dashboard = ({ isWatchLater = false }) => {
  const { errorObj, handleErrorObj, deleteErrorObj } = useError();

  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const { getToken } = useAuth();
  // const abortController = useRef(new AbortController());

  const fetchMovies = async () => {
    try {
      let response;
      if (isWatchLater) {
        // Watch later movie list
        setMovieList([]);
        response = await axiosInstance("/watch-later",
          // {
          //   // method: "GET",
          //   // headers: {
          //   //   accessToken: getToken(),
          //   // },
          //   signal: abortController.current.signal,
          // }
        );
      } else {
        // dashboard movie list
        setMovieList([]);
        response = await axios(import.meta.env.VITE_MOVIES_URL);
      }
      setMovieList((prev) => (prev = response?.data));
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error);
        window.location.href = "/login" 
      }
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
    <div className="px-10 py-5 xl:py-20 xl:px-48 grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-4 min-h-max grid">
      {errorObj.length < 0 && (
        <p className="text-white text-xl mx-auto my-10">
          {errorObj.forEach((err) => {
            return err.apiError && <Error errorKey="apiError" />;
          })}
        </p>
      )}
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
      )}

      {/* {errorObj?.map((err, index) => {
        return err.apiError && <Error errorKey="apiError" key={index} />;
      })} */}
    </div>
  );
};

export default Dashboard;
