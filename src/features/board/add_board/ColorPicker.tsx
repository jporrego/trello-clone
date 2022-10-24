import React from "react";
import { BsCheckLg } from "react-icons/bs";
import styles from "./AddBoard.module.css";

interface ColorPickerProps {
  color: string;
  selectedColor: string;
  selectBg: (src: string, isImg: boolean) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  selectedColor,
  selectBg,
}) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={styles.color_picker}
      onClick={() => selectBg(color, false)}
    >
      {color === selectedColor && <BsCheckLg></BsCheckLg>}
    </div>
  );
};

export default ColorPicker;
