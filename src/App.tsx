import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider, Text } from "@mantine/core";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { setActiveUser } from "./features/user/UserSlice";
import { fetchBoards } from "./features/board/boardsSlice";
import { auth, provider } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/pages/Home";
import BoardPage from "./features/board/board_page/BoardPage";
import Login from "./features/login/Login";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          setActiveUser({
            //@ts-ignore
            id: currentUser.uid,
            //@ts-ignore
            name: currentUser.displayName,
            //@ts-ignore
            email: currentUser.email,
            //@ts-ignore
            picture: currentUser.photoURL,
          })
        );
        dispatch(fetchBoards(currentUser.uid));
      }
    });

    return () => {
      unsubscribe();
    };
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
