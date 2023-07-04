import React from "react";
import { MdDeleteOutline, MdModeEditOutline } from "react-icons/md";
import { useError } from "../context/ErrorContext";

const Genre = ({ genreList, handleEdit, handleDelete }) => {
  const { errorObj } = useError();

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center">
      {errorObj?.apiError && <Error errorKey="apiError" />}
      {genreList?.map((genre, index) => {
        return (
          <div
            className="flex flex-col px-4 w-36 border border-violet-800 rounded-xl"
            key={index}
          >
            <div className="inline-flex text-2xl border-gray-700 border-b-2 p-3">
              <button
                className="bg-transparent hover:opacity-50 text-gray-400 font-bold px-2 rounded-l"
                onClick={(e) => handleEdit(e, genre._id)}
              >
                <MdModeEditOutline />
              </button>

              <button
                className="bg-transparent hover:opacity-50 text-gray-400 font-bol px-2 rounded-r"
                onClick={(e) => handleDelete(e, genre._id)}
              >
                <MdDeleteOutline />
              </button>
            </div>
            <div className="text-lg mx-auto py-3">
              {genre?.name?.charAt(0).toUpperCase() + genre?.name?.slice(1)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Genre;
