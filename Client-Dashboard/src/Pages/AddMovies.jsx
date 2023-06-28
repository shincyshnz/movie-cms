import React, { useState } from "react";

const AddMovies = () => {
  const [ratings, setRatings] = useState(0);

  return (
    <div className="mx-auto p-5 sm:my-10 md:my-40 bg-slate-900 text-white w-1/2 rounded-lg">
      <form action="" method="post">
        {/* Input File */}
        <div className="flex items-center justify-center w-full mb-4">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-white  border-white-600 hover:border-gray-100 hover:bg-gray-200"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        {/* Input Title */}
        <div className="mb-4">
          <label
            for="movie-title"
            className="block mb-2 text-sm font-medium text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="movie-title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 outline-1 block w-full p-2.5"
            placeholder="Movie Title"
            required
          />
        </div>
        {/* Input Slider */}
        <div className="group relative mb-4">
          <label
            for="default-range"
            className="block mb-2 text-sm font-medium text-white"
          >
            Ratings
          </label>
          <input
            id="default-range"
            type="range"
            min="1"
            max="5"
            value={ratings}
            step="1"
            marks
            onChange={(e) => setRatings(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-800"
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
        {/* Checkboxes */}
        <div className="flex mb-4">
          <div className="flex items-center mr-4">
            <input
              id="inline-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 bg-gray-100 rounded-lg accent-violet-800"
            />
            <label
              for="inline-checkbox"
              className="ml-2 text-sm font-medium text-white"
            >
              Inline 1
            </label>
          </div>
        </div>
      </form>
      {/* Submit */}
      <button className="mt-12 bg-violet-800 w-full text-white p-2 rounded-lg">
        Submit
      </button>
    </div>
  );
};

export default AddMovies;
