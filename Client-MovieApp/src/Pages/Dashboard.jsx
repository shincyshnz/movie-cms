import React, { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { axiosInstance } from "../utils/Interceptors";
import { useError } from "../context/ErrorContext";
import Skeleton from "../components/Skeleton";
import { Filter } from "../components/Filter";
import { Pagination } from "../components/Paginate/Pagination";

const Dashboard = ({ isWatchLater = false }) => {
  const { errorObj, handleErrorObj, deleteErrorObj } = useError();
  // const abortController = useRef(new AbortController());

  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [allMovieList, setAllMovieList] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

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
      } 
      else {
        // dashboard movie list
        response = await axios(import.meta.env.VITE_MOVIES_URL, {
          params: {
            page: currentPage,
            limit: 2,
          },
        });
        setPageCount((prev) => (prev = Math.ceil(response.data.pageCount)));
      }

      setMovieList((prev) => (prev = response?.data.movieList));
      setAllMovieList((prev) => (prev = response?.data.movieList));
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
  }, [isWatchLater,currentPage]);

  return (
    <div className="flex flex-col justify-center items-start w-full px-5 md:px-10 xl:px-0">
      {!isWatchLater && (
        <Filter setMovieList={setMovieList} allMovieList={allMovieList} />
      )}

      <div className="xl:py-5 xl:px-48 grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-2 min-h-max grid">
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

      {!isWatchLater && (
        <Pagination
          setMovieList={setAllMovieList}
          movieList={movieList}
          pageCount={pageCount}
          setPageCount={setPageCount}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default Dashboard;
