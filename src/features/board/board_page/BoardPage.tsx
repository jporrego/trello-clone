import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { selectBoardById } from "../boardsSlice";

import { List as ListType } from "../../../types";
import { Card } from "../../../types";

import List from "../../list/List";
import styles from "./BoardPage.module.css";

interface ParamType {
  boardId: string;
}

interface dataType {
  lists: ListType[];
  cards: Card[];
}

const Board = () => {
  let boardId: string = useParams().boardId || "";
  const board = useAppSelector((state) => selectBoardById(state, boardId));

  const [listsAndCards, setListsAndCards] = useState<dataType>();
  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `api/boards/${boardId}/lists`
      );
      const data = await response.json();
      setListsAndCards(data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderedLists = listsAndCards?.lists.map((list) => {
    const listCards = listsAndCards.cards.filter(
      (card) => card.list_id === list.id
    );
    return <List list={list} key={list.id} cards={listCards}></List>;
  });

  return (
    <div className={styles.boardPage}>
      <div className={styles.title}>{board?.name}</div>
      <div className={styles.lists}>{renderedLists}</div>
    </div>
  );
};

export default Board;
