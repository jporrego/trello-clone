import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectBoards,
  fetchBoards,
  selectBoardsStatus,
} from "../../features/board/boardsSlice";

const BoardList = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectBoards);
  const postStatus = useAppSelector(selectBoardsStatus);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchBoards());
    }
  }, []);

  const renderedBoards = boards.map((board) => (
    <div key={board.id}>
      <Link to={`/board/${board.id}`}>{board.name}</Link>
    </div>
  ));
  return <div>{renderedBoards}</div>;
};

export default BoardList;
