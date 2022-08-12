import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import boardSlice from "../features/board/boardsSlice";
import userSlice from "../features/user/UserSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    boards: boardSlice,
    user: userSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
