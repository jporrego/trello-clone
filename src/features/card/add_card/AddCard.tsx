import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { cardAdded } from "../../board/boardsSlice";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "../Card.module.css";

interface AddCardProps {
  listId: string;
  fetchCards: () => void;
}

const AddCard: React.FC<AddCardProps> = ({ listId, fetchCards }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [cardName, setCardName] = useState<string>();
  const dispatch = useAppDispatch();

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
    if (cardName) {
      try {
        const url = process.env.REACT_APP_API_URL + `api/cards/`;
        const data = {
          list_id: listId,
          cardName: cardName,
          cardDescription: "",
        };
        const response = await axios.post(url, data);
        const newCard = response.data[0];
        fetchCards();
        setCardName("");
        setIsFormVisible(false);
        console.log(newCard);
      } catch (error) {
        console.log(error);
      }
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
          onClick={() => setIsFormVisible(true)}
        >
          <AiOutlinePlus></AiOutlinePlus> Add a card
        </div>
      )}
    </div>
  );
};

export default AddCard;
