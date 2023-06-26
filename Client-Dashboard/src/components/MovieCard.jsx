import React from "react";
import RatingStars from "./RatingStars";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
const MovieCard = () => {
  return (
    <div className="bg-slate-900 rounded-2xl md:flex my-auto">
      <img
        src="https://images.unsplash.com/photo-1593642532744-d377ab507dc8"
        alt="Laptop on Desk"
        className="md:w-1/3 rounded-t-2xl md:rounded-l-2xl md:rounded-t-none aspect-auto"
      />
      <div className="px-5 py-10 text-gray-600">
        <h2 className="font-bold text-xl sm:text-lg md:text-3xl mb-3">
          Horizontal Card
        </h2>
        <p className="mb-3">
          Look at me go sideways!Look at me go sidewaysLook at me go sideways
          Look at me go sideways!Look at me go sidewaysLook at me go sideways
        </p>
        <div className="flex gap-2 flex-wrap mb-4">
          <div className="bg-transparent text-gray-400 font-semibold py-2 px-4 border border-gray-400 rounded-2xl text-xs w-min">
            Horror
          </div>
        </div>
        <RatingStars />
        <div className="flex gap-2 flex-wrap text-gray-400 justify-end px-5 text-2xl">
          <MdModeEditOutline className="hover:opacity-70 cursor-pointer" />
          <MdDeleteOutline className="hover:opacity-70 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
