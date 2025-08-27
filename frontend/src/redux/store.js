import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productApi";
import { authAPI } from "./api/authApi";

export const store = configureStore({
  reducer: {
    [productAPI.reducerPath]: productAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productAPI.middleware, authAPI.middleware),
});
