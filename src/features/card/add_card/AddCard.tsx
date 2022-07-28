import React, { useState, useEffect, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "../Card.module.css";

const AddCard = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [cardName, setCardName] = useState<string>();
  const ref = useRef(null);

  useEffect(() => {
    if (isFormVisible) {
      document.addEventListener("click", (e) => handleClickOutside(e), true);
    } else {
      document.removeEventListener("click", (e) => handleClickOutside(e), true);
    }
  }, [isFormVisible]);

  const handleClickOutside = (e: MouseEvent) => {
    if (e.target instanceof Element) {
      if (e.target.tagName !== "TEXTAREA") {
        setIsFormVisible(false);
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
          <div className={styles.addCard__btn}>Add Card</div>
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
