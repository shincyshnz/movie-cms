import React, { useEffect, useRef, useState } from "react";
import MultiSelect from "./MultiSelect";
import RatingStars from "./RatingStars";
import axios from "axios";

export const Filter = ({ allMovieList, setMovieList }) => {
  const ref = useRef(null);
  const [clickable, setClickable] = useState(true);
  const [filterRequirements, setFilterRequirements] = useState({
    rating: 0,
    genreArr: [],
  });
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    fetchGenres();
  }, []);

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

      if (response.data.length === 0 || filterRequirements.length === 0) {
        setMovieList((prev) => (prev = allMovieList.reverse()));
      }
      setMovieList((prev) => (prev = response?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const clearStar = () => {
    const allStars = document.querySelectorAll(".svg");
    Object.values(allStars).forEach((star) => {
      star.classList.remove("text-yellow-400");
      star.classList.add("text-gray-500");
    });
  };

  const handleFilterClear = (e) => {
    window.location.reload();
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

  return (
    <div className="flex flex-col md:flex-row justify-end my-3 md:my-9 gap-2 sm:px-10 xl:px-48 w-full border-black border-b pb-4">
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
  );
};
