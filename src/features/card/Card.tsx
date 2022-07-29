import React, { useState } from "react";
import { Card as CardType } from "../../types";
import styles from "./Card.module.css";
import { TiDeleteOutline } from "react-icons/ti";

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const [isCardHovered, setIsCardHovered] = useState(true);
  const handleDeleteCard = () => {
    alert(1);
  };
  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      {card.name}
      <div className={styles.btnDeleteCard}>
        {isCardHovered && (
          <TiDeleteOutline
            className={styles.btnDeleteCard}
            onClick={handleDeleteCard}
          ></TiDeleteOutline>
        )}
      </div>
    </div>
  );
};

export default Card;
