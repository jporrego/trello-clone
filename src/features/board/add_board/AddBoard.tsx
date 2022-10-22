import React, { useState } from "react";
import styles from "./AddBoard.module.css";
import AddBoardPopover from "./AddBoardPopover";

const AddBoard = () => {
  const [showListMenu, setShowListMenu] = useState<boolean>(false);
  return (
    <div className={styles.add_board}>
      <AddBoardPopover setShowListMenu={setShowListMenu}></AddBoardPopover>
    </div>
  );
};

export default AddBoard;
