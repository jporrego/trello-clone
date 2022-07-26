import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectAllBoards,
  fetchBoards,
  selectBoardsStatus,
} from "../../features/board/boardsSlice";

const BoardList = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectAllBoards);
  const boardStatus = useAppSelector(selectBoardsStatus);

  useEffect(() => {
    if (boardStatus === "idle") {
      dispatch(fetchBoards());
    }
  }, [boardStatus]);

  const renderedBoards = boards.map((board) => (
    <div key={board.id}>
      <Link to={`/boards/${board.id}`}>{board.name}</Link>
    </div>
  ));

  return <div>{renderedBoards}</div>;
};

export default BoardList;
