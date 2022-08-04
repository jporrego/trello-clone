import React, { useEffect } from "react";
import axios from "axios";
import { Card } from "../../../types";
import { List } from "../../../types";
import { BiBookContent } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import styles from "./CardModal.module.css";

interface CardModal {
  card?: Card;
  list: List;
  setSelectedCard: React.Dispatch<React.SetStateAction<Card | undefined>>;
  fetchCards: () => void;
  fetchCardsOrder: () => void;
}

const CardModal: React.FC<CardModal> = ({
  card,
  list,
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
      className={styles.cardModal}
      id="CardModal"
      onClick={(e) => handleCloseModal(e)}
    >
      <div className={styles.card}>
        {/* CONTENT */}
        <div className={styles.card__content}>
          <div className={styles.title}>
            <div className={styles.title__logo}>
              <BiBookContent></BiBookContent>
            </div>
            <div className={styles.title__cardName}>{card?.name}</div>
            <div className={styles.title__listName}>
              in list <u>{list.name}</u>
            </div>
          </div>
        </div>

        {/* MENU */}
        <div className={styles.card__menu}>
          <div
            className={styles.card__menu__btn}
            onClick={() => handleDeleteCard()}
          >
            <MdDelete></MdDelete> delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardModal;
