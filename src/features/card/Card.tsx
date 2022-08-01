import React, { useState } from "react";
import axios from "axios";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Card as CardType } from "../../types";
import styles from "./Card.module.css";
import { TiDeleteOutline } from "react-icons/ti";

interface CardProps {
  card: CardType;
  fetchCards: () => void;
}

const Card: React.FC<CardProps> = ({ card, fetchCards }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const handleDeleteCard = async () => {
    console.log(1);
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/cards/${card.id}`
      );
      fetchCards();
    } catch (error) {}
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
      style={style}
      ref={setNodeRef}
    >
      <div className={styles.cardTitle} {...listeners} {...attributes}>
        {card.name}
      </div>
      {isCardHovered && (
        <div className={styles.btnDeleteCard}>
          <TiDeleteOutline onClick={handleDeleteCard}></TiDeleteOutline>
        </div>
      )}
    </div>
  );
};

export default Card;
