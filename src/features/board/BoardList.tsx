import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectAllBoards,
  fetchBoards,
  selectBoardsStatus,
} from "../../features/board/boardsSlice";

import { selectUser } from "../../features/user/UserSlice";

import styles from "./BoardList.module.css";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import BoardCard from "./board_card/BoardCard";

const BoardList = () => {
  const dispatch = useAppDispatch();
  const boards = useAppSelector(selectAllBoards);
  const boardStatus = useAppSelector(selectBoardsStatus);
  const user = useAppSelector(selectUser);

  const navigate = useNavigate();

  useEffect(() => {
    if (boardStatus === "idle" && user.id) {
      dispatch(fetchBoards(user.id));
    }
  }, [boardStatus]);

  const renderedBoards = boards.map((board) => (
    <BoardCard board={board} key={board.id}></BoardCard>
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
