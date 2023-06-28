import React, { useEffect, useState } from "react";
import { useError } from "../context/ErrorContext";
import Error from "../components/Error";
import axios from "axios";
import Genre from "../components/Genre";

const AddGenre = () => {
  const [genre, setGenre] = useState("");
  const [genreList, setGenreList] = useState([]);
  const { errorObj, handleErrorObj } = useError();

  const fetchGenre = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_GENRE_URL);
      setGenreList(response?.data);
    } catch (error) {
      handleErrorObj("apiError", error.message);
    }
  };

  useEffect(() => {
    // Fetch genre data
    fetchGenre();
  }, []);

  const handleChange = (event) => {
    delete errorObj.genreInputText;
    const { value } = event.target;

    if (value.length == 0) {
      handleErrorObj("genreInputText", "Genre Cannot be empty");
    }
    setGenre(value);
  };

  const handleEdit = () => {};
  const handleDelete = (e, _id) => {
    e.preventDefault();
  };

  const handleSubmit = async (event) => {
    delete errorObj.apiError;
    event.preventDefault();

    try {
      const genreId = await axios.post(import.meta.env.VITE_GENRE_URL, {
        method: "POST",
        data: {
          name: genre,
        },
      });

      if (!genreId) return;

      const newGenre = {
        _id: genreId,
        name: genre,
      };
      setGenreList((prev) => [...prev, newGenre]);
      setGenre("");
    } catch (error) {
      handleErrorObj("apiError", error.message);
    }
  };

  return (
    <div className="mx-auto p-5 sm:my-10 md:my-40 bg-slate-900 text-white w-1/2 h-1/2 rounded-lg">
      <div className="flex flex-nowrap justify-between h-20 p-2 mt-4 mb-1 mx-2">
        <input
          type="text"
          value={genre}
          className="p-2 rounded-lg focus:outline-violet-800 mr-2 w-full h-12 text-gray-900"
          placeholder="Enter Genre"
          onChange={handleChange}
        />
        <button
          className="bg-violet-800 h-12 p-2 rounded-lg"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      {errorObj?.genreInputText && <Error errorKey="genreInputText" />}
      {errorObj?.apiError && <Error errorKey="apiError" />}
      <div className="border  border-gray-700 border-b-2 mb-8"></div>
      <Genre
        genreList={genreList}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default AddGenre;
