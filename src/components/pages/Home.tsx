import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectBoards } from "../../features/board/boardsSlice";

const Home = () => {
  const boards = useAppSelector(selectBoards);

  const renderedBoards = boards.map((board) => (
    <div key={board._id}>{board.name}</div>
  ));
  return <div>{renderedBoards}</div>;
};

export default Home;
