import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaTrello } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.icon}>
        <FaTrello></FaTrello>
        Trello
      </div>
      <Link to={"/"}>Boards</Link>
    </div>
  );
};

export default Navbar;
