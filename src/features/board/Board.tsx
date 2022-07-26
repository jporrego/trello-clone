import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectBoardById } from "../../features/board/boardsSlice";
import { List } from "../../types";

interface ParamTypes {
  boardId: string;
}

const Board = () => {
  let boardId: string = useParams().boardId || "";
  const board = useAppSelector((state) => selectBoardById(state, boardId));

  const [lists, setLists] = useState<List[]>([]);
  useEffect(() => {
    fetchLists();
  });

  const fetchLists = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `api/boards/${boardId}/lists`
      );
      const data = await response.json();
      setLists(data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderedLists = lists.map((list) => {
    return (
      <div key={list.id}>
        <div>{list.name}</div>
      </div>
    );
  });

  return <div>{renderedLists}</div>;
};

export default Board;
