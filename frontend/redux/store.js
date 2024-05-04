import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
import themeReducer from './theme/themeSlice.js'
import cartReducer from './IT22577160_redux/cartSlice.js'
import wishlistReducer from './IT22577160_redux/wishList_02.js'
import ratingReducer from './IT22577160_redux/ratingSlice_02.js'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import TaskchartSlice from './IT22607232_redux/Taskchart_01'
import{apiSlice} from './IT22607232_redux/apiSlice.js'

const rootReducer = combineReducers({
   user: userReducer,
   theme: themeReducer,
   cart: cartReducer,
   wishlist: wishlistReducer,
   rating: ratingReducer,
   //Taskchart: TaskchartSlice,
   [apiSlice.reducerPath]: apiSlice.reducer
})

const persistConfig = {
   key: 'root',
   storage,
   version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
   reducer: persistedReducer,
   // prevent errors from redux-persist / using react toolkit
   middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false,
   }).concat(apiSlice.middleware),
   Taskchart_01: {
   Taskchart: TaskchartSlice,
   }
})

export const persistor = persistStore(store) 