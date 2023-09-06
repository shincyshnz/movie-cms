import React, { Fragment, useState } from "react";
import RatingStars from "./RatingStars";
import { MdErrorOutline, MdOutlineWatchLater, MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const MovieCard = ({ movie, setMovieList, movieList, isWatchLater }) => {

  const navigate = useNavigate();
  const { isAuthenticated, getToken } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { _id, title, rating, genres, url } = movie;

  const handleDelete = async (event, id) => {
    event.preventDefault();
    if (!isAuthenticated) {
      return navigate("/login");
    }
    setShowModal(false);

    try {
      let response;
      //Delete from watchlater
      const watchLaterMovies = movieList.map((mov) => mov._id);
      response = await axios(
        `${import.meta.env.VITE_AUTH_URL}/watch-later/${id}`,
        {
          method: "DELETE",
          headers: {
            accessToken: getToken(),
          },
          data: {
            watchLaterMovies: watchLaterMovies,
          },
        }
      );

      if (response.status === 200) {
        const newMovieList = movieList.filter((movie) => movie._id !== id);
        setMovieList(newMovieList);

        toast.success("Deleted Succesfully.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addTowishList = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return navigate("/login");
    }
    try {
      const response = await axios(
        `${import.meta.env.VITE_AUTH_URL}/watch-later`,
        {
          method: "PUT",
          headers: {
            accesstoken: getToken(),
          },
          data: {
            movieId: _id,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Added to watch later Succesfully...");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <Fragment>
      <div className="bg-slate-900 rounded-2xl md:flex md:max-w-m md:max-h-80 ">
        <img
          src={url}
          alt={`${title}-poster`}
          className="sm:max-w-sm md:w-1/3 rounded-t-2xl md:rounded-l-2xl md:rounded-t-none md:rounded-tl-2xl"
        />
        <div className="px-5 py-10 text-gray-600 my-auto">
          <h2 className="font-bold text-xl sm:text-lg md:text-3xl mb-3">
            {title[0].toUpperCase() + title.slice(1)}
          </h2>
          <p className="mb-3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text.
          </p>

          <div className="flex gap-2 flex-wrap mb-4">
            {genres.map((genre, index) => {
              return (
                <div
                  key={index}
                  className="bg-transparent min-w-max text-gray-400 font-semibold py-1 px-4 border border-gray-400 rounded-2xl text-xs w-min"
                >
                  {genre.name}
                </div>
              );
            })}
          </div>

          <RatingStars rating={rating} clickable={false}/>

          {isAuthenticated && (
            <div className="flex gap-2 flex-wrap item text-gray-400 justify-end px-5 text-2xl">
              {!isWatchLater ? (
                <MdOutlineWatchLater
                  className="hover:opacity-70 cursor-pointer"
                  id={_id}
                  onClick={addTowishList}
                />
              ) : (
                <MdDeleteOutline
                  className="hover:opacity-70 cursor-pointer"
                  id={_id}
                  onClick={() => setShowModal(true)}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between px-5 pt-3 rounded-t">
                  <MdErrorOutline className="text-slate-500 p-1 ml-auto text-6xl" />
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-slate-500  opacity-100 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative px-6 py-1 flex-auto">
                  <p className="my-4 text-slate-500 text-xl leading-relaxed">
                    Are you sure you want to delete the movie{" "}
                    <span className="text-slate-600">{`"${title}" ?`}</span>{" "}
                    {isWatchLater && "from watch later?"}
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    type="button"
                    onClick={(e) => handleDelete(e, _id)}
                  >
                    Yes, Sure
                  </button>
                  <button
                    className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </Fragment>
  );
};

export default MovieCard;
