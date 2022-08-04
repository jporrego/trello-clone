import React, { useEffect } from "react";
import axios from "axios";
import { Card } from "../../../types";
import { BiBookContent } from "react-icons/bi";
import styles from "./CardModal.module.css";

interface CardModal {
  card?: Card;
  setSelectedCard: React.Dispatch<React.SetStateAction<Card | undefined>>;
  fetchCards: () => void;
  fetchCardsOrder: () => void;
}

const CardModal: React.FC<CardModal> = ({
  card,
  setSelectedCard,
  fetchCards,
  fetchCardsOrder,
}) => {
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

  const handleDeleteCard = async () => {
    if (card) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}api/cards/${card.id}`
        );
        await fetchCards();
        await fetchCardsOrder();
        setSelectedCard(undefined);
      } catch (error) {}
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

        <div className={styles.cardDeleteBtn}>
          <div onClick={() => handleDeleteCard()}>1</div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
