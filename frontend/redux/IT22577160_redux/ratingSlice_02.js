import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   rating: localStorage.getItem("ratingItems") ? JSON.parse(localStorage.getItem("ratingItems")) : [],
}

const ratingSlice = createSlice({
   name: "rating",
   initialState,
   reducers: {
      addToRating: (state, action) => {
         const item = action.payload;
         const existingItem = state.rating.find((i) => i._id === item._id);

         if (existingItem) {
            return {
               ...state,
               rating: state.rating.map((i) => i._id === existingItem._id ? item : i)
            }
         } else {
            return {
               ...state,
               rating: [...state.rating, item]
            }
         }
      },
      removeFromRating: (state, action) => {
         return {
            ...state,
            rating: state.rating.filter((i) => i._id !== action.payload)
         }
      },
   }
});

export const { addToRating, removeFromRating } = ratingSlice.actions;
export default ratingSlice.reducer;