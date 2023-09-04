import React, { useState } from "react";

const RatingStars = ({ rating, clickable = false }) => {
  const [filterRating, setFilterRating] = useState(0);

  const handleClick = (e, index) => {
    if (!clickable) return;
    const button = e.target.parentNode;

    if (
      button.getAttribute("class").value == "button" ||
      button.getAttribute("id").value == "svg"
    ) {
      console.log(button);

      setFilterRating(
        (prev) => (prev = +e.target.parentNode.getAttribute("id"))
      );
      console.log(filterRating);
      displayStar(filterRating);
    }
    return;
  };

  const renderStar = (starColor, index) => {
    const htmlStar = (
      <button
        className="button"
        key={index}
        id={index}
        onClick={(e, index) => handleClick(e, index)}
      >
        <svg
          aria-hidden="true"
          id="svg"
          className={`w-5 h-5 ${starColor}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      </button>
    );
    return htmlStar;
  };

  const displayStar = (rating) => {
    const newArr = [...Array(5)].map((e, i) => {
      return rating >= i + 1
        ? renderStar("text-yellow-400", i)
        : renderStar("text-gray-500", i);
    });
    return newArr;
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        {displayStar(rating)}
        <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
          {rating} / 5
        </p>
      </div>
    </div>
  );
};

export default RatingStars;
