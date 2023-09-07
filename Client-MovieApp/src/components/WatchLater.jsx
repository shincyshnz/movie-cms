import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { axiosInstance } from "../utils/Interceptors";
import { useError } from "../context/ErrorContext";
import Skeleton from "../components/Skeleton";
import { Filter } from "../components/Filter";
import { Pagination } from "../components/Paginate/Pagination";
import { toast } from "react-toastify";

const WatchLater = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [allMovieList, setAllMovieList] = useState([]);

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = async () => {
    try {
      // method: "GET",
      // headers: {
      //   accessToken: getToken(),
      // },
      const response = await axiosInstance("/watch-later", {
        withCredentials: true,
        params: {
          page: currentPage,
          limit: import.meta.env.VITE_PAGINATION_LIMIT,
        },
      });
      setPageCount((prev) => (prev = Math.ceil(response.data.pageCount)));
      setMovieList((prev) => (prev = response?.data.movieList));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMovies();
  }, [currentPage]);

  return (
    <div className="flex flex-col justify-center items-start w-full px-5 md:px-10 xl:px-0">
        {/* <Filter setMovieList={setMovieList} allMovieList={allMovieList} /> */}

      <div className="xl:py-5 xl:px-48 grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-2 min-h-max grid mt-10">
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
                isWatchLater={true}
              />
            );
          })
        ) : (
          <p className="text-white text-2xl">Sorry! No Movies</p>
        )}
      </div>

        <Pagination
          pageCount={pageCount}
          setCurrentPage={setCurrentPage}
          fetchMovies = {fetchMovies}
        />
    </div>
  );
};

export default WatchLater;
