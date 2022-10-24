import React from "react";
import { BsCheckLg } from "react-icons/bs";
import styles from "./AddBoard.module.css";

interface ColorPickerProps {
  color: string;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  setSelectedColor,
  selectedColor,
}) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={styles.color_picker}
      onClick={() => setSelectedColor(color)}
    >
      {color === selectedColor && <BsCheckLg></BsCheckLg>}
    </div>
  );
};

export default ColorPicker;
