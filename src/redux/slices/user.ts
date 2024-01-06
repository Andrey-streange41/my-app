import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import { getUser } from "../../api/user";
import { initialUserState } from "../../utils/const";

interface IUserState {
  user: IUser | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: IUserState = {
  user: initialUserState,
  loading: false,
  error: null,
};

export const getUserThunk = createAsyncThunk<
  IUser,
  number,
  { rejectValue: string }
>("get/user", async (id, { rejectWithValue }) => {
  try {
    const user = await getUser(id);

    return user;
  } catch (error) {
    return rejectWithValue(error as string);
  }
});

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {},
  extraReducers: (builer) => {
    builer.addCase(getUserThunk.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builer.addCase(getUserThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload;
    });
    builer.addCase(getUserThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default userSlice.reducer;
