import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectBoardById } from "../boardsSlice";
import { List as ListType } from "../../../types";
import styles from "./BoardPage.module.css";
import List from "../../list/List";

interface ParamTypes {
  boardId: string;
}

const Board = () => {
  let boardId: string = useParams().boardId || "";
  const board = useAppSelector((state) => selectBoardById(state, boardId));

  const [lists, setLists] = useState<ListType[]>([]);
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
    return <List list={list} key={list.id}></List>;
  });

  return (
    <div className={styles.boardPage}>
      <div className={styles.title}>{board?.name}</div>
      <div className={styles.lists}>{renderedLists}</div>
    </div>
  );
};

export default Board;
