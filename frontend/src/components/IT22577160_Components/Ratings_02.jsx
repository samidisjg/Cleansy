import { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

const Ratings_02 = () => {
   const [rating, setRating] = useState(null);
   // { rating }
   // const stars = [];

   // for (let i = 1; i <= 5; i++) {
   //    if(i <= rating) {
   //       stars.push(
   //          <AiFillStar key={i} size={20} color="#f6b100" className="mr-2 cursor-pointer" />
   //       )
   //    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
   //       stars.push(
   //          <BsStarHalf key={i} size={17} color="#f6ba00" className="mr-2 cursor-pointer" />
   //       )
   //    } else {
   //       stars.push(
   //          <AiOutlineStar key={i} size={20} color="#f6ba00" className="mr-2 cursor-pointer" />
   //       )
   //    }
   // }
  return (
    <div className="flex">
      {
         [...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return  (
               <>
               <label>
                  <input type="radio" name="rating" value={currentRating}   />
                  <FaStar className="star" size={20} color="#f6b100" />
               </label>
               </>
            )
         })
      }
    </div>
  )
}

export default Ratings_02