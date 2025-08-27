import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productApi";
import { authAPI } from "./api/authApi";
import { userAPI } from "./api/userApi";
import userReducer from "./features/userSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    [productAPI.reducerPath]: productAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productAPI.middleware,
      authAPI.middleware,
      userAPI.middleware
    ),
});
