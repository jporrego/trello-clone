import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/pages/Home";
import Board from "./features/board/Board";

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home></Home>} />
          <Route path="/boards/:boardId" element={<Board></Board>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
