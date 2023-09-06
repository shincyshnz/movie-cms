import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import axios from "axios";
import { toast } from "react-toastify";

export const Pagination = ({
  setMovieList,
  pageCount,
  setPageCount,
  currentPage,
  setCurrentPage,
}) => {
  // Get current Movies
  //   const indexofLastMovie = currentPage * limit;
  //   const indexofFirstMovie = indexofLastMovie - limit;
  //   const currentMovies = response?.data.slice(
  //     indexofFirstMovie,
  //     indexofLastMovie
  //   );

  const handlePageClick = async (e) => {
    const page = +e.selected + 1;
    setCurrentPage((prev) => (prev = page));

    try {
      const response = await axios(import.meta.env.VITE_MOVIES_URL, {
        params: {
          page,
          limit: 2,
        },
      });
      setMovieList((prev) => (prev = response?.data.movieList));
      setPageCount((prev) => (prev = Math.ceil(response.data.pageCount)));
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <ReactPaginate
      breakLabel="..."
      className="react-paginate md:px-28 xl:px-48 py-5"
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< prev"
      renderOnZeroPageCount={null}
    />
  );
};
