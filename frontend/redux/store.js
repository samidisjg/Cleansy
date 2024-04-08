import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './user/userSlice.js'
import themeReducer from './theme/themeSlice.js'
import cartReducer from './IT22577160_redux/cartSlice.js'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
   user: userReducer,
   theme: themeReducer,
   cart: cartReducer,
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
   }),
})

export const persistor = persistStore(store) 