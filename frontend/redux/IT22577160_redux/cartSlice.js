import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
}

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const item = action.payload;
         const existingItem = state.cart.find((i) => i._id === item._id);

         if (existingItem) {
            return {
               ...state,
               cart: state.cart.map((i) => i._id === existingItem._id ? item : i)
            }
         } else {
            return {
               ...state,
               cart: [...state.cart, item]
            }
         }
      },
      removeFromCart: (state, action) => {
         return {
            ...state,
            cart: state.cart.filter((i) => i._id !== action.payload)
         }
      },
   }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;