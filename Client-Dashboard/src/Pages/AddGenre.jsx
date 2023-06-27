import React, { useState } from "react";
import { MdStarOutline } from "react-icons/md";
const AddGenre = () => {
  const [ratings, setRatings] = useState(0);

  return (
    <div className="mx-auto p-5 sm:my-10 md:my-40 bg-slate-900 text-white w-1/2 rounded-lg">
      <form action="" method="post">
        <div class="flex items-center justify-center w-full mb-4">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-white  border-white-600 hover:border-gray-100 hover:bg-gray-200"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                aria-hidden="true"
                class="w-10 h-10 mb-3 text-gray-400"
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
              <p class="mb-2 text-sm text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-400 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" />
          </label>
        </div>

        <div className="mb-4">
          <label
            for="movie-title"
            class="block mb-2 text-sm font-medium text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="movie-title"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 outline-1 block w-full p-2.5"
            placeholder="Movie Title"
            required
          />
        </div>

        <div className="group relative">
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
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="w-full flex justify-between text-xs px-2">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        <div class="flex">
          <div class="flex items-center mr-4">
            <input
              id="inline-checkbox"
              type="checkbox"
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="inline-checkbox"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Inline 1
            </label>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddGenre;
