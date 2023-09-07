import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import axios from "axios";
import { toast } from "react-toastify";

export const Pagination = ({
  pageCount,
  setCurrentPage,
  fetchMovies,
}) => {

  useEffect(() => {
    fetchMovies();
  }, []);

  const handlePageClick = (e) => {
    const page = +e.selected + 1;

    setCurrentPage((prev) => (prev = page));
    // fetchMovies(page);
    fetchMovies();
  };

  return (
    <ReactPaginate
      breakLabel="..."
      className="react-paginate md:px-28 xl:px-48 py-5"
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={Math.ceil(pageCount)}
      previousLabel="< prev"
      renderOnZeroPageCount={null}
    />
  );
};
