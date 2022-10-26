import React, { useState } from "react";
import { MdCheckBox } from "react-icons/md";
import ChecklistPopover from "./ChecklistPopover";
import styles from "../../../features/card/card_modal/CardModal.module.css";

const ChecklistBtn = () => {
  const [showListMenu, setShowListMenu] = useState<boolean>(false);
  return (
    <div
      className={styles.card__menu__btn}
      onClick={() => 1 /*handleCreateChecklist()*/}
    >
      <MdCheckBox></MdCheckBox> checklist
      <ChecklistPopover setShowListMenu={setShowListMenu}></ChecklistPopover>
    </div>
  );
};

export default ChecklistBtn;
