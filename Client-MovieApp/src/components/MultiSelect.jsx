import { forwardRef } from "react";
import Select from "react-select";

const MultiSelect = forwardRef (({ genreList, handleGenreFilter},ref) => {
  const genreOptions = genreList.map((genre) => {
    return { value: genre._id, label: genre.name };
  });

  return (
    <Select
      ref={ref}
      isMulti
      name="genres"
      options={genreOptions}
      className="w-1/4"
      classNamePrefix="select"
      onChange={(e, selectOption) => handleGenreFilter(e, selectOption)}
    />
  );
});

export default MultiSelect;
