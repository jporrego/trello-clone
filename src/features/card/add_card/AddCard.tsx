import React, { useState, useEffect, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "../Card.module.css";

const AddCard = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
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
      console.log(e.target.tagName);
    }
  };

  return (
    <div className={`${styles.addCard} transition50ms`}>
      {isFormVisible ? (
        <form action="">
          <textarea name="" id=""></textarea>
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
