import React, { useEffect, useRef, useState } from "react";
import { useError } from "../context/ErrorContext";
import Error from "../components/Error";
import axios from "axios";
import Genre from "../components/Genre";
import { toast } from "react-toastify";

const AddGenre = () => {
  const [genre, setGenre] = useState("");
  const [isEdit, setIsEdit] = useState("");
  const inputRef = useRef(null);
  const [genreList, setGenreList] = useState([]);
  const { errorObj, handleErrorObj, deleteErrorObj } = useError();

  useEffect(() => {
    inputRef.current.focus();
    // Fetch genre data
    fetchGenre();
  }, []);

  const fetchGenre = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_GENRE_URL);
      setGenreList(response?.data);
    } catch (error) {
      deleteErrorObj("apiError");
      handleErrorObj("apiError", `${error.message} : Error fetching genre`);
    }
  };

  const handleChange = (event) => {
    deleteErrorObj("genreInputText");
    const { value } = event.target;

    if (value.length == 0) {
      handleErrorObj("genreInputText", "Genre Cannot be empty");
    }
    setGenre(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios(import.meta.env.VITE_GENRE_URL, {
        method: "POST",
        data: {
          name: genre.toLowerCase(),
        },
      });

      if (!response) return;

      const newGenre = {
        _id: response.data,
        name: genre,
      };
      setGenreList((prev) => [...prev, newGenre]);
      toast.success("Genre Added Succesfully!");
      setGenre("");
    } catch (error) {
      deleteErrorObj("apiError");
      handleErrorObj(
        "apiError",
        `${error.message} : Error while submitting genre data`
      );
    }
  };

  const handleEdit = (e, _id) => {
    e.preventDefault();
    setIsEdit(_id);

    setGenre((prev) => {
      const findGenre = genreList.filter((genre) => genre._id === _id);
      if (findGenre.length > 0) {
        return (prev = findGenre[0]?.name);
      }
    });

    inputRef.current.focus();
    inputRef.current.value = genre;
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const response = await axios(import.meta.env.VITE_GENRE_URL, {
        method: "PUT",
        data: {
          _id: isEdit,
          name: genre,
        },
      });

      if (!response) return;

      const newGenreList = genreList;
      newGenreList.map((item) => {
        if (item._id === isEdit) {
          item.name = genre;
        }
        return [...genreList];
      });
      setGenreList(newGenreList);
      toast.success("Genre Updated Succesfully!");
      setGenre("");
      setIsEdit("");
    } catch (error) {
      deleteErrorObj("apiError");
      handleErrorObj(
        "apiError",
        `${error.message} : Error while editing genre data`
      );
    }
  };

  const handleDelete = async (e, _id) => {
    e.preventDefault();
    let newGenreList = [];

    try {
      const response = await axios(import.meta.env.VITE_GENRE_URL, {
        method: "DELETE",
        data: {
          _id: _id,
        },
      });

      if (!response) return;

      genreList.map((genre, index) => {
        if (genre._id === _id) {
          newGenreList = genreList
            .splice(0, index)
            .concat(genreList.splice(index + 1));
        }
      });
      setGenreList(newGenreList);
      toast.success("Genre Deleted Succesfully!");
    } catch (error) {
      deleteErrorObj("apiError");
      handleErrorObj(
        "apiError",
        `${error.message} : Error while deleting genre data`
      );
    }
  };

  return (
    <div className="mx-auto p-5 sm:my-10 md:my-40 bg-slate-900 text-white w-1/2 h-1/2 rounded-lg">
      <div className="flex flex-nowrap justify-between h-20 p-2 mt-4 mb-1 mx-2">
        <input
          type="text"
          value={genre}
          ref={inputRef}
          className="p-2 rounded-lg focus:outline-violet-800 mr-2 w-full h-12 text-gray-900"
          placeholder="Enter Genre"
          onChange={handleChange}
        />
        {!isEdit ? (
          <button
            className="bg-violet-800 h-12 p-2 rounded-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        ) : (
          <button
            className="bg-violet-800 h-12 p-2 rounded-lg"
            onClick={handleSave}
          >
            Save
          </button>
        )}
      </div>
      {errorObj?.map((err, index) => {
        return (
          err.genreInputText && <Error errorKey="genreInputText" key={index} />
        );
      })}
      {errorObj?.map((err, index) => {
        return err.apiError && <Error errorKey="apiError" key={index} />;
      })}
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
