import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  nanoid,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Board } from "../../types";

export interface BoardState {
  boards: Board[];
  status: "idle" | "loading" | "failed";
}

const initialState: BoardState = {
  boards: [
    { _id: nanoid(), name: "Board 1" },
    { _id: nanoid(), name: "Board 2" },
  ],
  status: "idle",
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBoards = (state: RootState) => state.boards.boards;

export default boardsSlice.reducer;
