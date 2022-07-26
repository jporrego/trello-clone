import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { fetchBoards } from "./features/board/boardsSlice";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

store.dispatch(fetchBoards());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
