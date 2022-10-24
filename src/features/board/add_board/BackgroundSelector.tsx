import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import BoardPreview from "../../../assets/img/board_preview.png";
import styles from "./AddBoard.module.css";

export const BackgroundSelector = () => {
  const [selectedColor, setSelectedColor] = useState<string>("#0079BF");

  const selectColor = (color: string) => {
    setSelectedColor(color);
  };
  return (
    <div className={styles.background_selector}>
      <div className={styles.preview}>
        <img src={BoardPreview} alt="" />
      </div>
      <div className={styles.selector}>
        <h5>Background</h5>
        <div className={styles.selector__colors}>
          <ColorPicker
            color={"#0079BF"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          ></ColorPicker>
          <ColorPicker
            color={"#D29034"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          ></ColorPicker>
          <ColorPicker
            color={"#519839"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          ></ColorPicker>
          <ColorPicker
            color={"#b04632"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          ></ColorPicker>
          <ColorPicker
            color={"#89609E"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          ></ColorPicker>
          <ColorPicker
            color={"#CD5A91"}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          ></ColorPicker>
        </div>
      </div>
    </div>
  );
};
