import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "../Card.module.css";

const AddCard = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [cardName, setCardName] = useState<string>();

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
    try {
      const url = process.env.REACT_APP_API_URL + `api/cards/${1}`;
      const response = await axios.post(url);
      console.log(response);
    } catch (error) {
      console.log(error);
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
