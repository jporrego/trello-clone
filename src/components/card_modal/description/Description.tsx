import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Card } from "../../../types";

import styles from "./Description.module.css";
import cardModalStyles from "../../../features/card/card_modal/CardModal.module.css";
import { MdOutlineDescription } from "react-icons/md";

interface DescriptionProps {
  card?: Card;
  fetchCards: () => void;
}
const Description: React.FC<DescriptionProps> = ({ card, fetchCards }) => {
  const [description, setDescription] = useState<string>();
  const [newDescription, setNewDescription] = useState<string>();
  const [showForm, setShowForm] = useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
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

  useEffect(() => {
    setDescription(card?.description);
    setNewDescription(card?.description);
  }, []);

  useEffect(() => {
    if (showForm) {
      ref.current?.focus();
    }
  }, [showForm]);

  const handleSubmitDescription = async () => {
    if (newDescription !== undefined && card) {
      try {
        const url = `${process.env.REACT_APP_API_URL}api/cards/${card.id}/description`;
        const data = { cardId: card.id, description: newDescription.trim() };
        const response = await axios.put(url, data);
        if (response.status === 200) {
          setDescription(newDescription.trim());
          setNewDescription(newDescription.trim());
          fetchCards();
          setShowForm(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleCancelDescription = () => {
    setNewDescription("");
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
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              ref={ref}
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
          <div>
            {description ? (
              <div
                className={styles.description__text}
                onClick={() => {
                  setShowForm(true);
                  ref.current?.focus();
                }}
              >
                {description}
              </div>
            ) : (
              <div
                className={styles.btnShowTextarea}
                onClick={() => setShowForm(true)}
              >
                Add a more detailed description...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Description;
