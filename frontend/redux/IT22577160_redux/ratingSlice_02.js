import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   rating: null,
}

const ratingSlice = createSlice({
   name: "rating",
   initialState,
   reducers: {
      addToRating: (state, action) => {
         state.rating = action.payload;
      },
      removeFromRating: (state) => {
         state.rating = null;
      },
   }
});

export const { addToRating, removeFromRating } = ratingSlice.actions;
export default ratingSlice.reducer;