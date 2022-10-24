import React from "react";
import { BackgroundSelector } from "./BackgroundSelector";
import styles from "./AddBoard.module.css";

const AddBoardForm = () => {
  return (
    <div className={styles.add_board_form}>
      <BackgroundSelector></BackgroundSelector>
      <div>
        Board title
        <input type="text" />
      </div>
      <button>Create</button>
    </div>
  );
};

export default AddBoardForm;
