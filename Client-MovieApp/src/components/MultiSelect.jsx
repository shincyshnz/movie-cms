import { useState } from "react";
import Select from "react-select";

const MultiSelect = ({ genreList, handleGenreFilter}) => {

  const genreOptions = genreList.map((genre) => {
    return { value: genre._id, label: genre.name };
  });

  return (
    <Select
      isMulti
      name="genres"
      options={genreOptions}
      className="w-1/4"
      classNamePrefix="select"
      onChange={(e, selectOption) => handleGenreFilter(e, selectOption)}
    />
  );
};

export default MultiSelect;
