import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productApi";

export const store = configureStore({
  reducer: {
    [productAPI.reducerPath]: productAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productAPI.middleware),
});
