import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "./AddList.module.css";

const AddList = () => {
  const [listName, setListName] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (e.target.id !== "list-name" && e.target.id !== "addList__btn") {
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

  const handleAddList = async () => {
    /*
    if (cardName.trim().length > 0) {
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
    } else {
      ref.current?.focus();
    }*/
  };
  return (
    <div className={styles.addList} onClick={() => {}}>
      {isFormVisible ? (
        <form>
          <textarea
            name="list-name"
            id="list-name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter a title for this list..."
            ref={ref}
          ></textarea>
          <div
            id="addList__btn"
            className={styles.addList__btn}
            onClick={handleAddList}
          >
            Add List
          </div>
        </form>
      ) : (
        <div
          className={styles.showFormBtn}
          onClick={() => setIsFormVisible(true)}
        >
          <AiOutlinePlus></AiOutlinePlus> Add another list
        </div>
      )}
    </div>
  );
};

export default AddList;
