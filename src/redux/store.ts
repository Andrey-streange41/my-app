import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products";
import sidebar from "./slices/sidebar";
import cart from "./slices/cart";
import user from "./slices/user";

export const store = configureStore({
  reducer: {
    products: products,
    sidebar: sidebar,
    cart: cart,
    user: user,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
