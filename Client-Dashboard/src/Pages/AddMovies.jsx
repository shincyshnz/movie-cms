import axios from "axios";
import React, { useEffect, useState } from "react";
import { useError } from "../context/ErrorContext";
import Error from "../components/Error";

const AddMovies = () => {
  const [ratings, setRatings] = useState(0);
  const [genreList, setGenreList] = useState([]);
  const { errorObj, deleteErrorObj, handleErrorObj } = useError();
  const [formFields, setFormFields] = useState({
    title: "",
    uploaded_file: "",
    rating: "",
    genre: [],
  });

  useEffect(() => {
    fetchGenre();
  }, []);

  const fetchGenre = async () => {
    try {
      const response = await axios(import.meta.env.VITE_GENRE_URL);
      setGenreList(response.data);
    } catch (error) {
      handleErrorObj("apiError", error.message);
    }
  };

  const handleChange = (event) => {
    deleteErrorObj("title");

    const { value } = event.target;

    if (value.length === 0) {
      handleErrorObj("title", "Title Cannot be empty");
    }
    setFormFields((prev) => ({
      ...prev,
      title: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="mx-auto p-5 sm:my-10 md:my-40 bg-slate-900 text-white w-1/2 rounded-lg">
      <form action="/" method="post" encType="multipart/form-data">
        {/* Input File */}
        <div className="flex items-center justify-center w-full mb-4">
          <label
            htmlFor="dropzone-file"
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
            <input
              id="dropzone-file"
              type="file"
              name="uploaded_file"
              className="hidden"
            />
          </label>
        </div>
        {/* Input Title */}
        <div className="mb-4">
          <label
            htmlFor="movie-title"
            className="block mb-2 text-sm font-medium text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="movie-title"
            name="title"
            value={formFields.title}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-violet-500 outline-1 block w-full p-2.5"
            placeholder="Movie Title"
            required
            onChange={handleChange}
          />
          {errorObj?.map((err, index) => {
            return err.title && <Error errorKey="title" key={index} />;
          })}
        </div>
        {/* {errorObj?.apiError && <Error errorKey="apiError" />} */}
        {/* Input Slider */}
        <div className="group relative mb-4">
          <label
            htmlFor="default-range"
            className="block mb-2 text-sm font-medium text-white"
          >
            Ratings
          </label>
          <input
            id="default-range"
            type="range"
            name="rating"
            min="1"
            max="5"
            value={ratings}
            step="1"
            marks="true"
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
        <div className="flex flex-wrap mb-4 gap-y-4">
          {genreList?.map((genre, index) => {
            return (
              <div className="flex items-center mr-4" key={index}>
                <input
                  id="inline-checkbox"
                  name="genre"
                  type="checkbox"
                  value={genre._id}
                  className="w-4 h-4 bg-gray-100 rounded-lg accent-violet-800"
                />
                <label
                  htmlFor="inline-checkbox"
                  className="ml-2 text-sm font-medium text-white"
                >
                  {genre.name
                    .charAt(0)
                    .toUpperCase()
                    .concat(genre.name.slice(1))}
                </label>
              </div>
            );
          })}
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
