import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { auth } from "../../firebase";
import { User } from "../../types";

export interface UserState {
  user: User;
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | undefined;
}

const initialState: UserState = {
  user: { id: null, name: null, email: null, picture: null },
  status: "idle",
  error: "",
};

export const signUp = createAsyncThunk(
  "user/signUp",
  async (userData: User) => {
    const { name, email } = userData;
    /*
    if (process.env.REACT_APP_API_URL !== undefined) {
      const response = await fetch(
        process.env.REACT_APP_API_URL + "api/boards"
      );
      const data = response.json();
      return data;
    }*/
    // The value we return becomes the `fulfilled` action payload
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser: (state, action) => {
      state.user.id = action.payload.id;
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.picture = action.payload.picture;
    },
    logoutUser: (state) => {
      state.user.id = null;
      state.user.name = null;
      state.user.email = null;
      state.user.picture = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUp.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        //state.boards = action.payload;
        state.status = "succeeded";
      })
      .addCase(signUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = "action.error.message";
      });
  },
});

export const { setActiveUser, logoutUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;