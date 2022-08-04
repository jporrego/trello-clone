import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "../Card.module.css";

interface AddCardProps {
  listId: string;
  fetchCards: () => void;
  fetchCardsOrder: () => void;
}

const AddCard: React.FC<AddCardProps> = ({
  listId,
  fetchCards,
  fetchCardsOrder,
}) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [cardName, setCardName] = useState<string>("");
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      console.log(1);
      if (e.target instanceof Element) {
        if (e.target.id !== "card-name" && e.target.id !== "addCard__btn") {
          setIsFormVisible(false);
        }
      }
    };

    if (isFormVisible) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isFormVisible]);

  const handleAddCard = async () => {
    if (cardName.trim().length > 0) {
      try {
        const url = process.env.REACT_APP_API_URL + `api/cards/`;
        const data = {
          list_id: listId,
          cardName: cardName,
          cardDescription: "",
        };
        await axios.post(url, data);
        await fetchCards();
        await fetchCardsOrder();
        setCardName("");
        setIsFormVisible(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      ref.current?.focus();
    }
  };

  return (
    <div className={`${styles.addCard} transition50ms`}>
      {isFormVisible ? (
        <form action="">
          <textarea
            name="card-name"
            id="card-name"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            placeholder="Enter a title for this card..."
            ref={ref}
          ></textarea>
          <div
            id="addCard__btn"
            className={styles.addCard__btn}
            onClick={handleAddCard}
          >
            Add Card
          </div>
        </form>
      ) : (
        <div
          className={styles.showForm__btn}
          onClick={() => {
            setIsFormVisible(true);
          }}
        >
          <AiOutlinePlus></AiOutlinePlus> Add a card
        </div>
      )}
    </div>
  );
};

export default AddCard;
