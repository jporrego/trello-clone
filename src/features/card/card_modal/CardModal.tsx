import React, { useEffect } from "react";
import { Card } from "../../../types";
import { BiBookContent } from "react-icons/bi";
import styles from "./CardModal.module.css";

interface CardModal {
  card?: Card;
  setSelectedCard: React.Dispatch<React.SetStateAction<Card | undefined>>;
}

const CardModal: React.FC<CardModal> = ({ card, setSelectedCard }) => {
  useEffect(() => {
    if (card) {
      document.body.classList.add("modalOpen");
    }
  }, [card]);
  const handleCloseModal = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target instanceof Element) {
      if (e.target.id === "CardModal") {
        setSelectedCard(undefined);
        document.body.classList.remove("modalOpen");
      }
    }
  };
  return (
    <div
      className={styles.CardModal}
      id="CardModal"
      onClick={(e) => handleCloseModal(e)}
    >
      <div className={styles.Card}>
        <div className={styles.title}>
          {" "}
          <BiBookContent></BiBookContent> {card?.name}
        </div>
      </div>
    </div>
  );
};

export default CardModal;