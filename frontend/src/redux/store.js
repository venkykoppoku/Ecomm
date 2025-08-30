import { configureStore } from "@reduxjs/toolkit";
import { productAPI } from "./api/productApi";
import { authAPI } from "./api/authApi";
import { userAPI } from "./api/userApi";
import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
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
