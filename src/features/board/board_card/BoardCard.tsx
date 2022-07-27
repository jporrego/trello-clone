import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BoardCard.module.css";
import { Board } from "../../../types";

interface BoardCardProps {
  board: Board;
}

const BoardCard: React.FC<BoardCardProps> = ({ board }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`${styles.boardCard} transition50ms`}
      onClick={() => navigate(`/boards/${board.id}`)}
    >
      <div>{board.name}</div>
    </div>
  );
};

export default BoardCard;
