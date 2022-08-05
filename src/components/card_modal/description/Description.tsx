import React, { useState } from "react";
import styles from "./Description.module.css";
import cardModalStyles from "../../../features/card/card_modal/CardModal.module.css";
import { MdOutlineDescription } from "react-icons/md";

const Description = () => {
  const [description, setDescription] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <div>
      <div className={styles.description}>
        <div className={styles.description_logo}>
          <MdOutlineDescription></MdOutlineDescription>
        </div>
        <div className={styles.description_title}>Description</div>
        {showForm ? (
          <form>
            <textarea
              className={styles.description_textArea}
              placeholder="Add a more detailed description..."
              maxLength={850}
            ></textarea>
          </form>
        ) : (
          <div
            className={styles.btnShowTextarea}
            onClick={() => setShowForm(true)}
          >
            Add a more detailed description...
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;
