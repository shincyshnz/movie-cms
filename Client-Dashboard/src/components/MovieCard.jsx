import React from "react";
import RatingStars from "./RatingStars";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
const MovieCard = ({ movie }) => {
  const { title, rating, genres, url } = movie;

  return (
    <div className="bg-slate-900 rounded-2xl md:flex">
      <img
        src={url}
        alt={`${title}-poster`}
        className="md:w-1/3 rounded-t-2xl md:rounded-l-2xl md:rounded-t-none md:rounded-tl-2xl"
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
        {genres.map((genre) => {
          return (
              <div className="bg-transparent min-w-max text-gray-400 font-semibold py-2 px-4 border border-gray-400 rounded-2xl text-xs w-min">
                {genre.name}
              </div>
          );
        })}
        </div>

        <RatingStars rating={rating} />
        <div className="flex gap-2 flex-wrap text-gray-400 justify-end px-5 text-2xl">
          <MdModeEditOutline className="hover:opacity-70 cursor-pointer" />
          <MdDeleteOutline className="hover:opacity-70 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
