import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider, Text } from "@mantine/core";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Home";
import BoardPage from "./features/board/board_page/BoardPage";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <div className="app">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/boards/:boardId" element={<BoardPage></BoardPage>} />
          </Routes>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
