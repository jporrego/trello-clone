import React, { useState, useEffect } from "react";
import { List as ListType } from "../../types";
import { Card as CardType } from "../../types";
import styles from "./List.module.css";

import Card from "../card/Card";
import AddCard from "../card/add_card/AddCard";

interface ListProps {
  list: ListType;
  cards: CardType[];
}
const List: React.FC<ListProps> = ({ list, cards }) => {
  const renderedCards = cards.map((card) => {
    return <Card key={card.id} card={card}></Card>;
  });
  return (
    <div className={styles.list}>
      <div className={styles.title}>{list.name}</div>
      {renderedCards}
      <AddCard></AddCard>
    </div>
  );
};

export default List;
