import React, { useState } from "react";
import axios from "axios";
import { Card as CardType } from "../../types";
import styles from "./Card.module.css";
import { TiDeleteOutline } from "react-icons/ti";

interface CardProps {
  card: CardType;
  fetchCards: () => void;
}

const Card: React.FC<CardProps> = ({ card, fetchCards }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  const handleDeleteCard = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}api/cards/${card.id}`
      );
      fetchCards();
    } catch (error) {}
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <div className={styles.cardTitle}>{card.name}</div>
      {isCardHovered && (
        <div className={styles.btnDeleteCard}>
          <TiDeleteOutline onClick={handleDeleteCard}></TiDeleteOutline>
        </div>
      )}
    </div>
  );
};

export default Card;
