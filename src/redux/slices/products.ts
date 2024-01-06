import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductById, getProducts } from "../../api/products";
import { IProduct, category } from "../../types/products";
import { LIMIT } from "../../utils/const";

export interface IProductsSlice {
  products: IProduct[];
  current: IProduct | null;
  status: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  loading: boolean;
  pages: number;
}

const initialState: IProductsSlice = {
  products: [],
  pages: 1,
  status: "idle",
  loading: false,
  error: null,
  current: null,
};

interface IQuery {
  category: category;
  search?: string;
  cartItems?: number[];
}

export const getProductsChunk = createAsyncThunk<
  IProduct[],
  IQuery,
  { rejectValue: string }
>("get/product", async (query, { rejectWithValue }) => {
  try {
    const products = await getProducts(query);

    let searchResult = products;

    // Search by title - client side
    if (query.search && query.search !== "undefined") {
      searchResult = searchResult.filter(
        (product) =>
          query.search &&
          product.title.toLowerCase().includes(query.search.toLowerCase())
      );
    }

    return searchResult;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

export const getProductByIdThunk = createAsyncThunk<
  IProduct,
  number,
  { rejectValue: string }
>("getById/product", async (id, { rejectWithValue }) => {
  try {
    const product = await getProductById(id);

    return product;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

const products = createSlice({
  initialState,
  name: "products",
  reducers: {
    sort: (state, action) => {
      if (action.payload === "Title") {
        state.products = state.products
          .slice()
          .sort((a, b) => b.title.localeCompare(a.title));
      } else if (action.payload === "Price") {
        state.products = state.products
          .slice()
          .sort((a, b) => a.price - b.price);
      } else if (action.payload === "Rate") {
        state.products = state.products
          .slice()
          .sort((a, b) => a.rating?.rate - b.rating?.rate);
      }
    },
    updateProductQuantity: (state, action) => {
      state.products = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return { ...product, quantity: action.payload.quantity };
        }
        return product;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsChunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      getProductsChunk.fulfilled,
      (state, action: PayloadAction<IProduct[]>) => {
        state.products = action.payload;

        state.pages = Math.ceil(action.payload.length / LIMIT);
        state.loading = false;
        state.error = null;
        state.status = "succeeded";
      }
    );
    builder.addCase(getProductsChunk.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.error = action.payload || "Products API error!";
    });
    builder.addCase(getProductByIdThunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      getProductByIdThunk.fulfilled,
      (state, action: PayloadAction<IProduct>) => {
        state.current = {
          ...action.payload,
        };
      }
    );
    builder.addCase(getProductByIdThunk.rejected, (state, action) => {
      state.loading = false;
      state.status = "failed";
      state.error = action.payload || "Products API error!";
    });
  },
});

export const { sort, updateProductQuantity } = products.actions;

export default products.reducer;
