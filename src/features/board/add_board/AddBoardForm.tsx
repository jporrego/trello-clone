import React, { useState } from "react";
import { BackgroundSelector } from "./BackgroundSelector";
import styles from "./AddBoard.module.css";

const AddBoardForm = () => {
  const [boardData, setBoardData] = useState({
    title: "",
    backgroundImg: "",
    backgroundColor: "",
  });

  const onChangeBackground = (img: string, color: string) => {
    if (img.length > 0) {
      setBoardData({ ...boardData, backgroundImg: img, backgroundColor: "" });
    } else {
      setBoardData({ ...boardData, backgroundImg: "", backgroundColor: color });
    }
  };
  return (
    <div className={styles.add_board_form}>
      <BackgroundSelector
        onChangeBackground={onChangeBackground}
      ></BackgroundSelector>

      <label className={styles.add_board_form__title}>
        <h5>Board title</h5>
        <input
          type="text"
          name="title"
          maxLength={50}
          value={boardData.title}
          onChange={(e) =>
            setBoardData({ ...boardData, title: e.target.value })
          }
        />
      </label>
      <button onClick={() => console.log(boardData)}>Create</button>
    </div>
  );
};

export default AddBoardForm;
