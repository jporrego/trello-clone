import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { Board } from "../../types";

export interface BoardState {
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | undefined;
}

const boardsAdapter = createEntityAdapter<Board>();

const initialState = boardsAdapter.getInitialState({
  status: "idle",
  error: "",
});

const old_initialState: BoardState = {
  //boards: [],
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
  reducers: {
    cardAdded: (state, action) => {
      const payload = action.payload;
      boardsAdapter.addOne(state, payload);
      console.log(payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBoards.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchBoards.fulfilled, (state, action) => {
        //state.boards = action.payload;
        boardsAdapter.upsertMany(state, action.payload);
        state.status = "succeeded";
      })
      .addCase(fetchBoards.rejected, (state, action) => {
        state.status = "failed";
        state.error = "action.error.message";
      });
  },
});

export const { cardAdded } = boardsSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllBoards,
  selectById: selectBoardById,
  selectIds: selectBoardIds,
  // Pass in a selector that returns the posts slice of state
} = boardsAdapter.getSelectors((state: RootState) => state.boards);

export const selectBoardsStatus = (state: RootState) => state.boards.status;

export default boardsSlice.reducer;
