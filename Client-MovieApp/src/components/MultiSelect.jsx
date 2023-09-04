import { useState } from "react";
import Select from "react-select";

const MultiSelect = ({ genreList }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genreOptions = genreList.map((genre) => {
    return { value: genre._id, label: genre.name };
  });

  const filterMovies = (event, selectOption) => {
    if (selectOption.action === "remove-value") {
      setSelectedGenres(
        selectedGenres.filter(
          (genre) => genre.value !== selectOption.removedValue.value
        )
      );
    } else {
      setSelectedGenres((prev) => [...prev, selectOption.option]);
    }
    
  };

  return (
    <Select
      isMulti
      name="genres"
      options={genreOptions}
      className="w-1/4"
      classNamePrefix="select"
      onChange={(e, selectOption) => filterMovies(e, selectOption)}
    />
  );
};

export default MultiSelect;
