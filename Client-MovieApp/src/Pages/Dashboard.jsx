import React, { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { axiosInstance } from "../utils/Interceptors";
import { useError } from "../context/ErrorContext";
import { useAuth } from "../context/AuthContext";
import Skeleton from "../components/Skeleton";

const Dashboard = ({ isWatchLater = false}) => {
  const { errorObj, handleErrorObj, deleteErrorObj } = useError();

  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);

  // const abortController = useRef(new AbortController());

  const fetchMovies = async () => {
    try {
      let response;
      if (isWatchLater) {
        // Watch later movie list
        setMovieList([]);
        // method: "GET",
        // headers: {
        //   accessToken: getToken(),
        // },
        // signal: abortController.current.signal,
        response = await axiosInstance("/watch-later");
      } else {
        // dashboard movie list
     
        setMovieList([]);
        response = await axios(import.meta.env.VITE_MOVIES_URL,{
          // signal: abortController.current.signal,
        });
      }
      setMovieList((prev) => (prev = response?.data));
    } catch (error) {
      if (error.response.status === 401) {
        // removeToken();
        window.location.href = "/login";
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
  );
};

export default Dashboard;
