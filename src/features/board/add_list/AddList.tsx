import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "./AddList.module.css";

interface AddListProps {
  boardId: string;
  fetchLists: () => void;
  fetchListsOrder: () => void;
}

const AddList: React.FC<AddListProps> = ({
  boardId,
  fetchLists,
  fetchListsOrder,
}) => {
  const [listName, setListName] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

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
    if (listName.trim().length > 0) {
      try {
        const url = process.env.REACT_APP_API_URL + `api/lists/`;
        const data = {
          board_id: boardId,
          listName: listName,
        };
        await axios.post(url, data);
        await fetchLists();
        await fetchListsOrder();
        setListName("");
        setIsFormVisible(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      ref.current?.focus();
    }
  };

  return (
    <div className={styles.addList} onClick={() => {}}>
      {isFormVisible ? (
        <form>
          <input
            type="text"
            name="list-name"
            id="list-name"
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="Enter list title..."
            ref={ref}
          ></input>
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
