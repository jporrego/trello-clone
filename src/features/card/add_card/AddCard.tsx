import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "../Card.module.css";

const AddCard = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div className={`${styles.addCard} transition50ms`}>
      {isFormVisible ? (
        <form action="">
          <textarea name="" id=""></textarea>
        </form>
      ) : (
        <div
          className={styles.addCard__btn}
          onClick={() => setIsFormVisible(true)}
        >
          <AiOutlinePlus></AiOutlinePlus> Add a card
        </div>
      )}
    </div>
  );
};

export default AddCard;
