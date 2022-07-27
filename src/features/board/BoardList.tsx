import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectAllBoards,
  fetchBoards,
  selectBoardsStatus,
} from "../../features/board/boardsSlice";

import styles from "./BoardList.module.css";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const BoardList = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectAllBoards);
  const boardStatus = useAppSelector(selectBoardsStatus);

  const navigate = useNavigate();

  useEffect(() => {
    if (boardStatus === "idle") {
      dispatch(fetchBoards());
    }
  }, [boardStatus]);

  const renderedBoards = boards.map((board) => (
    <div
      key={board.id}
      className={styles.boardCard}
      onClick={() => navigate(`/boards/${board.id}`)}
    >
      <div>{board.name}</div>
      <Link to={`/boards/${board.id}`}></Link>
    </div>
  ));

  return (
    <div className={styles.boardList}>
      <div className={styles.boardListTitle}>
        {" "}
        <MdOutlineDashboardCustomize></MdOutlineDashboardCustomize>Boards
      </div>

      <div className={styles.boardCards}>{renderedBoards}</div>
    </div>
  );
};

export default BoardList;
