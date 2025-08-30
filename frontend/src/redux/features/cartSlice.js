import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [],
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialState,
  reducers: {
    setCartItems(state, action) {
      const item = action.payload;
      const hasProductInCart = state.cartItems.find(
        (cartItem) => cartItem.id === item.id
      );
      if (hasProductInCart) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem.id === item.id ? item : cartItem
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeCartItems(state, action) {
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem(
        "shippingAddress",
        JSON.stringify(state.shippingAddress)
      );
    },
  },
});

export const { setCartItems, removeCartItems, saveShippingAddress } =
  cartSlice.actions;

export default cartSlice.reducer;
