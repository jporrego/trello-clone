import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider, Text } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { setActiveUser } from "./features/user/UserSlice";
import { auth, provider } from "./firebase";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Home";
import BoardPage from "./features/board/board_page/BoardPage";
import Login from "./features/login/Login";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    /*
      dispatch(
        setActiveUser({
          //@ts-ignore
          name: signInResult.displayName,
          //@ts-ignore
          email: signInResult.email,
          //@ts-ignore
          picture: signInResult.photoURL,
        })
      );
    token && localStorage.setItem("authToken", token);*/
  }, []);
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <div className="app">
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/login" element={<Login></Login>} />
            <Route path="/boards/:boardId" element={<BoardPage></BoardPage>} />
          </Routes>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
