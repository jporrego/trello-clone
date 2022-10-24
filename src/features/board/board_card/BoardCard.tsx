import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { boardSelected } from "../../../features/board/boardsSlice";
import { Board } from "../../../types";
import styles from "./BoardCard.module.css";

interface BoardCardProps {
  board: Board;
}

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${styles.boardCard} transition50ms`}
      onClick={() => {
        navigate(`/boards/${board.id}`);
        dispatch(boardSelected(board.id));
      }}
      style={{
        backgroundImage: `url(/img/${board?.bg_img})`,
        backgroundColor: board?.bg_color,
      }}
    >
      <div>{board.title}</div>
    </div>
  );
};

export default BoardCard;
