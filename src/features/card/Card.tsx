import React, { useState } from "react";
import axios from "axios";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Card as CardType } from "../../types";
import styles from "./Card.module.css";
import { FiEdit3 } from "react-icons/fi";

interface CardProps {
  card: CardType;
  fetchCards: () => void;
  setSelectedCard: React.Dispatch<React.SetStateAction<CardType | undefined>>;
}

const Card: React.FC<CardProps> = ({ card, fetchCards, setSelectedCard }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const handleDeleteCard = async () => {
    setSelectedCard(card);

    return;
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
          <FiEdit3 onClick={handleDeleteCard}></FiEdit3>
        </div>
      )}
    </div>
  );
};

export default Card;
