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
  const [clickable, setClickable] = useState(true);
  const [filterRequirements, setFilterRequirements] = useState({
    rating: 0,
    genreArr: [],
  });

  const [movieList, setMovieList] = useState([]);
  const [allMovieList, setAllMovieList] = useState([]);
  const [genreList, setGenreList] = useState([]);
  const ref = useRef(null);

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

  const fetchGenres = async () => {
    try {
      const response = await axios(import.meta.env.VITE_GENRE_URL);
      setGenreList((prev) => (prev = response?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFilteredMovies = async () => {
    try {
      const response = await axios(
        `${import.meta.env.VITE_MOVIES_URL}/filter-genre`,
        {
          method: "POST",
          data: filterRequirements,
        }
      );

      if (response.data.length === 0) {
        setMovieList((prev) => (prev = allMovieList.reverse()));
      }
      setMovieList((prev) => (prev = response?.data));
    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false);
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

  const clearStar = () => {
    const allStars = document.querySelectorAll(".svg");
    Object.values(allStars).forEach((star) => {
      star.classList.remove("text-yellow-400");
      star.classList.add("text-gray-500");
    });
  };

  const updateFilterRequirements = (req, value) => {
    const newfilter = filterRequirements;
    newfilter[req] = value;
    setFilterRequirements((prev) => (prev = newfilter));
    fetchFilteredMovies();
  };

  // filter movies based on rating
  const handleRatingFilter = (e) => {
    e.preventDefault();

    if (!clickable) return;

    const selectedStar = e.currentTarget;
    const selectedRating = selectedStar.getAttribute("id");

    // push rating data to filterRequirement
    updateFilterRequirements("rating", +selectedRating + 1);

    clearStar();

    for (let i = 0; i <= selectedRating; i++) {
      const belowStars = document.querySelector(`.svg-${i}`);
      belowStars.classList.remove("text-gray-500");
      belowStars.classList.add("text-yellow-400");
    }
  };

  //filter movies based on Gneres
  const handleGenreFilter = (event, selectOption) => {
    let tempGenreList = [];
    let genreId;
    tempGenreList = filterRequirements.genreArr;

    if (selectOption.action == "clear") {
      tempGenreList = [];
    }

    if (selectOption.action == "remove-value") {
      genreId = selectOption.removedValue.value;
      tempGenreList.splice(tempGenreList.indexOf(genreId), 1);
    }

    if (selectOption.action == "select-option") {
      genreId = selectOption.option.value;
      tempGenreList.push(genreId);
    }
    updateFilterRequirements("genreArr", tempGenreList);
  };

  const handleFilterClear = (e) => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col justify-center items-start w-full">
      <div className="flex justify-end my-9 gap-2 md:px-10 xl:px-48 w-full border-black border-b pb-4">
        <MultiSelect
          ref={ref}
          genreList={genreList}
          handleGenreFilter={handleGenreFilter}
        />

        <div className="filter-ratings mt-3">
          <RatingStars
            rating={0}
            clickable={clickable}
            handleRatingFilter={handleRatingFilter}
          />
        </div>

        <div className="mt-2">
          <button
            className="m-0 text-white px-2 rounded-md bg-violet-800 focus:ring-1 hover:bg-violet-950 focus:bg-violet-950"
            onClick={handleFilterClear}
          >
            Clear
          </button>
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
          <p className="text-white text-2xl">Sorry!, No Movies</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
