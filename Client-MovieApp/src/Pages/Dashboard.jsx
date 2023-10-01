import React, { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { axiosInstance } from "../utils/Interceptors";
import { useError } from "../context/ErrorContext";
import Skeleton from "../components/Skeleton";
import { Filter } from "../components/Filter";
import { Pagination } from "../components/Paginate/Pagination";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { errorObj, handleErrorObj, deleteErrorObj } = useError();
  // const abortController = useRef(new AbortController());

  const [isLoading, setIsLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [allMovieList, setAllMovieList] = useState([]);
  const [filterRequirements, setFilterRequirements] = useState({
    rating: 0,
    genreArr: [],
  });

  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilteredData, setIsFilteredData] = useState(false);

  const fetchMovies = async () => {
    try {
      setMovieList([]);

      // dashboard movie list
      const response = await axios(import.meta.env.VITE_MOVIES_URL, {
        params: {
          page: currentPage,
          limit: import.meta.env.VITE_PAGINATION_LIMIT,
        },
      });

      setPageCount((prev) => (prev = Math.ceil(response.data.pageCount)));
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

  const fetchFilteredMovies = async () => {
    try {
      setMovieList([]);
      setPageCount(0);
      const response = await axios(
        `${import.meta.env.VITE_MOVIES_URL}/filter-genre`,
        {
          method: "POST",
          data: filterRequirements,
          params: {
            page: currentPage,
            limit: import.meta.env.VITE_PAGINATION_LIMIT,
          },
        }
      );

      if (
        response.data.movieList.length === 0 ||
        filterRequirements.length === 0
      ) {
        setMovieList((prev) => (prev = allMovieList.reverse()));
      }
      setMovieList((prev) => (prev = response?.data.movieList));
      setPageCount((prev) => (prev = response?.data.pageCount));
      setIsFilteredData((prev) => (prev = true));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchMovies();

    // Abort axios request on unmount
    // return () => {
    //   abortController.current.abort();
    // };
  }, [currentPage]);

  useEffect(() => {
    // Open a connection to recieve events from server
    const eventSource = new EventSource(
      import.meta.env.VITE_NOTIFICATION_SSE_URL
    );

    // attaching handlers to recieve message events
    eventSource.onmessage = (event) => {
      const movieData = JSON.parse(event.data);
      if (movieData.type === 3) {
        const updatedMovieList = movieList.filter(
          (movie) => movie._id !== movieData.id
        );
        setMovieList(updatedMovieList);
        setAllMovieList(updatedMovieList);
      }
      if (movieData) {
        fetchMovies();
      }
    };

    //terminatin connection on component unmount
    return () => eventSource.close();
  }, []);

  return (
    <div className="flex flex-col justify-center items-start w-full px-5 md:px-10 xl:px-0">
      <Filter
        fetchFilteredMovies={fetchFilteredMovies}
        fetchMovies={fetchMovies}
        filterRequirements={filterRequirements}
        setFilterRequirements={setFilterRequirements}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Pagination
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
        fetchMovies={!isFilteredData ? fetchMovies : fetchFilteredMovies}
      />

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
        {!isLoading && movieList.length > 0 ? (
          movieList?.map((movie) => {
            return (
              <MovieCard
                key={movie._id}
                movie={movie}
                setMovieList={setMovieList}
                movieList={movieList}
                isWatchLater={false}
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
