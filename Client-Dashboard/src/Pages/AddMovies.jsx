import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useError } from "../context/ErrorContext";
import Error from "../components/Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const AddMovies = () => {
  const checkboxRef = useRef(null);
  const [genreList, setGenreList] = useState([]);
  const [file, setFile] = useState(null);
  const [isChangedFile, setIsChangedFile] = useState(false);
  const { errorObj, deleteErrorObj, handleErrorObj } = useError();
  const initialFormFields = {
    title: "",
    movieImage: "",
    rating: 0,
    genres: [],
  };
  const [formFields, setFormFields] = useState(initialFormFields);
  const { id } = useParams();

  useEffect(() => {
    fetchGenres();
    if (id) {
      getMovieByID(id);
    }
  }, []);

  const getMovieByID = async (id) => {
    try {
      const response = await axios(`${import.meta.env.VITE_MOVIES_URL}/${id}`);
      const { title, url, rating, genres } = response.data;
      handleFormFields("title", title);
      handleFormFields("movieImage", url);
      setFile(url);
      handleFormFields("rating", rating);
      handleFormFields("genres", genres);

      // make checkbox checked for id in genres
      const checkBoxParents = checkboxRef.current.children;
      [...checkBoxParents].forEach((element) => {
        genres.forEach((genre) => {
          if (element.firstChild.value === genre)
            element.firstChild.checked = true;
        });
      });
    } catch (error) {
      handleErrorObj("apiError", error.message);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios(import.meta.env.VITE_GENRE_URL);
      setGenreList(response.data);
    } catch (error) {
      handleErrorObj("apiError", error.message);
    }
  };

  const handleFormFields = (itemKey, itemVal) => {
    setFormFields((prev) => ({
      ...prev,
      [itemKey]: itemVal,
    }));
  };

  const handleFile = (event) => {
    event.preventDefault();

    if (id) {
      setIsChangedFile(true);
    }
    setFile(URL.createObjectURL(event.target?.files[0]));
    handleFormFields("movieImage", event.target?.files[0]);
  };

  const handleChange = (event) => {
    deleteErrorObj("apiError");
    deleteErrorObj("title");

    const { value } = event.target;

    if (value.length === 0) {
      handleErrorObj("title", "Title Cannot be empty");
    }

    handleFormFields("title", value);
  };

  const uncheck = () => {
    const checkBoxParents = checkboxRef.current.children;
    [...checkBoxParents].forEach((element) => {
      element.firstChild.checked = false;
    });
  };

  const handleCheckBox = (event) => {
    deleteErrorObj("apiError");
    deleteErrorObj("genres");

    const genreItem = event.target.value;
    let genresArr = [...formFields.genres];

    event.target.checked
      ? (genresArr = [...formFields.genres, genreItem])
      : genresArr.splice(genresArr.indexOf(genreItem), 1);

    if (genresArr.length === 0) {
      handleErrorObj("genres", "Genres Cannot be empty");
    }

    handleFormFields("genres", genresArr);
  };

  const handleRatings = (event) => {
    const rating = event.target.value;

    handleFormFields("rating", rating);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!formFields.title) {
        deleteErrorObj("title");
        handleErrorObj("title", "Title Cannot be empty");
        return;
      }
      const toastId = toast.loading("Please Wait...");
      const formData = new FormData();
      let method;

      formData.append("title", formFields.title);
      formData.append("rating", formFields.rating);
      formData.append("genres", formFields.genres);

      if (id) {
        method = "PUT";
        formData.append("movieId", id);
        isChangedFile && formData.append("movieImage", formFields.movieImage);
      }else{
        method = "POST";
        formData.append("movieImage", formFields.movieImage);
      }

      const response = await axios(import.meta.env.VITE_MOVIES_URL, {
        method: method,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      if (!response) return;

      setFormFields(initialFormFields);
      setFile(null);
      uncheck();

      toast.update(toastId, {
        render: "Uploaded Succesfully...",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.dismiss();
      handleErrorObj(
        "apiError",
        `${error.message} ${error.response?.data.message}  : Error while submitting movie data`
      );
    }finally{
      deleteErrorObj("apiError");
    }
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
            {!file ? (
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
            ) : (
              <img src={file} className="overflow-hidden object-contain" />
            )}
            <input
              id="dropzone-file"
              type="file"
              name="movieImage"
              className="hidden"
              onChange={handleFile}
              required
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
            value={formFields.rating}
            min="1"
            max="5"
            step="1"
            marks="true"
            onChange={handleRatings}
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
        <div className="flex flex-wrap mb-4 gap-y-4" ref={checkboxRef}>
          {genreList?.map((genre, index) => {
            return (
              <div className="flex items-center mr-4" key={index}>
                <input
                  id={`inline-checkbox-${index}`}
                  name="genre"
                  type="checkbox"
                  value={genre._id}
                  onChange={handleCheckBox}
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
          {errorObj?.map((err, index) => {
            return err.genres && <Error errorKey="genres" key={index} />;
          })}
        </div>
      </form>
      {errorObj?.map((err, index) => {
        return err.apiError && <Error errorKey="apiError" key={index} />;
      })}
      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="mt-12 bg-violet-800 hover:bg-violet-950 w-full text-white p-2 rounded-lg"
      >
        {id ? "Save" : "Submit"}
      </button>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default AddMovies;
