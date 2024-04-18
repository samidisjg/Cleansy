import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  const handleClick = (value) => {
    if (rating === value) {
      // If the same star is clicked again, reset the rating
      setRating(null);
    } else {
      setRating(value);
    }
  };

  return (
    <div className="flex justify-center items-center">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <FaStar
            key={i}
            className="cursor-pointer"
            color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
            size={50}
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(null)}
          />
        );
      })}
      <p className="ml-4">The rating is {rating || 'not rated'}.</p>
    </div>
  );
};

export default StarRating;
