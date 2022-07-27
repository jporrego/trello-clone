import React from "react";
import styles from "./Navbar.module.css";
import { FaTrello } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <FaTrello></FaTrello>
      Trello
    </div>
  );
};

export default Navbar;
