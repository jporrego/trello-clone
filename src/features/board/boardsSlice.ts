import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Board } from "../../types";

export interface BoardState {
  boards: Board[];
  status: "idle" | "loading" | "failed";
  error: string | undefined;
}

const initialState: BoardState = {
  boards: [],
  status: "idle",
  error: "",
};

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  if (process.env.REACT_APP_API_URL !== undefined) {
    const response = await fetch(process.env.REACT_APP_API_URL + "api/boards");
    const data = response.json();
    return data;
  }
  // The value we return becomes the `fulfilled` action payload
});

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBoards.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.status = "idle";
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBoards = (state: RootState) => state.boards.boards;

export const selectBoardsStatus = (state: RootState) => state.boards.status;

export default boardsSlice.reducer;
