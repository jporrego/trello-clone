import React, { useState, useEffect } from "react";
import { handleShowForm } from "../../../app/helpers/helpers";

import styles from "./Description.module.css";
import cardModalStyles from "../../../features/card/card_modal/CardModal.module.css";
import { MdOutlineDescription } from "react-icons/md";

const Description = () => {
  const [description, setDescription] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      console.log(1);
      if (e.target instanceof Element) {
        if (
          e.target.id !== "description" &&
          e.target.id !== "save" &&
          e.target.id !== "cancel"
        ) {
          setShowForm(false);
        }
      }
    };

    if (showForm) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [showForm]);

  const handleSubmitDescription = () => {
    if (description !== "") {
    }
  };
  const handleCancelDescription = () => {
    setDescription("");
    setShowForm(false);
  };

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
              id="description"
              className={styles.description_textArea}
              placeholder="Add a more detailed description..."
              maxLength={850}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <div className={styles.form_btns}>
              {" "}
              <div
                id="save"
                className={[styles.btn, styles.save].join(" ")}
                onClick={handleSubmitDescription}
              >
                Save
              </div>
              <div
                id="cancel"
                className={[styles.btn, styles.cancel].join(" ")}
                onClick={handleCancelDescription}
              >
                Cancel
              </div>
            </div>
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
