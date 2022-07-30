import React, { useState, useEffect } from "react";
import { List as ListType } from "../../types";
import { Card as CardType } from "../../types";
import styles from "./List.module.css";

import Card from "../card/Card";
import AddCard from "../card/add_card/AddCard";

interface ListProps {
  list: ListType;
}
const List: React.FC<ListProps> = ({ list }) => {
  const [cards, setCards] = useState<CardType[]>();

  useEffect(() => {
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_API_URL + `api/lists/${list.id}/cards`
      );
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderedCards = cards?.map((card) => {
    return <Card key={card.id} card={card} fetchCards={fetchCards}></Card>;
  });
  return (
    <div className={styles.list}>
      <div className={styles.title}>{list.name}</div>
      {renderedCards}
      <AddCard listId={list.id} fetchCards={fetchCards}></AddCard>
    </div>
  );
};

export default List;
