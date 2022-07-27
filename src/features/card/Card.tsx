import React from "react";
import { Card as CardType } from "../../types";
import styles from "./Card.module.css";

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return <div className={styles.card}>{card.name}</div>;
};

export default Card;
