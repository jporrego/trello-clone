import React from "react";
import BoardPreview from "../../../assets/img/board_preview.png";
import styles from "./AddBoard.module.css";

export const BackgroundSelector = () => {
  return (
    <div className={styles.background_selector}>
      <div className={styles.preview}>
        <img src={BoardPreview} alt="" />
      </div>
      <div className={styles.selector}>
        <h5>Background</h5>
      </div>
    </div>
  );
};
