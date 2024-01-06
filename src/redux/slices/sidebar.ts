import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sidebarItems } from "../../utils/const";
import { category } from "../../types/products";

const initialState = {
  sidebarMenu: sidebarItems,
  selectedCategory: category.ALL,
};

const sidebar = createSlice({
  initialState,
  name: "products",
  reducers: {
    setActive: (state, action: PayloadAction<number>) => {
      state.sidebarMenu = state.sidebarMenu.map((item) => {
        if (item.id === action.payload) {
          return { ...item, active: true };
        }
        return { ...item, active: false };
      });
    },
    setSubItemActive: (
      state,
      action: PayloadAction<{ parrentId: number; id: number }>
    ) => {
      state.sidebarMenu = state.sidebarMenu.map((item) => {
        if (item.id === action.payload.parrentId) {
          return {
            ...item,
            subItems: item.subItems?.map((it) => {
              if (it.id === action.payload.id) {
                state.selectedCategory = it.category || category.ALL;
                return { ...it, active: true };
              }
              return { ...it, active: false };
            }),
          };
        }
        return item;
      });
    },
  },
});

export const { setActive, setSubItemActive } = sidebar.actions;

export default sidebar.reducer;
