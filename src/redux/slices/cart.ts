import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  totalSumma: number;
  loading: boolean;
  error: string | null | undefined;
  cart: { productId: number; quantity: number; price: number }[];
  cartProductsAmount: number;
}

const initialState: IInitialState = {
  totalSumma: 0,
  loading: false,
  cartProductsAmount: 0,
  error: null,
  cart: [],
};

const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    calculateSumma: (state, action) => {
      state.totalSumma = action.payload;
    },
    setCartProductsAmount: (state, action) => {
      state.cartProductsAmount = action.payload;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter((it) => it.productId !== action.payload);
    },

    increeseProductQuantity: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.productId === action.payload.id) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
    },
    decreeseProductQuantity: (state, action) => {
      state.cart = state.cart.map((product) => {
        if (product.productId === action.payload.id) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
    },
  },
});

export const {
  calculateSumma,
  setCartProductsAmount,
  addToCart,
  deleteFromCart,
  increeseProductQuantity,
  decreeseProductQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
