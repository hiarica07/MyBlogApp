import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import blogReducer from "../features/blogSlice"
import commentReducer from "../features/commentSlice"
import categoryReducer from "../features/categorySlice"
import paginationReducer from "../features/paginationSlice"
import { persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//* redux-persist
const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, authReducer)

//! reduxtoolkit store
const store = configureStore({
  reducer: {
    // auth: authReducer,
    auth: persistedReducer,
    blog: blogReducer,
    comments: commentReducer,
    users: userReducer,
    category: categoryReducer,
    pagination: paginationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  }),
  devTools: process.env.NODE_ENV !== "production",
});

//! redux-persist
export let persistor = persistStore(store)

export default store;
