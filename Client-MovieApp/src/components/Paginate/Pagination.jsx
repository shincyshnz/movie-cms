import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import axios from "axios";
import { toast } from "react-toastify";

export const Pagination = ({
  setMovieList,
  movieList,
  pageCount,
  setPageCount,
  setCurrentPage,
}) => {
  const fetchMovies = async (page) => {
    const limit = 2;

    try {
      const response = await axios(import.meta.env.VITE_MOVIES_URL, {
        params: {
          page,
          limit: limit,
        },
      });
      setMovieList(response?.data.movieList);
      setPageCount((prev) => (prev = Math.ceil(response.data.pageCount)));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handlePageClick = (e) => {
    const page = +e.selected + 1;
    console.log(page);

    setCurrentPage((prev) => (prev = page));
    fetchMovies(page);
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
